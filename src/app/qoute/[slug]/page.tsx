import { getQouteById } from "@/lib/actions/qoute.action";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Quote, Tag } from "lucide-react";

export default async function Page({ params }: { params: { slug: string } }) {
  const qoute = await getQouteById(params.slug);
  if (!qoute) {
    redirect("/");
  }
  console.log(qoute.comments.length);
  return (
    <div className={"pb-10"}>
      <Card className="shadow-lg rounded-lg  p-6 ">
        <CardHeader className="border-b border-gray-200 pb-4 mb-10">
          <h1 className="text-3xl font-extrabold ">{qoute.title}</h1>
        </CardHeader>
        <CardContent className="space-y-6">
          <blockquote className="relative text-lg italic max-w-2xl  px-4 py-6 border-l-4 border-gray-300  rounded-lg">
            <Quote className="absolute top-2 left-4  w-6 h-6 " />
            <Quote className="absolute bottom-2 right-4  w-6 h-6 transform rotate-180" />
            <p className="relative py-8">{qoute.body}</p>
          </blockquote>

          <div className=" flex gap-8  items-center">
            <p className="text-md">
              Author: <span className="font-semibold">{qoute.author}</span>
            </p>
            <p className="text-md">
              By: <span className="font-semibold">{qoute.User.username}</span>
            </p>
            <p className="text-sm">{formatDate(qoute.created_at)}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {qoute.categories.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center  rounded-full py-1 text-sm "
              >
                <Tag className="mr-1 " width={15} height={15} />
                <p>{cat.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className={"mt-10"}>
        <h1 className={"text-4xl mb-8 "}>Comments</h1>
        <div className={"flex flex-col gap-4"}>
          {qoute.comments.length !== 0 ? (
            qoute.comments.map((comment) => (
              <Comment
                key={comment.message}
                message={comment.message}
                username={comment.User.username}
                date={comment.created_at}
              />
            ))
          ) : (
            <p>No comment </p>
          )}
        </div>
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
    <Card className="shadow-lg rounded-lg px-6 ">
      <CardHeader className="pb-2">
        <p className={"text-xs"}>{username}</p>
      </CardHeader>
      <CardContent>
        <h1 className="font-extrabold  mb-6  max-w-2xl">{message}</h1>
        <p className={"text-sm"}>{formatDate(date)}</p>
      </CardContent>
    </Card>
  );
}
