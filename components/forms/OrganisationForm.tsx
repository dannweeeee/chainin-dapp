"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z, ZodError } from "zod";
import { useAccount } from "wagmi";
import { SyncLoader } from "react-spinners";
import { ethers } from "ethers";
import deployerABI from "../../contracts/ABI/Deployer.json";
import ChainInApi from "@/components/api/chainin-api";

const organisationSchema = z.object({
  organisation_name: z
    .string()
    .min(1, { message: "Organisation name is required" }),
  organisation_symbol: z
    .string()
    .min(1, { message: "Organisation symbol is required" }),
  organisation_type: z
    .string()
    .min(1, { message: "Organisation type is required" }),
  description: z.string().min(0, { message: "Description is required" }),
  picture_url: z.string().min(0, { message: "Picture URL is required" }),
  website_url: z.string().min(0, { message: "Website URL is required" }),
});

type OrganisationForm = z.infer<typeof organisationSchema>;

const OrganistionForm = () => {
  const router = useRouter();
  const [deployedAddress, setDeployedAddress] = useState<string>("");
  const [isCreatingOrganisation, setIsCreatingOrganisation] = useState(false);
  const { control, handleSubmit } = useForm<OrganisationForm>();
  const { address } = useAccount();

  const handleCreateOrganisation = async (data: OrganisationForm) => {
    try {
      setIsCreatingOrganisation(true);

      let organisationTypeNumber: number = 0;
      if (data.organisation_type === "Company") {
        organisationTypeNumber = 1;
      } else if (data.organisation_type === "School") {
        organisationTypeNumber = 2;
      }

      const provider = new ethers.providers.JsonRpcProvider(
        `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MUMBAI_API_KEY}`
      );
      const deployerAddr = "0x619360550f337bdA5A3A4709fEff2140c9577593"; // deployer contract on mumbai
      const signer = new ethers.Wallet(
        `0x${process.env.NEXT_PUBLIC_MUMBAI_PRIVATE_KEY}`,
        provider
      );

      const operator = await signer.getAddress();

      // to validate the form data against the schema
      organisationSchema.parse(data);

      console.log("Creating organisation with data:", data);

      // call deployOrganisation() on Deployer contract
      const DeployerFactory = new ethers.Contract(
        deployerAddr,
        deployerABI.abi,
        signer
      );
      const tx = await DeployerFactory.deployOrganisation(
        organisationTypeNumber,
        data.organisation_name,
        data.organisation_symbol,
        operator,
        data.picture_url,
        data.description
      );
      // get receipt of the transaction and fetch the event
      const receipt = await tx.wait();
      console.log("receipt - ", receipt);

      // fetch address of school or company
      const newCompanySignature =
        "0xe975ce806e0fc48202608973e25a92eea9300b592f652043a604115a3af3171c";
      const newSchoolSignature =
        "0x0e28d88ea1f6786fc9c3fd67495a54fa0b5314e896d79d823be19bc399e78ce6";
      let schoolABI = [
        "event newSchool(address indexed school,string indexed name,string indexed imageURL,string description)",
      ];
      let companyABI = [
        "event newCompany(address indexed company,string indexed name,string indexed imageURL,string description)",
      ];

      //https://docs.ethers.org/v5/api/utils/abi/interface/
      let schoolIFace = new ethers.utils.Interface(schoolABI);
      let companyIFace = new ethers.utils.Interface(companyABI);

      receipt.logs.forEach((log: any) => {
        if (log.topics[0] == newSchoolSignature) {
          const parsedLog = schoolIFace.parseLog(log);
          const schoolAddr = parsedLog.args[0]; // address need to be stored
          setDeployedAddress(schoolAddr);
          const hashed_name = parsedLog.args[1].hash; // indexed string parameter is the keccak256(name)
          const hash_imageURL = parsedLog.args[2].hash; // indexed string parameter is the keccak256(imageURL)
          const description = parsedLog.args[3]; // original string

          console.log("New school deployed on ", schoolAddr);
        } else if (log.topics[0] == newCompanySignature) {
          const parsedLog = companyIFace.parseLog(log);
          const companyAddr = parsedLog.args[0]; // address need to be stored
          setDeployedAddress(companyAddr);
          const hashed_name = parsedLog.args[1].hash; // indexed string parameter is the keccak256(name)
          const hash_imageURL = parsedLog.args[2].hash; // indexed string parameter is the keccak256(imageURL)
          const description = parsedLog.args[3]; // original string

          console.log("New company deployed on ", companyAddr);
        } else {
          console.log(
            "No new organisation deployed in logIndex: ",
            log.logIndex
          );
        }
      });

      const organisation = await ChainInApi.createOrganisation(
        data.organisation_name,
        data.organisation_symbol,
        organisationTypeNumber,
        data.description,
        data.picture_url,
        data.website_url,
        address,
        deployedAddress
      );
      console.log("Organisation created:", organisation);
    } catch (error) {
      console.error("Error deploying organisation:", error);
    } finally {
      setIsCreatingOrganisation(false);
      router.push(`/profile/${address}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateOrganisation)}
      className="mt-12 flex flex-col justify-center gap-5 text-white"
    >
      <label className="flex font-bold text-xl items-center justify-center mb-5">
        Create an Organisation
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
          className="w-40 rounded-2xl"
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
        disabled={isCreatingOrganisation}
        className="h-12 gap-2 bg-[#4A6FA4] hover:bg-[#6789BA] hover:border text-[#E6E6E6] hover:text-[#E6E6E6]"
      >
        {isCreatingOrganisation ? (
          <>
            Creating Organisation
            <SyncLoader size={5} color="#E6E6E6" />
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
};

export default OrganistionForm;
