"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ChainInService from "@/components/api/chainin-api";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z, ZodError } from "zod";

const userSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email_address: z.string().email({ message: "Invalid email address" }),
  description: z.string().min(0, { message: "Description is required" }),
});

type UserForm = z.infer<typeof userSchema>;

const UserForm = () => {
  const router = useRouter();
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const { control, handleSubmit } = useForm<UserForm>();

  const handleCreateUser = async (data: UserForm) => {
    // setIsCreatingUser(true);
    // try {
    //   const user = await ChainInService.createUser(data);
    //   router.push(`/dashboard/profile/${user.user_id}`);
    // } catch (error) {
    //   if (error instanceof ZodError) {
    //     console.log(error);
    //   }
    // } finally {
    //   setIsCreatingUser(false);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateUser)}
      className="mt-12 flex flex-col justify-center gap-5 text-white"
    >
      <label className="flex font-bold text-xl items-center justify-center mb-5">
        Create a User Profile
      </label>

      <div className="flex items-center w-full gap-2">
        <label className="font-semibold">First Name</label>
        <Input
          className="w-64 rounded-2xl"
          label="First Name"
          {...(control as any).register("first_name", {
            required: "First name is required",
          })}
        />
        <label className="font-semibold ml-auto">Last Name</label>
        <Input
          className="w-64 rounded-2xl"
          label="Last Name"
          {...(control as any).register("last_name", {
            required: "Last name is required",
          })}
        />
      </div>

      <label className="font-semibold">Email Address</label>
      <Input
        className="rounded-2xl"
        label="Email Address"
        {...(control as any).register("email_address", {
          required: "First name is required",
        })}
      />

      <label className="font-semibold">Biography</label>
      <Textarea
        className="rounded-2xl"
        label="Biography"
        rows={8}
        {...(control as any).register("biography", {
          required: "Biography is required",
        })}
      />
      <Button type="submit" disabled={isCreatingUser}>
        {isCreatingUser ? "Creating User..." : "Submit"}
      </Button>
    </form>
  );
};

export default UserForm;
