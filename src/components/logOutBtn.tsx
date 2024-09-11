"use client";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/actions/auth.action";

export default function LogOutBtn() {
  return (
    <Button
      onClick={async () => {
        await logoutUser();
      }}
    >
      logout
    </Button>
  );
}
