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
import { UserPen } from "lucide-react";
import React from "react";

interface DeleteUserModelProps {
  handleUpdateUser: (userId: string, updatedRole: string) => void;
  userId: string;
  currentRole: string;
}

export default function UpdateUserModel({
  userId,
  currentRole,
  handleUpdateUser,
}: DeleteUserModelProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <UserPen width={20} height={20} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to change this user role ?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form
            action={() =>
              handleUpdateUser(
                userId,
                currentRole === "admin" ? "user" : "admin",
              )
            }
          >
            <AlertDialogAction type="submit">
              Make it {currentRole === "admin" ? "user" : "admin"}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
