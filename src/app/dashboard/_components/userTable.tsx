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
import { UserWithOutPassword } from "@/actions/user.action.type";
import { UserPen, UserRoundX } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTableVisibility from "@/app/dashboard/_components/useTableVisibility";
import TableVisibilityButton from "@/app/dashboard/_components/tableVisiblityButton";

export function UserTable({ users }: { users: UserWithOutPassword[] }) {
  const [displayedRows, isAllRowsVisible, toggleRowVisibility] =
    useTableVisibility(users, 5);

  function handelChangeUserRole() {}
  function handleDeleteUser() {}
  return (
    <div>
      <div className={"flex justify-between items-center w-full mb-8"}>
        <h1 className={"text-3xl font-bold"}>
          {isAllRowsVisible ? "All Users" : "Recent Users "}
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
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedRows.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className={"flex  gap-4"}>
                    <button onClick={handelChangeUserRole}>
                      <UserPen width={20} height={20} />
                    </button>

                    <button onClick={handleDeleteUser}>
                      <UserRoundX
                        width={20}
                        height={20}
                        className={"text-red-500/50"}
                      />
                    </button>
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
