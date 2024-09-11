import { Prisma } from "@prisma/client";

export type UserWithOutPassword = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    role: true;
    username: true;
  };
}>;
