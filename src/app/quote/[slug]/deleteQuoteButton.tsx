"use client";
import {Trash} from "lucide-react";
import React, {useState} from "react";
import {useAuth} from "@/lib/auth/AuthContext";
import {deleteQuote} from "@/actions/qoute.action";
import {useRouter} from "next/navigation";

export default function DeleteQuoteButton({
  quoteId,
  userId,
}: {
  quoteId: string;
  userId: string;
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter

  async function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      await deleteQuote(quoteId);
      router.push("/");
    } catch (err) {
      console.error("Error deleting quote:", err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      {(user?.role === "admin" || userId === user?.id) && (
        <button
          type="button"
          onClick={handleDelete}
          aria-label="Delete Quote"
          className="flex items-center text-red-500/60"
          disabled={loading}
        >
          <Trash width={20} height={20} />
        </button>
      )}
    </div>
  );
}
