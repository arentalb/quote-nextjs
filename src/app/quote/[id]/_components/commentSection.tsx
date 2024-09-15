"use client";

import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { MessageCircleOff, SendHorizontal } from "lucide-react";
import CommentSkeleton from "@/components/skeletons/commentSkeleton";
import { useAuth } from "@/lib/auth/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Comment from "@/app/quote/[id]/_components/comment";
import {
  createNewComment,
  deleteComment,
  getComments,
  updateComment,
} from "@/actions/comment.action";
import { QuoteComments } from "@/actions/comment.action.type";

export default function CommentSection({ quoteId }: { quoteId: string }) {
  const [commentsData, setCommentsData] = useState<QuoteComments | null>(null);
  const [commentMessage, setCommentMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await getComments(quoteId);
        setCommentsData(fetchedData);
      } catch (error) {
        toast({
          title: "Could not fetch comments",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [quoteId, toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!commentMessage.trim()) {
      toast({ title: "Comment is empty", variant: "destructive" });
      return;
    }

    try {
      await createNewComment(commentMessage, quoteId);
      setCommentMessage("");
      const updatedData = await getComments(quoteId);
      setCommentsData(updatedData);
    } catch (error) {
      toast({
        title: "Could not create new comment",
        variant: "destructive",
      });
    }
  };

  const handleCommentUpdate = async (commentId: string, newMessage: string) => {
    if (!newMessage.trim()) {
      toast({ title: "Comment is empty", variant: "destructive" });
      return;
    }

    try {
      await updateComment(commentId, newMessage);

      const updatedData = await getComments(quoteId);
      setCommentsData(updatedData);
    } catch (error) {
      toast({
        title: "Could not update the comment",
        variant: "destructive",
      });
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      const updatedData = await getComments(quoteId);
      setCommentsData(updatedData);
    } catch (error) {
      toast({
        title: "Could not delete the comment",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h1 className="text-4xl mb-8 mt-12">Comments</h1>
      <form onSubmit={handleSubmit} className="relative flex flex-1">
        <Input
          className="h-14 py-[9px] pr-10"
          id="message"
          name="message"
          placeholder="Write a comment..."
          value={commentMessage}
          onChange={(e) => setCommentMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <SendHorizontal className="h-[18px] w-[18px] text-gray-500 transition-transform duration-500 hover:scale-150" />
        </button>
      </form>

      <div className="mt-10 space-y-10">
        {isLoading ? (
          <div className="flex flex-col space-y-4">
            <CommentSkeleton />
          </div>
        ) : commentsData?.comments.length ? (
          commentsData.comments.map((comment) => (
            <Comment
              key={comment.id}
              message={comment.message}
              userId={user?.id}
              commentId={comment.id}
              commenterId={comment.User?.id}
              commenterName={comment.User.username}
              date={comment.created_at}
              onUpdate={handleCommentUpdate}
              onDelete={handleCommentDelete}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <MessageCircleOff width={100} height={150} strokeWidth={0.5} />
            <p>No Comments Found</p>
          </div>
        )}
      </div>
    </div>
  );
}
