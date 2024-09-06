import React, { Suspense } from "react";
import QouteSkeleton from "@/components/skeletons/qouteSkeleton";
import SearchInput from "@/components/searchInput";
import QouteList from "@/components/qoutList";
import CategorySkeleton from "@/components/skeletons/categorySkeleton";
import CategoryList from "@/components/categoryList";

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

      <Suspense key={query} fallback={<QouteSkeleton />}>
        <QouteList query={query} category={selectedCategory} />
      </Suspense>
    </div>
  );
}
