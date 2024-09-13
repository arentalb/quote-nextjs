import React from "react";
import { getAllQuote } from "@/actions/qoute.action";
import { MessageSquareQuote } from "lucide-react";
import GenericCardWrapper from "@/components/genericCardWrapper";
import GenericCard from "@/components/genericCard";
import { truncateText } from "@/util";
import { getAuth } from "@/lib/auth/getAuth";

export default async function QuoteList({
  query,
  category,
}: {
  query: string;
  category: string;
}) {
  const { user } = await getAuth();
  const quotes = await getAllQuote(query, category);

  return (
    <>
      {quotes.length > 0 ? (
        <GenericCardWrapper>
          {quotes.map((quote) => (
            <GenericCard
              key={quote.id}
              header={truncateText(quote.title, 50)}
              // content={truncateText(quote.title, 60)}
              footer={`By : ${quote.userId === user?.id ? "You" : quote.User.username}`}
              link={`/quote/${quote?.id}`}
              date={quote.created_at}
            />
          ))}
        </GenericCardWrapper>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <MessageSquareQuote width={100} height={150} strokeWidth={0.5} />
          <p>No Quote Found</p>
        </div>
      )}
    </>
  );
}
