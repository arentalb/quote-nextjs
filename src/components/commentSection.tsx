"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { CreateNewComment, getQuoteComments } from "@/lib/actions/qoute.action";
import { Input } from "@/components/ui/input";
import { MessageCircleOff, SendHorizontal } from "lucide-react";
import CommentSkeleton from "@/components/skeletons/commentSkeleton";
import { QuoteComments } from "@/types/qoute.action.type";
import { useAuth } from "@/contexts/AuthContext";

export default function CommentSection({ slug }: { slug: string }) {
  const [data, setData] = useState<QuoteComments | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const commentsData = await getQuoteComments(slug);
        setData(commentsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchData();
  }, [slug]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;
    try {
      await CreateNewComment(message, slug);
      setMessage("");
      const commentsData = await getQuoteComments(slug);
      setData(commentsData);
    } catch (error) {
      console.error("Error creating a new comment:", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl mb-8 mt-12">Comments</h1>
      <form onSubmit={handleSubmit} className="relative flex flex-1">
        <label htmlFor="message" className="sr-only">
          Comment
        </label>
        <Input
          className="h-14 py-[9px] pr-10"
          id="message"
          name="message"
          placeholder="Write a comment..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <SendHorizontal className="h-[18px] w-[18px] text-gray-500 transition-transform duration-500 hover:scale-150" />
        </button>
      </form>

      <div className="mt-10 space-y-10">
        {loading && (
          <div className="flex flex-col space-y-4">
            <CommentSkeleton />
          </div>
        )}

        {!loading && (
          <>
            {data && data.comments.length > 0 ? (
              data.comments.map((comment) => (
                <Comment
                  key={comment.message}
                  message={comment.message}
                  username={
                    comment.User?.username === user?.username
                      ? "You"
                      : comment.User.username
                  }
                  date={comment.created_at}
                />
              ))
            ) : (
              <div className="flex justify-center flex-col items-center">
                <MessageCircleOff width={100} height={150} strokeWidth={0.5} />
                <p>No Comments Found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Comment({
  message,
  username,
  date,
}: {
  message: string;
  username: string;
  date: Date;
}) {
  return (
    <Card className="shadow-lg rounded-lg px-6">
      <CardHeader className="pb-2">
        <p className="text-xs font-semibold">{username}</p>
      </CardHeader>
      <CardContent>
        <h1 className="font-extrabold mb-4 max-w-2xl">{message}</h1>
        <p className="text-sm text-gray-500">{formatDate(date)}</p>
      </CardContent>
    </Card>
  );
}
