import { Prisma } from "@prisma/client";

export type QuoteComments = Prisma.QouteGetPayload<{
  include: {
    comments: {
      select: {
        message: true;
        id: true;
        created_at: true;
        User: {
          select: {
            username: true;
            id: true;
          };
        };
      };
    };
  };
}>;
