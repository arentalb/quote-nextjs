"use client";
import React, { useEffect, useState } from "react";
import { getAllCategories, getAllQoute } from "@/lib/actions/qoute.action";
import { badgeVariants } from "@/components/ui/badge";
import { QouteWithUser } from "@/types/schema.type";
import { Category } from "@prisma/client";
import QouteCard from "@/components/qouteCard";
import { Input } from "@/components/ui/input";
import QouteSkeleton from "@/components/skeletons/qouteSkeleton";
import { FileText } from "lucide-react";
import CategorySkeleton from "@/components/skeletons/categorySkeleton";
import { cn } from "@/lib/utils";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [quotes, setQuotes] = useState<QouteWithUser[]>([]);
  const [qouteLoading, setQouteLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedCategories = await getAllCategories();
        const fetchedQuotes = await getAllQoute(search, selectedCategory);
        setCategories(fetchedCategories);
        setQuotes(fetchedQuotes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setQouteLoading(false);
        setCategoryLoading(false);
      }
    }

    fetchData();
  }, [search, selectedCategory]);

  return (
    <div>
      <div>
        <div className="mb-8 flex flex-col justify-center items-center">
          <h1 className="text-5xl mb-8 text-center capitalize">Quotes</h1>
          <Input
            type="text"
            className="w-1/2 h-14"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="no-scrollbar flex gap-x-4 mb-16 overflow-x-auto whitespace-nowrap">
        <div
          className={`${badgeVariants({ variant: "outline" })} px-4 py-2`}
          onClick={() => {
            setSelectedCategory("");
          }}
        >
          All Categories
        </div>

        {categoryLoading &&
          Array.from({ length: 14 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${badgeVariants({ variant: "outline" })} px-4 py-2 ${cn(selectedCategory === category.id ? "border-2 border-primary" : "")}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {qouteLoading && (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <QouteSkeleton key={index} />
          ))}
        </div>
      )}

      {quotes.length !== 0 && !qouteLoading ? (
        <ul className="grid grid-cols-3 gap-4">
          {quotes.map((quote) => (
            <QouteCard key={quote.id} qoute={quote} />
          ))}
        </ul>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <FileText width={100} height={150} strokeWidth={0.5} />
          <p>No Quote Found</p>
        </div>
      )}
    </div>
  );
}
