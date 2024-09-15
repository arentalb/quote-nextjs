"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircleOff } from "lucide-react";
import React, { useState } from "react";
import { Category } from "@prisma/client";
import {
  createNewCategory,
  deleteCategory,
  updateCategory,
} from "@/actions/category.action";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CategoryForm({
  categories,
}: {
  categories: Category[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [inputValue, setInputValue] = useState<string>("");

  const { toast } = useToast();
  const router = useRouter();

  function handleSelectCategory(category: Category) {
    setSelectedCategory(category);
    setInputValue(category.name);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.trim() === "") {
      setSelectedCategory(null);
      setInputValue(event.target.value);
    } else {
      setInputValue(event.target.value);
    }
  }

  async function handelCreateEditCategory() {
    if (selectedCategory) {
      try {
        await updateCategory(selectedCategory.id, inputValue);
        toast({
          title: "Category updated",
          variant: "default",
        });
        router.refresh();
      } catch (error) {
        toast({
          title: "Could not update category",
          variant: "destructive",
        });
      }
    } else {
      try {
        await createNewCategory(inputValue);
        toast({
          title: "Category created",
          variant: "default",
        });
        router.refresh();
      } catch (error) {
        toast({
          title: "Could not create category",
          variant: "destructive",
        });
      }
    }

    setInputValue("");
    setSelectedCategory(null);
  }

  async function handelDeleteCategory() {
    if (selectedCategory) {
      try {
        await deleteCategory(selectedCategory.id);
        toast({
          title: "Category deleted",
          variant: "default",
        });
        router.refresh();
        setInputValue("");
        setSelectedCategory(null);
      } catch (error) {
        toast({
          title: "Could not delete category",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <div className={"flex flex-col justify-center mt-6 w-full"}>
      <div className={"flex justify-between items-center w-full mb-8 mt-8"}>
        <h1 className={"text-3xl font-bold"}>
          {selectedCategory ? "Edit Category" : "Create new category"}
        </h1>
      </div>

      <div className={"flex gap-4 items-center mb-8"}>
        <Input
          className={"w-full h-12 pr-16 max-w-lg"}
          placeholder={"Category name"}
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className={"flex gap-2 "}>
          <Button onClick={handelCreateEditCategory}>
            {selectedCategory ? "Edit" : "Create"}
          </Button>
          {selectedCategory && (
            <Button onClick={handelDeleteCategory}>delete</Button>
          )}
        </div>
      </div>

      {categories.length > 0 ? (
        <div className=" flex mb-16  flex-wrap max-w-lg gap-4">
          {categories.map((category) => (
            <Button
              type={"button"}
              variant={"ghost"}
              key={category.id}
              className={`px-4 py-2 border-2 ${
                selectedCategory && selectedCategory.id === category.id
                  ? "border-primary"
                  : ""
              }`}
              onClick={() => handleSelectCategory(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <MessageCircleOff width={60} height={100} strokeWidth={0.5} />
          <p>No Category Found</p>
        </div>
      )}
    </div>
  );
}
