"use server";
import db from "@/lib/db";
import { QuoteDetail } from "@/actions/qoute.action.type";
import { Qoute } from "@prisma/client";
import { getAuth } from "@/lib/auth/getAuth";
import { CreateQuoteParams } from "@/types";
import { QuoteCreateValidation } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllQuote(
  search = "",
  categoryName = "",
): Promise<QuoteDetail[]> {
  search = search.trim();
  search = search.toLowerCase();
  const whereClause: any = {
    AND: [
      {
        title: {
          contains: search,
          mode: "insensitive",
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
          id: true,
        },
      },
    },
    orderBy: {
      updated_at: "desc",
    },
  });
}

export async function getQuoteById(id: string): Promise<QuoteDetail | null> {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }
  return db.qoute.findUnique({
    where: {
      id: id,
    },
    include: {
      categories: {
        select: {
          name: true,
          id: true,
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

export async function getAllQuotesByMe(): Promise<Qoute[] | null> {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }
  return db.qoute.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updated_at: "asc",
    },
  });
}

export async function getRecentQuotesByMe(): Promise<Qoute[] | null> {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }
  return db.qoute.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updated_at: "asc",
    },
    take: 3,
  });
}

export async function creatQuote(
  quote: CreateQuoteParams,
  categories: string[],
): Promise<Qoute | null> {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }
  const validatedFields = QuoteCreateValidation.safeParse(quote);

  if (!validatedFields.success) {
    return null;
  }

  const validatedData = validatedFields.data;

  return db.qoute.create({
    data: {
      title: validatedData.title,
      body: validatedData.body,
      author: validatedData.author,
      userId: user.id,
      categories: {
        connect: categories.map((categoryId) => ({
          id: categoryId,
        })),
      },
    },
  });
}

export async function updateQuote(
  quoteId: string,
  quoteData: CreateQuoteParams,
  categories: string[],
): Promise<Qoute | null> {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }

  const validatedFields = QuoteCreateValidation.safeParse(quoteData);

  if (!validatedFields.success) {
    return null;
  }

  const validatedData = validatedFields.data;

  return db.qoute.update({
    where: { id: quoteId },
    data: {
      title: validatedData.title,
      body: validatedData.body,
      author: validatedData.author,
      userId: user.id,
      categories: {
        set: [],
        connect: categories.map((categoryId) => ({
          id: categoryId,
        })),
      },
    },
  });
}

export async function deleteQuote(id: string) {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }

  try {
    await db.qoute.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/");
    redirect("/");
  } catch (e) {
    console.log(e);
  }
}
//https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types#solution
