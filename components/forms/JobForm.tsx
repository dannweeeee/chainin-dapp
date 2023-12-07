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

type JobFormProps = {
  organisation_id: number;
};

const jobSchema = z.object({
  listing_title: z.string().min(1, { message: "Job title is required" }),
  employment_status: z
    .string()
    .min(1, { message: "Employment status is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

type JobForm = z.infer<typeof jobSchema>;

const JobForm = ({ organisation_id }: JobFormProps) => {
  const router = useRouter();
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const { control, handleSubmit } = useForm<JobForm>();

  const handleCreateJob = async (data: JobForm) => {
    try {
      setIsCreatingJob(true);

      // to validate the form data against the schema
      jobSchema.parse(data);

      // if validation passes, proceed with creating the user
      console.log("Creating job with data:", data);
      const user = await ChainInService.createListing(
        organisation_id, 
        data.listing_title,
        data.employment_status,
        data.location,
        data.description
      );
      console.log("Job created:", user);
      router.push(`/organisation/${organisation_id}`);
    } catch (error) {
      if (error instanceof ZodError) {
        // handle Zod validation errors
        console.error("Validation error:", error.errors);
      } else {
        // handle other errors
        console.error("Error creating user:", error);
      }
    } finally {
      setIsCreatingJob(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateJob)}
      className="mt-2 flex flex-col justify-center gap-5 text-white"
    >
      <label className="flex font-bold text-xl items-center justify-center mb-5">
        Create a Job Listing
      </label>

      <div className="flex items-center w-full gap-2">
        <label className="font-semibold w-20">Job Title</label>
        <Input
          className="w-full rounded-2xl"
          label="Job Title"
          {...(control as any).register("listing_title", {
            required: "Job title is required",
          })}
        />
      </div>

      <div className="flex items-center w-full gap-2">
        <label className="font-semibold">Employment Status</label>
        <Input
          className="w-60 rounded-2xl"
          label="Employment Status"
          {...(control as any).register("employment_status", {
            required: "Employment status is required",
          })}
        />
        <label className="font-semibold ml-auto">Location</label>
        <Input
          className="w-60 rounded-2xl"
          label="Location"
          {...(control as any).register("location", {
            required: "Location is required",
          })}
        />
      </div>

      <label className="font-semibold">Description</label>
      <Textarea
        className="rounded-2xl"
        label="Description"
        rows={8}
        maxLength={1024}
        {...(control as any).register("description", {
          required: "Description is required",
        })}
      />
      <Button
        type="submit"
        disabled={isCreatingJob}
        className="h-12 gap-2 bg-[#4A6FA4] hover:bg-[#6789BA] hover:border text-[#E6E6E6] hover:text-[#E6E6E6]"
      >
        {isCreatingJob ? (
          <>
            Creating Job
            <SyncLoader size={5} color="#E6E6E6" />
          </>
        ) : (
          "Create Job"
        )}
      </Button>
    </form>
  );
};

export default JobForm;
