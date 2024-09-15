import React from "react";
import { UserTable } from "@/app/dashboard/_components/userTable";
import { getAllQuote } from "@/actions/qoute.action";
import { QuoteTable } from "@/app/dashboard/_components/quoteTable";
import { CommentTable } from "@/app/dashboard/_components/commentTable";
import { getAllComments } from "@/actions/comment.action";

export default async function Page() {
  const quotes = await getAllQuote();
  const comments = await getAllComments();

  return (
    <div className={"flex flex-col gap-8 justify-center mt-6 w-auto"}>
      <UserTable />
      <QuoteTable quote={quotes} />
      <CommentTable comments={comments} />
    </div>
  );
}
