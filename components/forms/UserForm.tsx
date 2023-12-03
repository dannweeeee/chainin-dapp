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
import { useAccount } from "wagmi";

const userSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email_address: z.string().email({ message: "Invalid email address" }),
  biography: z.string().min(0, { message: "Biography is required" }),
});

type UserForm = z.infer<typeof userSchema>;

const UserForm = () => {
  const router = useRouter();
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const { control, handleSubmit } = useForm<UserForm>();
  const { address } = useAccount();

  const handleCreateUser = async (data: UserForm) => {
    try {
      setIsCreatingUser(true);

      // to validate the form data against the schema
      userSchema.parse(data);

      // if validation passes, proceed with creating the user
      console.log("Creating user with data:", data);
      const post = await ChainInService.createUser(
        address,
        data.first_name,
        data.last_name,
        data.email_address,
        data.biography
      );
      console.log("Post created:", post);
      router.push("/home");
    } catch (error) {
      if (error instanceof ZodError) {
        // handle Zod validation errors
        console.error("Validation error:", error.errors);
      } else {
        // handle other errors
        console.error("Error creating user:", error);
      }
    } finally {
      setIsCreatingUser(false);
    }
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
