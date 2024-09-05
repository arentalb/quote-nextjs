"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { logoutUser } from "@/lib/actions/user.action";

export default function DropDownMenu({ links }: { links: string[] }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto">
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
