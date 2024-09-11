import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DropDownMenu from "@/components/dropDownMenu";
import { Role } from "@/types";
import { ModeToggle } from "@/components/modeToggle";
import { getAuth } from "@/lib/auth/getAuth";

export default async function NavBar() {
  const { user } = await getAuth();

  let content;

  if (user && user?.role === Role.Admin) {
    content = <DropDownMenu links={["dashboard", "content", "profile"]} />;
  } else if (user && user?.role === Role.User) {
    content = <DropDownMenu links={["content", "profile"]} />;
  } else {
    content = (
      <div className={"space-x-4"}>
        <Button asChild>
          <Link href={"/signin"}>Sign In</Link>
        </Button>
        <Button asChild>
          <Link href={"/signup"}>Sign Up</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className={"flex justify-between items-center py-6"}>
      <Image
        src={"/logo.svg"}
        alt={"logo"}
        width={0}
        height={0}
        className={"w-12 h-12"}
      />
      <div className={"flex gap-4 items-center"}>
        <ModeToggle />
        <div>{content}</div>
      </div>
    </div>
  );
}
