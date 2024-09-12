"use client";
import { MyFormField, MyFormFieldTypes } from "@/components/myFormField";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QuoteCreateValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/submitButton";
import React, { useState } from "react";
import { creatQuote } from "@/actions/qoute.action";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";

export default function QuoteCreateForm({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof QuoteCreateValidation>>({
    resolver: zodResolver(QuoteCreateValidation),
    defaultValues: {
      title: "",
      body: "",
      author: "",
    },
  });
  const { handleSubmit, control, formState } = form;
  const { isSubmitting, errors } = formState;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  function handleSelectCategory(categoryId: string) {
    const existingCategory = selectedCategories?.find(
      (item) => item === categoryId,
    );
    if (existingCategory) {
      setSelectedCategories(
        selectedCategories?.filter((item) => item !== categoryId),
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  }

  async function onSubmit(quoteData: z.infer<typeof QuoteCreateValidation>) {
    try {
      await creatQuote(quoteData, selectedCategories);
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <div className={"flex justify-between items-center w-full mb-8"}>
          <h1 className={"text-3xl font-bold"}>Create new Quote</h1>
        </div>
        <MyFormField
          control={control}
          fieldType={MyFormFieldTypes.INPUT}
          name={"title"}
          label={"Title"}
          placeHolder={"There we a man ..."}
        />

        <MyFormField
          control={control}
          fieldType={MyFormFieldTypes.INPUT}
          name={"author"}
          label={"Author"}
          placeHolder={"Ahmad M."}
        />
        <MyFormField
          control={control}
          fieldType={MyFormFieldTypes.TEXTAREA}
          name={"body"}
          rows={4}
          label={"Body"}
          placeHolder={"that man was very nice and ...."}
        />

        <h1 className={"text-primary text-sm font-semibold"}>
          Select Categories
        </h1>
        <div className=" flex gap-x-4 mb-16  flex-wrap gap-4">
          {categories.map((category) => (
            <Button
              type={"button"}
              key={category.id}
              variant={"ghost"}
              className={`px-4 py-2 border-2 ${
                selectedCategories.find((curr) => curr === category.id) ===
                category.id
                  ? "border-2 border-primary"
                  : ""
              }`}
              onClick={() => handleSelectCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <SubmitButton isLoading={isSubmitting}>Create</SubmitButton>
      </form>
    </Form>
  );
}
