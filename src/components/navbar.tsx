import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/actions/user.action";
import LogOutBtn from "@/components/logOutBtn";

export default async function NavBar() {
  const { isAuthenticated, role } = await getUser();

  return (
    <div className={"flex justify-between items-center py-6"}>
      <Image
        src={"logo.svg"}
        alt={"logo"}
        width={0}
        height={0}
        className={"w-12 h-12"}
      />
      <div className={"space-x-4"}>
        {isAuthenticated ? (
          <>
            {role === "admin" ? (
              <Button asChild>
                <Link href={"admin"}>admin</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href={"user"}>user</Link>
              </Button>
            )}
            <LogOutBtn />
          </>
        ) : (
          <>
            <Button asChild>
              <Link href={"login"}>login</Link>
            </Button>
            <Button asChild>
              <Link href={"signup"}>SignUp</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
