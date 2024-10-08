import { Prisma } from "@prisma/client";

export type QuoteDetail = Prisma.QouteGetPayload<{
  include: {
    categories: {
      select: {
        name: true;
        id: true;
      };
    };
    User: {
      select: {
        username: true;
      };
    };
  };
}>;

export type CommentWithQuoteId = Prisma.CommentGetPayload<{
  select: {
    qouteId: true;
    message: true;
    created_at: true;
    updated_at: true;
    userId: true;
    id: true;
  };
}>;

export type AllComments = Prisma.CommentGetPayload<{
  select: {
    id: true;
    message: true;
    qouteId: true;
    User: {
      select: {
        username: true;
        id: true;
      };
    };
  };
}>;
