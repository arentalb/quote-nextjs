import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
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
        <Button asChild>
          <Link href={"login"}>Login</Link>
        </Button>
        <Button asChild>
          <Link href={"signup"}>SignUp</Link>
        </Button>
      </div>
    </div>
  );
}
