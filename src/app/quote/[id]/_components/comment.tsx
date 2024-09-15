import { useAuth } from "@/lib/auth/AuthContext";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoadingSpinner from "@/components/shared/loadingSpinner";
import { PenLine, SendHorizontal, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";

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

export default function Comment({
  message,
  userId,
  commentId,
  commenterId,
  commenterName,
  date,
  onUpdate,
  onDelete,
}: CommentProps) {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>(message);
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const toggleEditMode = () => setEditMode((prev) => !prev);

  const handleEdit = async () => {
    setLoadingEdit(true);
    if (editMode && newComment !== message) {
      await onUpdate(commentId, newComment);
    }
    setLoadingEdit(false);
    toggleEditMode();
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    await onDelete(commentId);
    setLoadingDelete(false);
  };

  return (
    <Card className="shadow-lg rounded-lg px-6">
      <CardHeader className="pb-2 flex justify-between items-center  flex-row">
        <p className="text-xs font-semibold ">
          {commenterId === userId ? "You" : commenterName}
        </p>
        <div className="flex gap-4 flex-row">
          {commenterId === userId && (
            <button
              type="button"
              onClick={toggleEditMode}
              aria-label={"Edit Comment"}
              disabled={loadingEdit}
            >
              {loadingEdit ? (
                <LoadingSpinner />
              ) : (
                <PenLine width={20} height={20} />
              )}
            </button>
          )}
          {(commenterId === userId || user?.role === "admin") && (
            <button
              type="button"
              onClick={handleDelete}
              aria-label="Delete Comment"
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <LoadingSpinner />
              ) : (
                <Trash width={20} height={20} className="text-red-500/60" />
              )}
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {editMode ? (
          <div className={"relative flex max-w-2xl mb-4 "}>
            <Input
              className="h-14 py-[9px] pr-10"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              name="comment"
              type="text"
            />
            <button
              onClick={handleEdit}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              disabled={loadingEdit}
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
