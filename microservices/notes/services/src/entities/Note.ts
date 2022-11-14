import 'reflect-metadata';
import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Note {

  static fromNoteInput(userId: string, noteInput: NoteInput) {
    const n = new Note();
    n.userId = userId;
    n.dateCreated = new Date().toISOString();
    n.note = noteInput.note;
    return n;
  }

  @Field(type => ID)
  dateCreated: string;

  @Field()
  userId: string;

  @Field()
  note: string;
}

@InputType()
export class NoteInput {
  @Field()
  note: string;
}
