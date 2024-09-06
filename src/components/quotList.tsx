import QuoteCard from "@/components/quoteCard";
import React from "react";
import { getAllQoute } from "@/lib/actions/qoute.action";
import { FileText } from "lucide-react";

export default async function QouteList({
  query,
  category,
}: {
  query: string;
  category: string;
}) {
  const quotes = await getAllQoute(query, category);

  return (
    <>
      {quotes.length > 0 ? (
        <ul className="grid grid-cols-3 gap-4">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} qoute={quote} />
          ))}
        </ul>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <FileText width={100} height={150} strokeWidth={0.5} />
          <p>No Quote Found</p>
        </div>
      )}
    </>
  );
}
