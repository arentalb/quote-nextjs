import { getUser } from "@/lib/actions/user.action";
import ProfileForm from "@/components/forms/profileForm";

export default async function Page() {
  const profile = await getUser();

  return (
    <div className={"flex items-center justify-center  mt-20  w-full"}>
      <div className={"w-full  "}>
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
