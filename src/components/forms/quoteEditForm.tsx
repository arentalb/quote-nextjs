"use client";
import {MyFormField, MyFormFieldTypes} from "@/components/myFormField";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {QuoteCreateValidation} from "@/lib/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import SubmitButton from "@/components/submitButton";
import React, {useEffect, useState} from "react";
import {updateQuote} from "@/actions/qoute.action";
import {Category} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {QuoteDetail} from "@/actions/qoute.action.type";
import Link from "next/link";
import {Eye} from "lucide-react";

export default function QuoteEditForm({
  categories,
  quote,
}: {
  categories: Category[];
  quote: QuoteDetail;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof QuoteCreateValidation>>({
    resolver: zodResolver(QuoteCreateValidation),
    defaultValues: {
      title: quote.title,
      body: quote.body,
      author: quote.author,
    },
  });
  const { handleSubmit, control, formState } = form;
  const { isSubmitting, errors } = formState;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const categoryIds = quote.categories.map((item) => item.id);
    setSelectedCategories(categoryIds);
  }, [quote.categories]);

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
      await updateQuote(quote.id, quoteData, selectedCategories);
      router.replace("/content");
      router.refresh();
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
        <div className={"flex justify-between items-center w-full mb-8"}>
          <h1 className={"text-3xl font-bold"}>Update the Quote</h1>
          <Link href={`/quote/${quote.id}`}>
            <Eye width={30} height={30} />
          </Link>
        </div>
        <MyFormField
          control={control}
          fieldType={MyFormFieldTypes.INPUT}
          name={"title"}
          label={"Title"}
          placeHolder={"There was a man ..."}
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
                selectedCategories.includes(category.id)
                  ? "border-2 border-primary"
                  : ""
              }`}
              onClick={() => handleSelectCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <SubmitButton isLoading={isSubmitting}>Update</SubmitButton>
      </form>
    </Form>
  );
}
