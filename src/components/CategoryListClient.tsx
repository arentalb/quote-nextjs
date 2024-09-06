"use client";
import React, { useState } from "react";
import { badgeVariants } from "@/components/ui/badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";

interface CategoryListClientProps {
  categories: Category[];
  selectedCategory: string;
}

export default function CategoryListClient({
  categories,
  selectedCategory: initialSelectedCategory,
}: CategoryListClientProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialSelectedCategory,
  );

  function handleSelectCategory(category: string) {
    const newSelectedCategory = selectedCategory === category ? "" : category; // Deselect if the same category is clicked
    setSelectedCategory(newSelectedCategory);

    const params = new URLSearchParams(searchParams.toString());
    if (newSelectedCategory) {
      params.set("category", newSelectedCategory);
    } else {
      params.delete("category");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="no-scrollbar flex gap-x-4 mb-16 overflow-x-auto whitespace-nowrap">
      <button
        className={`${badgeVariants({ variant: "outline" })} px-4 py-2 ${
          selectedCategory === "" ? "border-2 border-primary" : ""
        }`}
        onClick={() => handleSelectCategory("")}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`${badgeVariants({ variant: "outline" })} px-4 py-2 ${
            selectedCategory === category.name ? "border-2 border-primary" : ""
          }`}
          onClick={() => handleSelectCategory(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
