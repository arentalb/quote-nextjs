import React, { Suspense } from "react";
import SearchInput from "@/components/searchInput";
import QuoteList from "@/components/quotList";
import CategorySkeleton from "@/components/skeletons/categorySkeleton";
import CategoryList from "@/components/categoryList";
import QuoteSkeleton from "@/components/skeletons/quoteSkeleton";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; category?: string };
}) {
  const query = searchParams?.query || "";
  const selectedCategory = searchParams?.category || "";

  return (
    <div>
      <div>
        <div className="mb-8 flex flex-col justify-center items-center">
          <h1 className="text-5xl mb-8 text-center capitalize">Quotes</h1>
          <SearchInput />
        </div>
      </div>
      <Suspense key={"category"} fallback={<CategorySkeleton />}>
        <CategoryList selectedCategory={selectedCategory} />
      </Suspense>

      <Suspense key={query} fallback={<QuoteSkeleton />}>
        <QuoteList query={query} category={selectedCategory} />
      </Suspense>
    </div>
  );
}
