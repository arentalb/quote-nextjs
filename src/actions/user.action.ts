"use server";

import { UpdateProfileParams } from "@/types";
import { UserWithOutPassword } from "@/actions/user.action.type";
import db from "@/lib/db";
import { getAuth } from "@/lib/auth/getAuth";

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
