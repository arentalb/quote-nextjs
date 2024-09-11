import Link from "next/link";
import { QuoteDetail } from "@/actions/qoute.action.type";
import { formatDate } from "@/util";

const customOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};
export default function QuoteCard({ quote }: { quote: QuoteDetail }) {
  return (
    <Link
      href={`/quote/${quote?.id}`}
      className={
        "px-4 py-6 flex flex-col  text-start rounded-lg border-2 border-secondary hover:border-primary hover:scale-105 transition-transform transition-border duration-300 ease-in-out focus:outline-none"
      }
    >
      <p className="mb-6 text-lg font-semibold">{quote.title}</p>
      <div className="text-sm flex mt-auto justify-between  w-full items-center">
        <p className="text-primary opacity-50">By: {quote.User.username}</p>
        <p className="text-primary opacity-50">
          {formatDate(quote.created_at, customOptions)}
        </p>
      </div>
    </Link>
  );
}
