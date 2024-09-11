import SignInForm from "@/components/forms/signInForm";
import { getAuth } from "@/lib/auth/getAuth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await getAuth();
  if (user) {
    redirect("/");
  }
  return (
    <div className={"flex items-center justify-center  mt-20  w-full"}>
      <div className={"w-full md:w-1/2 "}>
        <SignInForm />
      </div>
    </div>
  );
}
