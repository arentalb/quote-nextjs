import { getAuth } from "@/lib/auth/getAuth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getAuth();
  if (!user || user.role !== "admin") {
    redirect("/");
  }
  return <>{children}</>;
}
