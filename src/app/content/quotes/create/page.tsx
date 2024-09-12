import { getAuth } from "@/lib/auth/getAuth";
import { redirect } from "next/navigation";
import React from "react";
import QuoteCreateForm from "@/components/forms/quoteCreateForm";
import { getAllCategories } from "@/actions/qoute.action";

export default async function Page() {
  const { user } = await getAuth();
  if (!user) {
    redirect("/");
  }
  const categories = await getAllCategories();
  return (
    <div className={"flex flex-col justify-center mt-6 w-full"}>
      <div className={"w-full md:w-1/2 "}>
        <QuoteCreateForm categories={categories} />
      </div>
    </div>
  );
}