import { MessageCircleOff } from "lucide-react";
import React from "react";
import { truncateText } from "@/lib/utils";
import GenericCard from "@/components/genericCard";
import GenericCardWrapper from "@/components/genericCardWrapper";
import { getAllCommentsByMe } from "@/actions/comment.action";

export default async function Page() {
  const comments = await getAllCommentsByMe();

  if (!comments) {
    return null;
  }

  return (
    <div className={"flex flex-col justify-center mt-6 w-full"}>
      <div className={"flex justify-between items-center w-full mb-8 mt-8"}>
        <h1 className={"text-3xl font-bold"}>All comments </h1>
      </div>
      {comments.length > 0 ? (
        <GenericCardWrapper>
          {comments.map((comment) => (
            <GenericCard
              key={comment.id}
              header={truncateText(comment.message, 50)}
              footer={"By: you"}
              link={`/quote/${comment?.qouteId}`}
              date={comment.created_at}
            />
          ))}
        </GenericCardWrapper>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <MessageCircleOff width={60} height={100} strokeWidth={0.5} />
          <p>No Message Found</p>
        </div>
      )}
    </div>
  );
}
