"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string;
}

export default function CategoryListClient({
  categories,
  selectedCategory: initialSelectedCategory,
}: CategoryListProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialSelectedCategory,
  );

  function handleSelectCategory(category: string) {
    const newSelectedCategory = selectedCategory === category ? "" : category;
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
      <Button
        type={"button"}
        variant={"ghost"}
        className={`  px-4 py-2 border-2 ${
          selectedCategory === "" ? "border-2 border-primary" : ""
        }`}
        onClick={() => handleSelectCategory("")}
      >
        All Categories
      </Button>
      {categories.map((category) => (
        <Button
          type={"button"}
          variant={"ghost"}
          key={category.id}
          className={` px-4 py-2 border-2  ${
            selectedCategory === category.name ? "border-2 border-primary" : ""
          }`}
          onClick={() => handleSelectCategory(category.name)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
