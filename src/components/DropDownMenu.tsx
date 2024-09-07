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
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/UserContext";
import { logoutUser } from "@/lib/actions/auth.action";

export default function DropDownMenu({ links }: { links: string[] }) {
  const { user } = useUser();
  console.log(user);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {user?.username.at(0)}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-auto mt-2" align={"end"}>
          {links.map((link) => (
            <div key={link}>
              <DropdownMenuItem
                className={"flex justify-center items-center capitalize"}
              >
                <Link href={`/${link}`}>{link}</Link>
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
