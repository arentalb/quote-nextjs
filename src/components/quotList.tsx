import React from "react";
import { MessageSquareQuote } from "lucide-react";
import GenericCardWrapper from "@/components/genericCardWrapper";
import GenericCard from "@/components/genericCard";
import { truncateText } from "@/lib/utils";
import { getAuth } from "@/lib/auth/getAuth";
import { QuoteDetail } from "@/actions/qoute.action.type";

export default async function QuoteList({ quotes }: { quotes: QuoteDetail[] }) {
  const { user } = await getAuth();

  return (
    <div>
      {quotes.length > 0 ? (
        <GenericCardWrapper>
          {quotes.map((quote) => (
            <GenericCard
              key={quote.id}
              header={truncateText(quote.title, 50)}
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
    </div>
  );
}
