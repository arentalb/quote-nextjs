import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquareQuote } from "lucide-react";
import { getAllQuotesByMe } from "@/actions/qoute.action";
import React from "react";
import { truncateText } from "@/lib/utils";
import GenericCard from "@/components/genericCard";
import GenericCardWrapper from "@/components/genericCardWrapper";

export default async function Page() {
  const quotes = await getAllQuotesByMe();

  if (!quotes) {
    return null;
  }

  return (
    <div className={"flex flex-col justify-center mt-6 w-full"}>
      <div className={"flex justify-between items-center w-full mb-8"}>
        <h1 className={"text-3xl font-bold"}>All quotes </h1>
        <Button asChild>
          <Link href={"/content/quotes/create"}>Create</Link>
        </Button>
      </div>

      {quotes.length > 0 ? (
        <GenericCardWrapper>
          {quotes.map((quote) => (
            <GenericCard
              key={quote.id}
              header={truncateText(quote.body, 50)}
              footer={"By: you"}
              link={`/content/quotes/edit/${quote?.id}`}
              date={quote.created_at}
            />
          ))}
        </GenericCardWrapper>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <MessageSquareQuote width={60} height={100} strokeWidth={0.5} />
          <p>No Quote Found</p>
        </div>
      )}
    </div>
  );
}
