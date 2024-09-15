"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { MyFormField, MyFormFieldTypes } from "@/components/shared/myFormField";
import SubmitButton from "@/components/shared/submitButton";
import { SignInFormData, SignInFormSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth/AuthContext";
import { signIn } from "@/actions/auth.action";

export default function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { refreshUser } = useAuth();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(userData: SignInFormData) {
    try {
      await signIn(userData);
      await refreshUser();
      router.push("/");
    } catch (error: any) {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className={"mb-12 space-y-4 text-center"}>
          <h1 className={"text-4xl "}>Welcome Back To Our Website</h1>
          <p className={"text-gray-400"}>Login again to be updated </p>
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
          name={"password"}
          isPassword={true}
          label={"Password"}
          placeHolder={"***********"}
        />

        <SubmitButton isLoading={isSubmitting}>Login</SubmitButton>
      </form>
    </Form>
  );
}
