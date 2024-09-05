import { Qoute } from "@prisma/client";

export interface UserWithUsername {
  username: string;
}

export interface QouteWithUser extends Qoute {
  User: UserWithUsername;
}
