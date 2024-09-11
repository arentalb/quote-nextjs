"use server";
import db from "@/lib/db";
import { QuoteComments, QuoteDetail } from "@/actions/qoute.action.type";
import { Category, Comment } from "@prisma/client";
import { getAuth } from "@/lib/auth/getAuth";

export async function getAllQuote(
  search = "",
  categoryName = "",
): Promise<QuoteDetail[]> {
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

  return db.qoute.findMany({
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
}

export async function getQuoteById(id: string): Promise<QuoteDetail | null> {
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

export async function getQuoteComments(
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
              id: true,
            },
          },
        },
      },
    },
  });
}

export async function CreateNewComment(
  message: string,
  qouteID: string,
): Promise<Comment | null> {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }
  return db.comment.create({
    data: {
      message: message,
      qouteId: qouteID,
      userId: user?.id,
    },
  });
}

export async function getAllCategories(): Promise<Category[]> {
  return db.category.findMany();
}

//https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types#solution
