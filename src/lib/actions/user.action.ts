"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import { UserFormValidation } from "@/lib/validation";
import { createSession, decrypt } from "@/lib/session";
import {
  CreateUserParams,
  LoginUserParams,
  Role,
  UpdateProfileParams,
} from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createUser(user: CreateUserParams) {
  const validatedFields = UserFormValidation.safeParse(user);

  if (!validatedFields.success) {
    throw Error("Validation error ");
  }

  const validatedUser = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(validatedUser.password, 10);
    const createdUser = await db.user.create({
      data: {
        username: validatedUser.username,
        email: validatedUser.email,
        password: hashedPassword,
        role: Role.User,
      },
    });

    await createSession(createdUser.id, createdUser.role);
    return;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw Error("User already exists ");
    } else {
      throw Error("Failed to create user");
    }
  }
}

export async function loginUser(user: LoginUserParams) {
  const loggedUser = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!loggedUser) {
    throw Error("User dose not exists ");
  }
  const hashedPassword = await bcrypt.compare(
    user.password,
    loggedUser.password,
  );
  if (!hashedPassword) {
    throw Error("Wrong password ");
  }
  await createSession(loggedUser.id, loggedUser.role);
  return;
}

export async function logoutUser() {
  cookies().delete("session");
  redirect("login");
  return;
}
export async function getUser() {
  const cookie = cookies().get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  const role = String(session?.role);
  const isAuthenticated = !!session?.userId;
  return { isAuthenticated, role };
}
export async function getUserID() {
  const cookie = cookies().get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // Return the userId if session is valid; otherwise, return null
  return String(session?.userId);
}

export async function me() {
  const cookie = cookies().get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  const userId = String(session?.userId);
  const profile = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      role: true,
      username: true,
    },
  });
  console.log(profile);
  return profile;
}

export async function updateProfile(data: UpdateProfileParams) {
  console.log("data ---- ");
  console.log(data.email);
  console.log(data.username);

  const userId = await getUserID(); // Assuming this function fetches the current user's ID

  const updatedProfile = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      email: data.email,
      username: data.username,
    },
    select: {
      email: true,
      role: true,
      username: true,
    },
  });
  return updatedProfile;
}
