"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/util";
import {
  CreateNewComment,
  DeleteComment,
  getQuoteComments,
  UpdateComment,
} from "@/actions/qoute.action";
import { Input } from "@/components/ui/input";
import { MessageCircleOff, PenLine, SendHorizontal, Trash } from "lucide-react";
import CommentSkeleton from "@/components/skeletons/commentSkeleton";
import { QuoteComments } from "@/actions/qoute.action.type";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function CommentSection({ slug }: { slug: string }) {
  const [data, setData] = useState<QuoteComments | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const commentsData = await getQuoteComments(slug);
        setData(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
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

  const handleCommentUpdate = async (commentId: string, newComment: string) => {
    if (newComment.trim().length === 0) {
      return;
    }
    try {
      await UpdateComment(commentId, newComment);
      const commentsData = await getQuoteComments(slug);
      setData(commentsData);
    } catch (error) {
      console.log(error);
      toast({
        title: "Could not update the comment ",
        variant: "destructive",
      });
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    try {
      await DeleteComment(commentId);
      const commentsData = await getQuoteComments(slug);
      setData(commentsData);
    } catch (error: any) {
      toast({
        title: "Could not delete the comment ",
        variant: "destructive",
      });
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
        {loading ? (
          <div className="flex flex-col space-y-4">
            <CommentSkeleton />
          </div>
        ) : (
          <>
            {data?.comments.length ? (
              data.comments.map((comment) => (
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
          </>
        )}
      </div>
    </div>
  );
}
interface CommentProps {
  message: string;
  userId: string | undefined;
  commentId: string;
  commenterId: string;
  commenterName: string;
  date: Date;
  onUpdate: (commentId: string, newComment: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
}

function Comment({
  message,
  userId,
  commentId,
  commenterId,
  commenterName,
  date,
  onUpdate,
  onDelete,
}: CommentProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>(message);

  const toggleEditMode = () => setEditMode((prev) => !prev);

  const handleEdit = async () => {
    if (editMode && newComment !== message) {
      await onUpdate(commentId, newComment);
    }
    toggleEditMode();
  };

  const handleDelete = async () => {
    await onDelete(commentId);
  };

  return (
    <Card className="shadow-lg rounded-lg px-6">
      <CardHeader className="pb-2 flex justify-between items-center  flex-row">
        <p className="text-xs font-semibold ">
          {commenterId === userId ? "You" : commenterName}
        </p>
        {/*<p>{editMode ? "Editing..." : "View Mode"}</p>*/}
        {commenterId === userId && (
          <div className="flex gap-4 flex-row">
            <button
              type="button"
              onClick={toggleEditMode}
              aria-label={editMode ? "Save Comment" : "Edit Comment"}
            >
              <PenLine width={20} height={20} />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              aria-label="Delete Comment"
            >
              <Trash width={20} height={20} className="text-red-500/60" />
            </button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {editMode ? (
          <div className={"relative flex max-w-2xl mb-4 "}>
            <label htmlFor="message" className="sr-only">
              Comment
            </label>
            <Input
              className="h-14 py-[9px] pr-10"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              name="comment"
              type="text"
              id="message"
            />

            <button
              onClick={handleEdit}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <SendHorizontal className="h-[18px] w-[18px] text-gray-500 transition-transform duration-500 hover:scale-150" />
            </button>
          </div>
        ) : (
          <h1 className="font-extrabold mb-4 max-w-2xl">{message}</h1>
        )}
        <p className="text-sm text-gray-500">{formatDate(date)}</p>
      </CardContent>
    </Card>
  );
}
