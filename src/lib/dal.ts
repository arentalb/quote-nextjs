import { cache } from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import db from "@/lib/db";

const logCacheStatus = (functionName: string, isCached: boolean) => {
  if (isCached) {
    console.log(
      `============ [Cache Hit] ${functionName}: Data was retrieved from cache.`,
    );
  } else {
    console.log(
      `XXXXXXXXXXXX [Cache Miss] ${functionName}: Fetching fresh data.`,
    );
  }
};

export const verifySession = cache(async () => {
  console.log("verifySession called: Checking cache...");

  logCacheStatus("verifySession", false);

  const cookie = cookies().get("session")?.value;
  if (!cookie) {
    console.log("No session cookie found, returning null");
    return null;
  }

  let session;
  try {
    session = await decrypt(cookie);
    console.log("Session decrypted:", session);
  } catch (error) {
    console.log("Failed to decrypt session", error);
    return null;
  }

  if (!session?.userId) {
    console.log("No user ID in session");
    return null;
  }

  console.log("Session verification successful, returning session data");
  return { isAuth: true, userId: session.userId, userRole: session.role };
});

export const getUser = cache(async () => {
  console.log("getUser called: Checking cache...");

  logCacheStatus("getUser", false);

  const session = await verifySession();
  if (!session) {
    console.log("No session found, returning null");
    return null;
  }

  try {
    console.log("Fetching user data from the database...");
    const data = await db.user.findMany({
      where: {
        id: session.userId,
      },
      select: {
        id: true,
        username: true,
        role: true,
        email: true,
      },
    });

    console.log("User data fetched:", data[0]);
    return data[0];
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
