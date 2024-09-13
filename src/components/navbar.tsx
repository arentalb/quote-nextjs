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
      <svg
        width="59"
        height="59"
        viewBox="0 0 59 59"
        fill="none"
        className={"w-12 h-12"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="29.5"
          cy="29.5"
          r="28"
          className={"dark:stroke-white stroke-black"}
          strokeWidth="3"
        />
        <path
          d="M28.672 36.264C28.352 36.264 28.064 36.2 27.808 36.072C27.552 35.944 27.216 35.624 26.8 35.112C26.192 34.28 25.568 33.384 24.928 32.424C24.288 31.432 23.696 30.472 23.152 29.544C22.64 28.584 22.224 27.736 21.904 27C21.584 26.264 21.424 25.736 21.424 25.416C21.424 24.68 21.648 24.088 22.096 23.64C22.576 23.16 22.944 22.92 23.2 22.92C23.552 22.92 23.888 23.032 24.208 23.256C24.56 23.48 24.848 23.768 25.072 24.12C25.936 25.336 26.736 26.664 27.472 28.104C28.208 29.544 28.8 30.888 29.248 32.136C29.728 33.352 29.968 34.264 29.968 34.872C29.968 35.8 29.536 36.264 28.672 36.264ZM36.832 36.264C36.512 36.264 36.224 36.2 35.968 36.072C35.712 35.944 35.376 35.624 34.96 35.112C34.352 34.28 33.728 33.384 33.088 32.424C32.448 31.432 31.856 30.472 31.312 29.544C30.8 28.584 30.384 27.736 30.064 27C29.744 26.264 29.584 25.736 29.584 25.416C29.584 24.68 29.808 24.088 30.256 23.64C30.736 23.16 31.104 22.92 31.36 22.92C31.712 22.92 32.048 23.032 32.368 23.256C32.72 23.48 33.008 23.768 33.232 24.12C34.096 25.336 34.896 26.664 35.632 28.104C36.368 29.544 36.96 30.888 37.408 32.136C37.888 33.352 38.128 34.264 38.128 34.872C38.128 35.8 37.696 36.264 36.832 36.264Z"
          className={
            "dark:stroke-white stroke-black  dark:fill-white fill-black "
          }
        />
      </svg>

      <div className={"flex gap-4 items-center"}>
        <ModeToggle />
        <div>{content}</div>
      </div>
    </div>
  );
}
