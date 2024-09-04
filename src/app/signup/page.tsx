"use client";
import SignUpForm from "@/components/forms/signUpForm";

export default function Page() {
  return (
    <div className={"flex items-center justify-center  mt-20  w-full"}>
      <div className={"w-full md:w-1/2 "}>
        <SignUpForm />
      </div>
    </div>
  );
}
