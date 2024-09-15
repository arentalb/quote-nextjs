import React from "react";
import { getAllCategories } from "@/actions/category.action";
import CategoryForm from "@/components/forms/categoryForm";

export default async function Page() {
  const categories = await getAllCategories();

  if (!categories) {
    return null;
  }

  return <CategoryForm categories={categories} />;
}
