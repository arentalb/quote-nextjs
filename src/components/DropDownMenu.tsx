"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { logoutUser } from "@/lib/actions/user.action";
import { Button } from "@/components/ui/button";

export default function DropDownMenu({ links }: { links: string[] }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            A
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-auto mt-2" align={"end"}>
          {links.map((link) => (
            <div key={link}>
              <DropdownMenuItem
                className={"flex justify-center items-center capitalize"}
              >
                <Link href={link}>{link}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
          ))}

          <DropdownMenuItem className={"flex justify-center items-center"}>
            <button
              className={"text-red-600 capitalize"}
              onClick={async () => {
                await logoutUser();
              }}
            >
              logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
