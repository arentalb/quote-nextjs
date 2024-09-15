"use client";

import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form} from "@/components/ui/form";
import {MyFormField, MyFormFieldTypes} from "@/components/myFormField";
import SubmitButton from "@/components/submitButton";
import {UserLoginFormValidation} from "@/lib/schemas";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast";
import {useAuth} from "@/lib/auth/AuthContext";
import {signIn} from "@/actions/auth.action";

export default function SignInForm() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const { toast } = useToast();
  const form = useForm<z.infer<typeof UserLoginFormValidation>>({
    resolver: zodResolver(UserLoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control, formState } = form;
  const { isSubmitting, errors } = formState;

  async function onSubmit(userData: z.infer<typeof UserLoginFormValidation>) {
    try {
      await signIn(userData);
      await refreshUser();

      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast({
        title: error.message,
        variant: "destructive",
      });
      // form.setError("root", {
      //   type: "manual",
      //   message: error.message,
      // });
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
