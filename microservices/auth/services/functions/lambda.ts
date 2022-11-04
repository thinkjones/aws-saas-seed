import User from "User";
import createUser from "./createUser";
import getCurrentUser from "./getCurrentUser";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    user: User;
    userId: string;
  };
  identity: {
    sub: string;
  }
};

export async function handler(
  event: AppSyncEvent
): Promise<Record<string, unknown>[] | User | string | null | undefined> {
  switch (event.info.fieldName) {
    case "getCurrentUser":
      return await getCurrentUser(event.identity.sub);
    case "createUser":
      return await createUser(event.arguments.user);
    default:
      return null;
  }
}
