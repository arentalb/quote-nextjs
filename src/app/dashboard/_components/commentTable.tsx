"use client";
import React from "react";

import {
  Table,
  TableBody,
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
import { truncateText } from "@/lib/utils";

export function CommentTable({ comments }: { comments: AllComments[] | null }) {
  const [displayedRows, isAllRowsVisible, toggleRowVisibility] =
    useTableVisibility(comments || [], 5);

  return (
    <div className={"w-auto"}>
      <div className={"flex justify-between items-center w-full mb-8"}>
        <h1 className={"text-3xl font-bold"}>
          {isAllRowsVisible ? "All Comments" : "Recent Comments "}
        </h1>
        <Button variant={"secondary"} onClick={toggleRowVisibility}>
          <TableVisibilityButton isAllRowsVisible={isAllRowsVisible} />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Comment</TableHead>
            <TableHead>Writer</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedRows.map((comment) => (
            <TableRow
              key={comment.id}
              className={"whitespace-nowrap text-nowrap"}
            >
              <TableCell>{truncateText(comment.message, 50)}</TableCell>
              <TableCell>{comment.User.username}</TableCell>
              <TableCell className={"flex gap-4 items-center "}>
                <Link href={`/quote/${comment.qouteId}`}>
                  <Eye width={20} height={20} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
