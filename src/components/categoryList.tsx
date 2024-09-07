import React from "react";
import { getAllCategories } from "@/lib/actions/qoute.action";
import CategoryListClient from "./categoryListClient";

export default async function CategoryList({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const categories = await getAllCategories();
  return (
    <>
      <CategoryListClient
        categories={categories}
        selectedCategory={selectedCategory}
      />
    </>
  );
}
