"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { MyFormField, MyFormFieldTypes } from "@/components/formField";
import SubmitButton from "@/components/submitButton";
import { UserUpdateProfileValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { updateProfile } from "@/lib/actions/user.action";

export default function ProfileForm({
  profile,
}: {
  profile: { role: string; email: string; username: string } | null;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UserUpdateProfileValidation>>({
    resolver: zodResolver(UserUpdateProfileValidation),
    defaultValues: {
      username: profile?.username,
      email: profile?.email,
    },
  });

  const { handleSubmit, control, formState } = form;
  const { isSubmitting, errors } = formState;

  async function onSubmit(
    userData: z.infer<typeof UserUpdateProfileValidation>,
  ) {
    try {
      await updateProfile(userData);
      toast({ title: "Updated" });
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex-1 max-w-lg "
      >
        <section className={"mb-12 space-y-4 text-start"}>
          <h1 className={"text-4xl "}>Your profile </h1>
        </section>
        <MyFormField
          control={control}
          fieldType={MyFormFieldTypes.INPUT}
          name={"email"}
          label={"Email"}
          placeHolder={"example@gmail.com"}
        />
        <MyFormField
          control={control}
          fieldType={MyFormFieldTypes.INPUT}
          name={"username"}
          label={"Username"}
          placeHolder={"Aren"}
        />
        <p>
          Role: <span className={" text-sm"}>{profile?.role}</span>
        </p>
        <SubmitButton isLoading={isSubmitting}>Update</SubmitButton>
      </form>
    </Form>
  );
}
