"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

export enum MyFormFieldTypes {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
}
interface customProps {
  control: Control<any>;
  fieldType: MyFormFieldTypes;
  name: string;
  label?: string;
  rows?: number;
  isPassword?: boolean;
  placeHolder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disable?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  showDateSelect?: boolean;
}

export function MyFormField(props: customProps) {
  const { control, fieldType, name, label, placeHolder, iconSrc, iconAlt } =
    props;
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={"flex-1"}>
            {fieldType !== MyFormFieldTypes.CHECKBOX && label && (
              <FormLabel className={"text-primary"}>{label}</FormLabel>
            )}

            <RenderField field={field} props={props} />
            <FormMessage className={"shad-error"} />
          </FormItem>
        )}
      />
    </>
  );
}
function RenderField({ field, props }: { field: any; props: customProps }) {
  switch (props.fieldType) {
    case MyFormFieldTypes.INPUT:
      return (
        <div className={"flex rounded-md border  border-dark-500 bg-dark-400 "}>
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              alt={props.iconAlt || "Icon"}
              width={24}
              height={24}
              className={"ml-2"}
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeHolder}
              {...field}
              type={props.isPassword ? "password" : "text"}
              className={"shad-input border-0"}
            />
          </FormControl>
        </div>
      );

    case MyFormFieldTypes.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeHolder}
            {...field}
            rows={props.rows}
            disabled={props.disable}
            className={"shad-textArea"}
          />
        </FormControl>
      );
  }
}
