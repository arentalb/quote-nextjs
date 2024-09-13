"use client"; // Ensure this is at the top

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useTableVisibility from "@/app/dashboard/_components/useTableVisibility";
import TableVisibilityButton from "@/app/dashboard/_components/tableVisiblityButton";
import DeleteUserModel from "@/app/dashboard/_components/deleteUserModel";
import { deleteUser, getAllUsers, updateUserRole } from "@/actions/user.action";
import { UserWithOutPassword } from "@/actions/user.action.type";
import TableSkeleton from "@/components/skeletons/tableSkeleton";
import UpdateUserModel from "@/app/dashboard/_components/updateUserModel";
import { useAuth } from "@/contexts/AuthContext";

export function UserTable() {
  const [userList, setUserList] = useState<UserWithOutPassword[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [
    displayedRows,
    isAllRowsVisible,
    toggleRowVisibility,
    setDisplayedRows,
  ] = useTableVisibility(userList, 5);
  const { user } = useAuth();
  const loggedUser = user;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await getAllUsers();
        setUserList(fetchedUsers);
        setDisplayedRows(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setDisplayedRows]);

  async function handleDeleteUser(userId: string) {
    try {
      await deleteUser(userId);
      const updatedUsers = userList.filter((user) => user.id !== userId);
      setUserList(updatedUsers);
      setDisplayedRows(updatedUsers);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  }
  async function handleUpdateUser(userId: string, newRole: string) {
    try {
      await updateUserRole(userId, newRole);
      const updatedUsers = userList.map((user) => {
        if (user.id === userId) {
          return { ...user, role: newRole };
        } else {
          return user;
        }
      });
      setUserList(updatedUsers);
      setDisplayedRows(updatedUsers);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  }

  return (
    <div className={"w-auto"}>
      <div className={"flex justify-between items-center  mb-8"}>
        <h1 className={"text-3xl font-bold"}>
          {isAllRowsVisible ? "All Users" : "Recent Users "}
        </h1>
        <Button variant={"secondary"} onClick={toggleRowVisibility}>
          <TableVisibilityButton isAllRowsVisible={isAllRowsVisible} />
        </Button>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <Table>
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
              <TableRow
                key={user.id}
                className={"whitespace-nowrap text-nowrap"}
              >
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className={"flex gap-4 items-center"}>
                  {user.id !== loggedUser?.id && (
                    <>
                      <UpdateUserModel
                        userId={user.id}
                        handleUpdateUser={handleUpdateUser}
                        currentRole={user.role}
                      />
                      <DeleteUserModel
                        userId={user.id}
                        handleDeleteUser={handleDeleteUser}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
