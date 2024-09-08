import { NextResponse } from "next/server";
import { getUser, verifySession } from "@/lib/dal";

export async function GET() {
  try {
    const session = await verifySession();

    if (!session || !session.isAuth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await getUser();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
