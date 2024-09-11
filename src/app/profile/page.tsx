import ProfileForm from "@/components/forms/profileForm";
import { getAuth } from "@/lib/auth/getAuth";

export default async function Page() {
  const { user } = await getAuth();
  return (
    <div className={"flex items-center justify-center  mt-20  w-full"}>
      <div className={"w-full  "}>{<ProfileForm profile={user} />}</div>
    </div>
  );
}
