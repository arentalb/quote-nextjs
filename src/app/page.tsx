import React, {Suspense} from "react";
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
          <h1 className="text-5xl mb-2 text-center capitalize">Welcome to QuoteShare</h1>
            <p className={"mb-8 text-sm text-primary/50 max-w-lg text-center"}>
                Share and explore quotes with ease. Join QuoteShare to post, comment, and discover inspiration.
            </p>
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
