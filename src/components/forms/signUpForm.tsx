"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { MyFormField, MyFormFieldTypes } from "@/components/shared/myFormField";
import SubmitButton from "@/components/shared/submitButton";
import { SignUpFormData, SignUpFormSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { signUp } from "@/actions/auth.action";

export default function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(userData: SignUpFormData) {
    try {
      await signUp(userData);
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
          <h1 className={"text-4xl"}>Welcome To Our Website</h1>
          <p className={"text-gray-400"}>Create an account to see all Quotes</p>
        </section>
        <MyFormField
          control={control}
          fieldType={MyFormFieldTypes.INPUT}
          name={"username"}
          label={"User Name"}
          placeHolder={"Aren Talb"}
        />
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
        <SubmitButton isLoading={isSubmitting}>Sign Up</SubmitButton>
      </form>
    </Form>
  );
}
