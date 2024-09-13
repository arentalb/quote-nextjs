import React from "react";
import { getAllUsers } from "@/actions/user.action";
import { UserTable } from "@/app/dashboard/_components/userTable";
import { QuoteTable } from "@/app/dashboard/_components/quoteTable";
import { getAllQuote } from "@/actions/qoute.action";

export default async function Page() {
  const users = await getAllUsers();

  const quotes = await getAllQuote();

  return (
    <div className={"flex flex-col gap-8 justify-center mt-6 w-full"}>
      <UserTable users={users} />
      <QuoteTable quote={quotes} />
      <div> recent comments </div>
    </div>
  );
}
