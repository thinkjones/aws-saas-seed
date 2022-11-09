import Note from "Note";
import createNote from "./createNote";
import getNote from "./getNote";

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
  switch (event.info.fieldName) {
    case "getNote":
      return await getNote(event.identity.sub, event.arguments.dateCreated);
    case "createUser":
      return await createNote(event.arguments.note);
    case '_service':
      return { sdl: process.env.SCHEMA };
    default:
      return null;
  }
}
