import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Quote, Tag } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { getQuoteById } from "@/actions/qoute.action";
import CommentSection from "@/app/quote/[id]/_components/commentSection";
import { notFound, redirect } from "next/navigation";
import { getAuth } from "@/lib/auth/getAuth";
import DeleteQuoteButton from "@/app/quote/[id]/deleteQuoteButton";

export default async function Page({ params }: { params: { id: string } }) {
  const { user } = await getAuth();
  if (!user) {
    redirect("/signin");
  }
  const quote = await getQuoteById(params.id);
  if (!quote) {
    return notFound();
  }

  return (
    <div className="pb-10">
      <Card className="shadow-lg rounded-lg p-6">
        <CardHeader className="border-b border-gray-200 pb-4 mb-10 px-0 md:px-6  ">
          <div className={"flex justify-between items-center"}>
            <h1 className="text-3xl font-extrabold">{quote.title}</h1>
            <DeleteQuoteButton quoteId={quote.id} ownerId={quote.userId} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-0 md:px-6">
          <blockquote className="relative text-lg italic max-w-2xl px-4 py-6 border-l-4 border-gray-300 rounded-lg">
            <Quote className="absolute top-2 left-4 w-6 h-6" />
            <Quote className="absolute bottom-2 right-4 w-6 h-6 transform rotate-180" />
            <p className="relative py-8">{quote.body}</p>
          </blockquote>

          <div className="flex gap-8 flex-wrap items-center">
            <p className="text-md">
              Author: <span className="font-semibold">{quote.author}</span>
            </p>
            <p className="text-md">
              By: <span className="font-semibold">{quote.User.username}</span>
            </p>
            <p className="text-sm">{formatDate(quote.created_at)}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {quote.categories.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center rounded-full py-1 text-sm"
              >
                <Tag className="mr-1" width={15} height={15} />
                <p>{cat.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <CommentSection quoteId={params.id} />
    </div>
  );
}
