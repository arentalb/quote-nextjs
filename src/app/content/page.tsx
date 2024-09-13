import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircleOff, MessageSquareQuote } from "lucide-react";
import {
  getRecentCommentsByMe,
  getRecentQuotesByMe,
} from "@/actions/qoute.action";
import React from "react";
import { truncateText } from "@/util";
import GenericCard from "@/components/genericCard";
import GenericCardWrapper from "@/components/genericCardWrapper";
import MagicLink from "@/components/magicLink";

export default async function Page() {
  const quotes = await getRecentQuotesByMe();
  const comments = await getRecentCommentsByMe();

  if (!quotes) {
    return null;
  }

  if (!comments) {
    return null;
  }
  return (
    <div className={"flex flex-col justify-center mt-6 w-full"}>
      <div className={"flex justify-between items-center w-full mb-8"}>
        <h1 className={"text-3xl font-bold"}>Recent quotes </h1>
        <Button asChild>
          <Link href={"/content/quotes/create"}>Create</Link>
        </Button>
      </div>

      {quotes.length > 0 ? (
        <GenericCardWrapper>
          {quotes.map((quote) => (
            <GenericCard
              key={quote.id}
              header={truncateText(quote.title, 50)}
              // content={truncateText(quote.title, 60)}
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
      {quotes.length !== 0 && (
        <MagicLink href={"/content/quotes"} title={"View All your quotes"} />
      )}
      <div className={"flex justify-between items-center w-full mb-8 mt-8"}>
        <h1 className={"text-3xl font-bold"}>Recent comments </h1>
      </div>
      {comments.length > 0 ? (
        <GenericCardWrapper>
          {comments.map((comment) => (
            <GenericCard
              key={comment.id}
              header={truncateText(comment.message, 50)}
              // content={truncateText(quote.title, 60)}
              footer={"By: you"}
              link={`/quote/${comment?.qouteId}`}
              date={comment.created_at}
            />
          ))}
        </GenericCardWrapper>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <MessageCircleOff width={60} height={100} strokeWidth={0.5} />
          <p>No Message Found</p>
        </div>
      )}
      {comments.length !== 0 && (
        <MagicLink
          href={"/content/comments"}
          title={"View All your comments"}
        />
      )}
    </div>
  );
}
