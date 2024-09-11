import { getAuth } from "@/lib/auth/getAuth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, MoveRight } from "lucide-react";
import {
  getRecentCommentsByMe,
  getRecentQuotesByMe,
} from "@/actions/qoute.action";
import React from "react";
import { formatDate, truncateText } from "@/util";
import { Comment, Qoute } from "@prisma/client";

export default async function Page() {
  const { user } = await getAuth();
  if (!user) {
    redirect("/");
  }
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
          <Link href={"/quote/create"}>Create</Link>
        </Button>
      </div>
      <div>
        <div className={"mb-6"}>
          {quotes.length > 0 ? (
            <ul className="grid grid-cols-3 gap-4">
              {quotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </ul>
          ) : (
            <div className="flex justify-center flex-col items-center">
              <FileText width={60} height={100} strokeWidth={0.5} />
              <p>No Quote Found</p>
            </div>
          )}
        </div>
        {quotes.length !== 0 && (
          <MagicLink href={"/all/quote"} title={"View All your qoutes"} />
        )}
      </div>

      <div className={"flex justify-between items-center w-full mb-8 mt-20"}>
        <h1 className={"text-3xl font-bold"}>Recent comments </h1>
      </div>
      <div>
        <div className={"mb-6"}>
          {comments.length > 0 ? (
            <ul className="grid grid-cols-3 gap-4">
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </ul>
          ) : (
            <div className="flex justify-center flex-col items-center">
              <FileText width={60} height={100} strokeWidth={0.5} />
              <p>No Comment Found</p>
            </div>
          )}
        </div>
        {comments.length !== 0 && (
          <MagicLink href={"/all/comment"} title={"View All your commennts"} />
        )}
      </div>
    </div>
  );
}
interface MagicLinkProps {
  href: string;
  title: string;
}

const customOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};
function QuoteCard({ quote }: { quote: Qoute }) {
  return (
    <Link
      href={`/quote/${quote?.id}`}
      className={
        "px-4 py-6 flex flex-col  text-start rounded-lg border-2 border-secondary hover:border-primary hover:scale-105 transition-transform transition-border duration-300 ease-in-out focus:outline-none"
      }
    >
      <p className="mb-6 text-lg font-semibold">
        {truncateText(quote.title, 60)}
      </p>
      <div className="text-sm flex mt-auto justify-between  w-full items-center">
        <p className="text-primary opacity-50">By: you</p>
        <p className="text-primary opacity-50">
          {formatDate(quote.created_at, customOptions)}
        </p>
      </div>
    </Link>
  );
}
function CommentCard({ comment }: { comment: Comment }) {
  return (
    <Link
      href={`/quote/${comment?.id}`}
      className={
        "px-4 py-6 flex flex-col  text-start rounded-lg border-2 border-secondary hover:border-primary hover:scale-105 transition-transform transition-border duration-300 ease-in-out focus:outline-none"
      }
    >
      <p className="mb-6 text-lg font-semibold">
        {truncateText(comment.message, 60)}
      </p>
      <div className="text-sm flex mt-auto justify-between  w-full items-center">
        <p className="text-primary opacity-50">By: you</p>
        <p className="text-primary opacity-50">
          {formatDate(comment.created_at, customOptions)}
        </p>
      </div>
    </Link>
  );
}

const MagicLink = ({ href, title }: MagicLinkProps) => {
  return (
    <div className="flex items-end justify-end">
      <Link
        href={href}
        className="group flex items-center justify-center gap-2 text-sm text-gray-600 transition-all"
      >
        <p className="transition-all group-hover:scale-105 group-hover:text-gray-400">
          {title}
        </p>
        <MoveRight className="w-5 h-5 transition-all group-hover:scale-105 group-hover:translate-x-2 group-hover:text-gray-400" />
      </Link>
    </div>
  );
};
