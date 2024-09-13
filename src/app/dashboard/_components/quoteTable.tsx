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
import { QuoteDetail } from "@/actions/qoute.action.type";
import { truncateText } from "@/util";
import Link from "next/link";

export function QuoteTable({ quote }: { quote: QuoteDetail[] }) {
  const [displayedRows, isAllRowsVisible, toggleRowVisibility] =
    useTableVisibility(quote, 5);

  return (
    <div>
      <div className={"flex justify-between items-center w-full mb-8"}>
        <h1 className={"text-3xl font-bold"}>
          {isAllRowsVisible ? "All Quotes" : "Recent Quotes "}
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
                <TableHead>Title</TableHead>
                <TableHead>Body</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Publisher</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedRows.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell>{truncateText(quote.title, 20)}</TableCell>
                  <TableCell>{truncateText(quote.body, 20)}</TableCell>
                  <TableCell>{quote.author}</TableCell>
                  <TableCell>{quote.User.username}</TableCell>
                  <TableCell className={"flex  gap-4"}>
                    <Link href={`/quote/${quote.id}`}>
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
