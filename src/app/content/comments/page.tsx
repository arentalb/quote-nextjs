import { getAuth } from "@/lib/auth/getAuth";
import { redirect } from "next/navigation";
import { MessageCircleOff } from "lucide-react";
import { getAllCommentsByMe } from "@/actions/qoute.action";
import React from "react";
import { truncateText } from "@/util";
import GenericCard from "@/components/genericCard";
import GenericCardWrapper from "@/components/genericCardWrapper";

export default async function Page() {
  const { user } = await getAuth();
  if (!user) {
    redirect("/");
  }
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
              // content={truncateText(quote.title, 60)}
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
