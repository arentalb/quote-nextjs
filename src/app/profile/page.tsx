import ProfileForm from "@/components/forms/profileForm";
import { getUser } from "@/lib/dal";

export default async function Page() {
  const user = await getUser();
  return (
    <div className={"flex items-center justify-center  mt-20  w-full"}>
      <div className={"w-full  "}>{<ProfileForm profile={user} />}</div>
    </div>
  );
}
