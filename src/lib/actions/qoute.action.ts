"use server";

import db from "@/lib/db";

export async function getAllQoute(search = "", categoryId = "") {
  search = search.trim();
  categoryId = categoryId.trim();

  const whereClause: any = {
    AND: [
      {
        title: {
          contains: search,
        },
      },
      categoryId
        ? {
            categories: {
              some: {
                id: categoryId,
              },
            },
          }
        : {},
    ],
  };

  const qoutes = await db.qoute.findMany({
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

  return qoutes;
}

export async function getAllCategories() {
  const categories = await db.category.findMany();
  return categories;
}
