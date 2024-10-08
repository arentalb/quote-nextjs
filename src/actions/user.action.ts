"use server";

import { UpdateProfileParams } from "@/types";
import { UserWithOutPassword } from "@/actions/user.action.type";
import db from "@/lib/db";
import { getAuth } from "@/lib/auth/getAuth";
import { redirect } from "next/navigation";

export async function updateProfile(
  data: UpdateProfileParams,
): Promise<UserWithOutPassword> {
  const { user } = await getAuth();

  return db.user.update({
    where: {
      id: user?.id,
    },
    data: {
      email: data.email,
      username: data.username,
    },
    select: {
      id: true,
      email: true,
      role: true,
      username: true,
    },
  });
}

export async function getAllUsers(): Promise<UserWithOutPassword[]> {
  const { user } = await getAuth();
  if (!user || user?.role !== "admin") {
    redirect("/");
  }
  return db.user.findMany({
    select: {
      id: true,
      username: true,
      role: true,
      email: true,
    },
    orderBy: {
      updated_at: "desc",
    },
  });
}

export async function updateUserRole(id: string, newRole: string) {
  const { user } = await getAuth();
  return db.user.update({
    where: {
      id: id,
    },
    data: {
      role: newRole,
    },
    select: {
      id: true,
      email: true,
      role: true,
      username: true,
    },
  });
}

export async function deleteUser(id: string) {
  const { user } = await getAuth();
  if (!user || user?.role !== "admin") {
    redirect("/");
  }
  return db.user.delete({
    where: {
      id: id,
    },
  });
}
