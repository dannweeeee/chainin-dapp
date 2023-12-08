"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ChainInService from "@/components/api/chainin-api";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z, ZodError } from "zod";
import { SyncLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";

type EditUserFormProps = {
  wallet_address: string;
};

const userSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email_address: z.string().email("Invalid email address"),
  biography: z.string().min(1, "Biography is required"),
});

type EditUserForm = z.infer<typeof userSchema>;

const EditUserForm = ({ wallet_address }: EditUserFormProps) => {
  const router = useRouter();
  const [isEditingUser, setIsEditingUser] = useState(false);
  const { control, handleSubmit, setValue } = useForm<EditUserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email_address: "",
      biography: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await ChainInService.fetchUserByWalletAddress(
          wallet_address
        );
        console.log(user);

        setValue("first_name", user?.first_name || "");
        setValue("last_name", user?.last_name || "");
        setValue("email_address", user?.email_address || "");
        setValue("biography", user?.biography || "");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [wallet_address]);

  const handleEditUser = async (data: EditUserForm) => {
    try {
      setIsEditingUser(true);

      // to validate the form data against the schema
      userSchema.parse(data);

      // if validation passes, proceed with creating the user
      console.log("Creating user with data:", data);
      const updateUser = await ChainInService.updateUserByWalletAddress(
        wallet_address,
        data.first_name,
        data.last_name,
        data.email_address,
        data.biography
      );
      console.log("User updated:", updateUser);
      router.push(`/profile/${wallet_address}`);
    } catch (error) {
      if (error instanceof ZodError) {
        // handle Zod validation errors
        console.error("Validation error:", error.errors);
      } else {
        // handle other errors
        console.error("Error creating user:", error);
      }
    } finally {
      setIsEditingUser(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditUser)}
      className="mt-2 flex flex-col justify-center gap-5 text-white"
    >
      <label className="flex font-bold text-xl items-center justify-center mb-5">
        Edit your profile
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
            required: "Last Name is required",
          })}
        />
      </div>

      <div className="flex items-center w-full gap-2">
        <label className="font-semibold w-20">Email Address</label>
        <Input
          className="w-full rounded-2xl"
          label="Email Address"
          {...(control as any).register("email_address", {
            required: "Email address is required",
          })}
        />
      </div>

      <label className="font-semibold">Biography</label>
      <Textarea
        className="rounded-2xl"
        label="Biography"
        rows={8}
        maxLength={1024}
        {...(control as any).register("biography", {
          required: "Biography is required",
        })}
      />
      <Button
        type="submit"
        disabled={isEditingUser}
        className="h-12 gap-2 bg-[#4A6FA4] hover:bg-[#6789BA] hover:border text-[#E6E6E6] hover:text-[#E6E6E6]"
      >
        {isEditingUser ? (
          <>
            Updating User
            <SyncLoader size={5} color="#E6E6E6" />
          </>
        ) : (
          "Update"
        )}
      </Button>
    </form>
  );
};

export default EditUserForm;
