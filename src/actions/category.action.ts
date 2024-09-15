"use server";
import { Category } from "@prisma/client";
import db from "@/lib/db";
import { getAuth } from "@/lib/auth/getAuth";

export async function getAllCategories(): Promise<Category[]> {
  return db.category.findMany();
}

export async function createNewCategory(name: string) {
  const { user } = await getAuth();
  if (!user || user.role !== "admin") {
    return null;
  }
  return db.category.create({
    data: {
      name: name,
    },
  });
}

export async function updateCategory(categoryId: string, newName: string) {
  const { user } = await getAuth();
  if (!user || user.role !== "admin") {
    return null;
  }
  return db.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: newName,
    },
  });
}

export async function deleteCategory(categoryId: string) {
  const { user } = await getAuth();
  if (!user || user.role !== "admin") {
    return null;
  }
  return db.category.delete({
    where: {
      id: categoryId,
    },
  });
}
