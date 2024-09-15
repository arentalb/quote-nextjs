import Link from "next/link";
import {formatDate, truncateText} from "@/lib/utils";
import React from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";

interface GenericCardProps {
  header: string;
  content?: string;
  footer: string;
  link: string;
  date: Date;
}

const customOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

export default function GenericCard({
  header,
  content,
  footer,
  link,
  date,
}: GenericCardProps) {
  return (
    <Card className="flex flex-col h-full hover:scale-105 transition-transform duration-300 ease-in-out border-2 border-secondary hover:border-primary">
      <Link href={link} className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {truncateText(header, 60)}
          </CardTitle>
        </CardHeader>
        {content && <CardContent className="flex-grow">{content}</CardContent>}
        <CardFooter className="flex justify-between items-center text-sm mt-auto">
          <p className="text-primary opacity-50">{footer}</p>
          <p className="text-primary opacity-50">
            {formatDate(date, customOptions)}
          </p>
        </CardFooter>
      </Link>
    </Card>
  );
}
