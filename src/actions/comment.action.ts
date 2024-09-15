"use server";

import { getAuth } from "@/lib/auth/getAuth";
import db from "@/lib/db";
import { Comment } from "@prisma/client";
import { QuoteComments } from "@/actions/comment.action.type";
import { AllComments, CommentWithQuoteId } from "@/actions/qoute.action.type";
import { redirect } from "next/navigation";

export async function getComments(id: string): Promise<QuoteComments | null> {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }
  return db.qoute.findUnique({
    where: {
      id: id,
    },
    include: {
      comments: {
        orderBy: {
          created_at: "desc",
        },
        select: {
          id: true,
          message: true,
          created_at: true,
          User: {
            select: {
              username: true,
              id: true,
            },
          },
        },
      },
    },
  });
}
export async function getRecentCommentsByMe(): Promise<Comment[] | null> {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }
  return db.comment.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updated_at: "asc",
    },
    take: 3,
  });
}

export async function getAllCommentsByMe(): Promise<
  CommentWithQuoteId[] | null
> {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }
  return db.comment.findMany({
    where: {
      userId: user.id,
    },
    select: {
      qouteId: true,
      message: true,
      created_at: true,
      updated_at: true,
      userId: true,
      id: true,
    },
    orderBy: {
      updated_at: "asc",
    },
  });
}

export async function getAllComments(): Promise<AllComments[] | null> {
  const { user } = await getAuth();
  if (!user || user.role !== "admin") {
    redirect("/");
  }
  return db.comment.findMany({
    select: {
      id: true,
      message: true,
      qouteId: true,
      User: {
        select: {
          username: true,
          id: true,
        },
      },
    },
  });
}

export async function createNewComment(
  message: string,
  quoteID: string,
): Promise<Comment | null> {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }
  if (message.trim().length === 0) {
    throw new Error("Comment message could not be null ");
  }
  return db.comment.create({
    data: {
      message: message,
      qouteId: quoteID,
      userId: user?.id,
    },
  });
}

export async function updateComment(
  commentId: string,
  newComment: string,
): Promise<Comment | null> {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }

  if (newComment.trim().length === 0) {
    throw new Error("Comment message could not be null ");
  }

  const comment = await db.comment.findUnique({
    where: {
      id: commentId,
    },
    select: {
      userId: true,
    },
  });

  if (!comment) {
    return null;
  }

  if (comment.userId !== user.id) {
    return null;
  }

  return db.comment.update({
    where: {
      id: commentId,
    },
    data: {
      message: newComment,
    },
  });
}

export async function deleteComment(
  commentId: string,
): Promise<null | undefined> {
  const { user } = await getAuth();
  if (!user) {
    return null;
  }

  const comment = await db.comment.findUnique({
    where: {
      id: commentId,
    },
    select: {
      userId: true,
    },
  });

  if (!comment) {
    return null;
  }

  if (comment.userId !== user.id && user.role !== "admin") {
    return null;
  }

  await db.comment.delete({
    where: {
      id: commentId,
    },
  });
}
