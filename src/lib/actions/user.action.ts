"use server";

import db from "@/lib/db";
import { decrypt } from "@/lib/session";
import { UpdateProfileParams } from "@/types";
import { cookies } from "next/headers";
import { UserWithOutPassword } from "@/types/user.action.type";

export async function getUserID(): Promise<string> {
  const cookie = cookies().get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  return String(session?.userId);
}

export async function getUser(): Promise<UserWithOutPassword | null> {
  const cookie = cookies().get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  const userId = String(session?.userId);
  return db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      role: true,
      username: true,
    },
  });
}

export async function updateProfile(
  data: UpdateProfileParams,
): Promise<UserWithOutPassword> {
  const userId = await getUserID();

  return db.user.update({
    where: {
      id: userId,
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
