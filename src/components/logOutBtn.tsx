"use client";
import {Button} from "@/components/ui/button";
import {signOut} from "@/actions/auth.action";

export default function LogOutBtn() {
  return (
    <Button
      onClick={async () => {
        await signOut();
      }}
    >
      logout
    </Button>
  );
}
