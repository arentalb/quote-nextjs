"use client";

import React, { useState } from "react";
import { Trash } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { deleteQuote } from "@/actions/qoute.action";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/shared/loadingSpinner";
import { useRouter } from "next/navigation";

export default function DeleteQuoteButton({ quoteId }: { quoteId: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      await deleteQuote(quoteId);
      toast({
        title: "Quote deleted successfully!",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Failed to delete quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      router.push("/");
    }
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      aria-label="Delete Quote"
      className={`flex items-center text-red-500/60`}
      disabled={loading}
    >
      {loading ? <LoadingSpinner /> : <Trash width={20} height={20} />}
    </button>
  );
}
