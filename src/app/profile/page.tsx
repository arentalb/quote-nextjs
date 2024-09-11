import ProfileForm from "@/components/forms/profileForm";
import { getAuth } from "@/lib/auth/getAuth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await getAuth();
  if (!user) {
    redirect("/");
  }
  return (
    <div className={"flex items-center justify-center  mt-20  w-full"}>
      <div className={"w-full  "}>{<ProfileForm profile={user} />}</div>
    </div>
  );
}
