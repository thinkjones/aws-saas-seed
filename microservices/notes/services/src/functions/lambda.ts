import { Note } from '~/entities/Note';

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    note: Note;
    dateCreated: string;
  };
  identity: {
    sub: string;
  }
};

export async function handler(
  event: AppSyncEvent
): Promise<Record<string, unknown>[] | Note | string | null | undefined | {sdl: string}> {
  return "hello";
}

