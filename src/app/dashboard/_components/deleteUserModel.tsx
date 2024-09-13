import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserRoundX } from "lucide-react";
import React from "react";

interface DeleteUserModelProps {
  handleDeleteUser: (userId: string) => void;
  userId: string;
}

export default function DeleteUserModel({
  userId,
  handleDeleteUser,
}: DeleteUserModelProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <UserRoundX width={20} height={20} className={"text-red-500/50"} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this user ?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={() => handleDeleteUser(userId)}>
            <AlertDialogAction type="submit">Delete</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
