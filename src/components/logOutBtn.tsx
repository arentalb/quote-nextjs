"use client";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/actions/user.action";
import { useUser } from "@/lib/UserContext";

export default function LogOutBtn() {
  const { setUser } = useUser();
  return (
    <Button
      onClick={async () => {
        await logoutUser();
        setUser(null);
      }}
    >
      logout
    </Button>
  );
}
