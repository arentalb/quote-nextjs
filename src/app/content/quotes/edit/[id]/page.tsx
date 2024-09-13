import { getAuth } from "@/lib/auth/getAuth";
import { notFound } from "next/navigation";
import React from "react";
import { getAllCategories, getQuoteById } from "@/actions/qoute.action";
import QuoteEditForm from "@/components/forms/quoteEditForm";

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  const { user } = await getAuth();

  const categories = await getAllCategories();

  const quote = await getQuoteById(params.id);
  if (!quote || quote.userId !== user?.id) {
    notFound();
  }

  return (
    <div className={"flex flex-col justify-center mt-6 w-full"}>
      <div className={"w-full md:w-1/2 "}>
        <QuoteEditForm categories={categories} quote={quote} />
      </div>
    </div>
  );
}
