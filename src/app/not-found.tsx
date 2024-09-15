import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="mb-8 text-center">
        <h1 className="text-5xl  capitalize mb-3">Not Found </h1>
        <p className={"mb-8 text-sm"}>
          Sorry we could not find what you were looking for.
        </p>
        <Button asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}
