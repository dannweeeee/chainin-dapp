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

type EditOrganisationFormProps = {
  organisation_id: number;
};

const organisationSchema = z.object({
  organisation_name: z.string().min(1, "Organisation name is required"),
  organisation_symbol: z.string().min(1, "Organisation symbol is required"),
  organisation_type: z.string().min(1, "Organisation type is required"),
  description: z.string().min(1, "Description is required"),
  picture_url: z.string().min(1, "Picture URL is required"),
  website_url: z.string().min(1, "Website URL is required"),
});

type EditOrganisationForm = z.infer<typeof organisationSchema>;

const EditOrganisationForm = ({
  organisation_id,
}: EditOrganisationFormProps) => {
  const router = useRouter();
  const [creatorAddress, setCreatorAddress] = useState("");
  const [nftContractAddress, setNftContractAddress] = useState("");
  const [isEditingOrganisation, setIsEditingOrganisation] = useState(false);
  const { control, handleSubmit, setValue } = useForm<EditOrganisationForm>({
    resolver: zodResolver(organisationSchema),
    defaultValues: {
      organisation_name: "",
      organisation_symbol: "",
      organisation_type: "",
      description: "",
      picture_url: "",
      website_url: "",
    },
  });

  useEffect(() => {
    const fetchOrganisation = async () => {
      try {
        const organisation =
          await ChainInService.fetchOrganisationByOrganisationId(
            organisation_id
          );
        console.log("ORGANISATION", organisation);

        setCreatorAddress(
          organisation?.results[0].creator_wallet_address || ""
        );
        setNftContractAddress(
          organisation?.results[0].nft_contract_address || ""
        );
        setValue(
          "organisation_name",
          organisation?.results[0].organisation_name || ""
        );
        setValue(
          "organisation_symbol",
          organisation?.results[0].organisation_symbol || ""
        );
        setValue(
          "organisation_type",
          organisation?.results[0].organisation_type === 1
            ? "Company"
            : organisation?.results[0].organisation_type === 2
            ? "School"
            : ""
        );
        setValue("description", organisation?.results[0].description || "");
        setValue("picture_url", organisation?.results[0].picture_url || "");
        setValue("website_url", organisation?.results[0].website_url || "");
      } catch (error) {
        console.error("Error fetching organisation:", error);
      }
    };

    fetchOrganisation();
  }, [organisation_id]);

  const handleEditOrganisation = async (data: EditOrganisationForm) => {
    try {
      setIsEditingOrganisation(true);

      // to validate the form data against the schema
      organisationSchema.parse(data);

      let organisationTypeNumber: number = 0;
      if (data.organisation_type === "Company") {
        organisationTypeNumber = 1;
      } else if (data.organisation_type === "School") {
        organisationTypeNumber = 2;
      }

      // if validation passes, proceed with creating the user
      console.log("Creating organisation with data:", data);
      const updateOrganisation =
        await ChainInService.updateOrganisationByOrganisationId(
          organisation_id,
          data.organisation_name,
          data.organisation_symbol,
          organisationTypeNumber,
          data.description,
          data.picture_url,
          data.website_url,
          creatorAddress,
          nftContractAddress
        );
      console.log("Organisation updated:", updateOrganisation);
      router.push(`/organisation/${organisation_id}`);
    } catch (error) {
      if (error instanceof ZodError) {
        // handle Zod validation errors
        console.error("Validation error:", error.errors);
      } else {
        // handle other errors
        console.error("Error updating organisation:", error);
      }
    } finally {
      setIsEditingOrganisation(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditOrganisation)}
      className="mt-2 flex flex-col justify-center gap-5 text-white"
    >
      <label className="flex font-bold text-xl items-center justify-center mb-5">
        Edit Organisation
      </label>

      <label className="font-semibold">Organisation Name</label>
      <Input
        className="w-full rounded-2xl"
        label="Organisation Name"
        {...(control as any).register("organisation_name", {
          required: "Organisation name is required",
        })}
      />
      <div className="flex items-center w-full gap-2">
        <label className="font-semibold">Organisation Symbol</label>
        <Input
          className="w-36 rounded-2xl"
          label="Organisation Symbol"
          {...(control as any).register("organisation_symbol", {
            required: "Organisation symbol is required",
          })}
        />

        <label className="font-semibold ml-auto">Organisation Type</label>
        <Input
          className="w-60 rounded-2xl"
          label="Organisation Type"
          {...(control as any).register("organisation_type", {
            required: "Organisation type is required",
          })}
        />
      </div>

      <label className="font-semibold">Picture URL</label>
      <Input
        className="rounded-2xl"
        label="Picture URL"
        {...(control as any).register("picture_url", {
          required: "Picture url is required",
        })}
      />

      <label className="font-semibold">Website URL</label>
      <Input
        className="rounded-2xl"
        label="Website URL"
        {...(control as any).register("website_url", {
          required: "Website url is required",
        })}
      />

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
        disabled={isEditingOrganisation}
        className="h-12 gap-2 bg-[#4A6FA4] hover:bg-[#6789BA] hover:border text-[#E6E6E6] hover:text-[#E6E6E6]"
      >
        {isEditingOrganisation ? (
          <>
            Updating Organisation
            <SyncLoader size={5} color="#E6E6E6" />
          </>
        ) : (
          "Update"
        )}
      </Button>
    </form>
  );
};

export default EditOrganisationForm;
