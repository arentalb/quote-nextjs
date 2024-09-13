import React from "react";
import { getAllUsers } from "@/actions/user.action";
import { UserTable } from "@/app/dashboard/_components/userTable";

export default async function Page() {
  const users = await getAllUsers();
  return (
    <div className={"flex flex-col justify-center mt-6 w-full"}>
      <UserTable users={users} />

      <br />
      <br />
      <div> recent quotes </div>

      <div> recent comments </div>
    </div>
  );
}
