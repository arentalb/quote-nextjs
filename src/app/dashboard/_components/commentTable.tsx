"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTableVisibility from "@/app/dashboard/_components/useTableVisibility";
import TableVisibilityButton from "@/app/dashboard/_components/tableVisiblityButton";
import { AllComments } from "@/actions/qoute.action.type";
import Link from "next/link";
import { truncateText } from "@/util";

export function CommentTable({ comments }: { comments: AllComments[] }) {
  const [displayedRows, isAllRowsVisible, toggleRowVisibility] =
    useTableVisibility(comments, 5);

  return (
    <div>
      <div className={"flex justify-between items-center w-full mb-8"}>
        <h1 className={"text-3xl font-bold"}>
          {isAllRowsVisible ? "All Comments" : "Recent Comments "}
        </h1>
      </div>

      <div>
        <div className="rounded-md border">
          <Table>
            <TableCaption className={"mb-4"}>
              <Button variant={"secondary"} onClick={toggleRowVisibility}>
                <TableVisibilityButton isAllRowsVisible={isAllRowsVisible} />
              </Button>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Comment</TableHead>
                <TableHead>Writer</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedRows.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>{truncateText(comment.message, 50)}</TableCell>
                  <TableCell>{comment.User.username}</TableCell>
                  <TableCell className={"flex  gap-4"}>
                    <Link href={`/quote/${comment.qouteId}`}>
                      <Eye width={20} height={20} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
