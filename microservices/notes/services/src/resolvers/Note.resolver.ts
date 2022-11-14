import "reflect-metadata";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Service } from 'typedi';
import { Note, NoteInput } from '~/entities/Note';
import NoteController from '~/controls/NoteController';

class NoteNotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, NoteNotFoundError.prototype);
  }
}

@Service()
@Resolver(of => Note)
export class NoteResolver {
  constructor(
    private readonly noteController: NoteController,
  ) {}


  @Query(returns => Note)
  async getNote(@Arg("dateCreated") dateCreated: string,
                @Ctx("user") user: {userId: string}) {
    const note = this.noteController.getNote(user.userId, dateCreated);
    if (note === undefined) {
      throw new NoteNotFoundError(`${dateCreated}}`);
    }
    return note;
  }

  @Mutation(returns => Note)
  @Authorized()
  addNote(
    @Arg("noteInput") note: NoteInput,
    @Ctx("user") user: {userId: string},
  ): Promise<Note> {
    return this.noteController.createNote(user.userId, note);
  }
}
