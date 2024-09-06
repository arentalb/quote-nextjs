import Link from "next/link";
import { QouteWithUser } from "@/types/schema.type";
import { formatDate } from "@/lib/utils";

const customOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};
export default function QuoteCard({ qoute }: { qoute: QouteWithUser }) {
  return (
    <Link
      href={`/qoute/${qoute.id}`}
      className={
        "px-4 py-6 flex flex-col  text-start rounded-lg border-2 border-secondary hover:border-primary hover:scale-105 transition-transform transition-border duration-300 ease-in-out focus:outline-none"
      }
    >
      <p className="mb-6 text-lg font-semibold">{qoute.title}</p>
      <div className="text-sm flex mt-auto justify-between  w-full items-center">
        <p className="text-primary opacity-50">By: {qoute.User.username}</p>
        <p className="text-primary opacity-50">
          {formatDate(qoute.created_at, customOptions)}
        </p>
      </div>
    </Link>
  );
}
