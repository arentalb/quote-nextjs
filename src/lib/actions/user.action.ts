"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import { UserFormValidation } from "@/lib/validation";
import { createSession } from "@/lib/session";
import { CreateUserParams, Role } from "@/types";

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
