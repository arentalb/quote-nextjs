import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Quote, Tag } from "lucide-react";

import { formatDate } from "@/util";
import { getQuoteById } from "@/actions/qoute.action";
import CommentSection from "@/components/commentSection";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth/getAuth";

export default async function Page({ params }: { params: { slug: string } }) {
  const { user } = await getAuth();
  if (!user) {
    redirect("/signup");
  }
  const quote = await getQuoteById(params.slug);
  if (!quote) {
    return <p>qoute not founded </p>;
  }

  return (
    <div className="pb-10">
      <Card className="shadow-lg rounded-lg p-6">
        <CardHeader className="border-b border-gray-200 pb-4 mb-10">
          <h1 className="text-3xl font-extrabold">{quote.title}</h1>
        </CardHeader>
        <CardContent className="space-y-6">
          <blockquote className="relative text-lg italic max-w-2xl px-4 py-6 border-l-4 border-gray-300 rounded-lg">
            <Quote className="absolute top-2 left-4 w-6 h-6" />
            <Quote className="absolute bottom-2 right-4 w-6 h-6 transform rotate-180" />
            <p className="relative py-8">{quote.body}</p>
          </blockquote>

          <div className="flex gap-8 items-center">
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

      <CommentSection slug={params.slug} />
    </div>
  );
}
