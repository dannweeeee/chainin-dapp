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

type EditJobFormProps = {
  listing_id: number;
};

const jobSchema = z.object({
  listing_title: z.string().min(1, "Title must be at least 1 character"),
  employment_status: z
    .string()
    .min(1, "Employment status must be at least 1 character"),
  location: z.string().min(1, "Location must be at least 1 character"),
  description: z.string().min(1, "Description must be at least 1 character"),
});

type EditJobForm = z.infer<typeof jobSchema>;

const EditJobForm = ({ listing_id }: EditJobFormProps) => {
  const router = useRouter();
  const [organisationId, setOrganisationId] = useState<number>(0);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const { control, handleSubmit, setValue } = useForm<EditJobForm>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      listing_title: "",
      employment_status: "",
      location: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const job = await ChainInService.fetchListingsByListingId(listing_id);
        console.log("LISTING DATA", job);

        setOrganisationId(job?.results[0].organisation_id || 0);
        setValue("listing_title", job?.results[0].listing_title || "");
        setValue("employment_status", job?.results[0].employment_status || "");
        setValue("location", job?.results[0].location || "");
        setValue("description", job?.results[0].description || "");
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [listing_id]);

  const handleEditJob = async (data: EditJobForm) => {
    try {
      setIsEditingJob(true);

      // to validate the form data against the schema
      jobSchema.parse(data);

      // if validation passes, proceed with creating the user
      console.log("Creating job with data:", data);
      const updateJob = await ChainInService.updateListingByListingId(
        listing_id,
        organisationId,
        data.listing_title,
        data.employment_status,
        data.location,
        data.description
      );
      console.log("Job updated:", updateJob);
      router.push(`/listing/${listing_id}`);
    } catch (error) {
      if (error instanceof ZodError) {
        // handle Zod validation errors
        console.error("Validation error:", error.errors);
      } else {
        // handle other errors
        console.error("Error updating job:", error);
      }
    } finally {
      setIsEditingJob(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditJob)}
      className="mt-2 flex flex-col justify-center gap-5 text-white"
    >
      <label className="flex font-bold text-xl items-center justify-center mb-5">
        Edit Job Listing
      </label>

      <div className="flex items-center w-full gap-2">
        <label className="font-semibold w-32">Listing Title</label>
        <Input
          className="w-full rounded-2xl"
          label="Listing Title"
          {...(control as any).register("listing_title", {
            required: "Listing title is required",
          })}
        />
      </div>

      <div className="flex items-center w-full gap-2">
        <label className="font-semibold">Employment Status</label>
        <Input
          className="w-64 rounded-2xl"
          label="Employment Status"
          {...(control as any).register("employment_status", {
            required: "Employment status is required",
          })}
        />
        <label className="font-semibold ml-auto">Location</label>
        <Input
          className="w-64 rounded-2xl"
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
        disabled={isEditingJob}
        className="h-12 gap-2 bg-[#4A6FA4] hover:bg-[#6789BA] hover:border text-[#E6E6E6] hover:text-[#E6E6E6]"
      >
        {isEditingJob ? (
          <>
            Updating Listing
            <SyncLoader size={5} color="#E6E6E6" />
          </>
        ) : (
          "Update"
        )}
      </Button>
    </form>
  );
};

export default EditJobForm;
