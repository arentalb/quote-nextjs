"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

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
      comments: {
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

type QuoteWithDetails = Prisma.QouteGetPayload<{
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
