"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { getUserID } from "@/lib/actions/user.action";

export async function getAllQoute(search = "", categoryName = "") {
  search = search.trim();

  const whereClause: any = {
    AND: [
      {
        title: {
          contains: search,
        },
      },
      categoryName
        ? {
            categories: {
              some: {
                name: categoryName,
              },
            },
          }
        : {},
    ],
  };

  const quotes = await db.qoute.findMany({
    where: whereClause,
    include: {
      User: {
        select: {
          username: true,
        },
      },
      categories: {
        select: {
          name: true,
        },
      },
    },
  });

  return quotes;
}

export async function getAllCategories() {
  const categories = await db.category.findMany();
  return categories;
}

export async function getQouteById(
  id: string,
): Promise<QuoteWithDetails | null> {
  return db.qoute.findUnique({
    where: {
      id: id,
    },
    include: {
      categories: {
        select: {
          name: true,
        },
      },
      User: {
        select: {
          username: true,
        },
      },
    },
  });
}

export type QuoteWithDetails = Prisma.QouteGetPayload<{
  include: {
    categories: {
      select: {
        name: true;
      };
    };
    User: {
      select: {
        username: true;
      };
    };
  };
}>;

export async function getQouteComments(
  id: string,
): Promise<QuoteComments | null> {
  return db.qoute.findUnique({
    where: {
      id: id,
    },
    include: {
      comments: {
        orderBy: {
          created_at: "desc",
        },
        select: {
          message: true,
          created_at: true,
          User: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
}
export type QuoteComments = Prisma.QouteGetPayload<{
  include: {
    comments: {
      select: {
        message: true;
        created_at: true;
        User: {
          select: {
            username: true;
          };
        };
      };
    };
  };
}>;

export async function CreateNewComment(message: string, qouteID: string) {
  const userId = await getUserID();
  return db.comment.create({
    data: {
      message: message,
      qouteId: qouteID,
      userId: userId,
    },
  });
}
