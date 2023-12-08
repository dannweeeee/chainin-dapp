"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ChainInApi from "@/components/api/chainin-api";
import ProfileSkeletonLoading from "@/components/skeletons/ProfileSkeletonLoading";
import {
  BadgePlus,
  Hand,
  HardHat,
  Mail,
  MapPinned,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";

import ApplyJobCard from "../cards/ApplyJobCard";
import { subgraphEndpoints } from "../../constants/index";
import { returnDestinationInfo } from "../../lib/utils";

interface Props {
  listing_id: number;
}

interface JobDetails {
  meta: {
    duration: number;
  };
  success: boolean;
  results: {
    listing_id: number;
    listing_title: string;
    employment_status: string;
    location: string;
    description: string;
    organisation_id: number;
    organisation_logo: string;
    organisation_name: string;
  }[];
}
interface OrgDetails {
  meta: {
    duration: number;
  };
  success: boolean;
  results: {
    creator_wallet_address: string;
    description: string;
    nft_contract_address: string;
    organisation_id: number;
    organisation_name: string;
    organisation_symbol: string;
    organisation_type: number;
    picture_url: string;
    website_url: string;
  }[];
}

function JobHeader({ listing_id }: Props) {
  const [jobData, setJobData] = useState<JobDetails | null>(null);
  const [orgData, setOrgData] = useState<OrgDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClickApply, setIsClickApply] = useState(false);
  const [selectedChain, setSelectedChain] = useState("Sepolia");
  const [totalApplicants, setTotalApplicants] = useState(0);
  const router = useRouter();
  const { address, status } = useAccount();

  useEffect(() => {
    const handleJobDetails = async () => {
      try {
        setLoading(true);
        const data = await ChainInApi.fetchListingsByListingId(listing_id);
        console.log("listing data", data);
        setJobData(data);
        const orgData = await ChainInApi.fetchOrganisationByOrganisationId(
          jobData!.results[0].organisation_id
        );
        console.log("Organisation data ", orgData);
        setOrgData(orgData);
        // TODO: fetch all the applicants that applied to the same listing ID
        // TODO: fetch data from subgraph and calculate the total minted NFT on each destination chain
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };
    handleJobDetails();
    console.log("Conenct account from job header ", address);
  }, [listing_id]);

  const openNewTab = (url: any) => {
    window.open(url, "_blank");
  };
  const handleSelectedChain = (selectedChain: string) => {
    console.log("Selected ", selectedChain);
    console.log("Apply ", jobData?.results[0].listing_id);
  };

  const { config } = usePrepareContractWrite({
    address: orgData?.results[0].nft_contract_address as `0x${string}`,
    abi: [
      {
        name: "applyJob",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          {
            internalType: "uint64",
            name: "destinationChainSelector",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "destinationMinter",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isPayLink",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "listingID",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "profileURL",
            type: "string",
          },
        ],
        outputs: [],
      },
    ],
    functionName: "applyJob",
    args: [
      returnDestinationInfo(selectedChain)?.selector,
      returnDestinationInfo(selectedChain)?.minter,
      true,
      jobData?.results[0].listing_id,
      `${jobData?.results[0].listing_id}/${address}`,
    ],
  });
  const { write } = useContractWrite(config);
  return (
    <div className="flex w-full flex-col justify-star profile-header mt-3">
      {loading ? (
        <ProfileSkeletonLoading />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex-col items-center gap-3">
            <div className="relative h-20 w-20 object-cover">
              <Image
                src={
                  jobData?.results[0].organisation_logo ||
                  "/assets/placeholder.png"
                }
                alt="profile_picture"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>
            <p className="font-bold text-2xl mt-5 text-white">
              {jobData?.results[0].listing_title}
            </p>
            <p className="text-base mt-1 text-white">
              {jobData?.results[0].organisation_name}
            </p>
            <p className="text-base mt-1 text-white flex gap-2">
              <HardHat />
              {jobData?.results[0].employment_status}
            </p>
            <p className="text-base mt-1 text-white flex gap-2">
              <MapPinned />
              {jobData?.results[0].location}
            </p>
            <p className="text-base mt-10 text-white flex flex-col">
              <span className="font-bold text-lg">Job Description</span>
              {jobData?.results[0].description}
            </p>
          </div>
          <Button
            className="text-sm gap-2 mt-auto"
            onClick={() => setIsClickApply(true)}
          >
            <Hand />
            Apply for Job
          </Button>
          <p>totalApplicants: </p>
        </div>
      )}
      {isClickApply && (
        <>
          <ApplyJobCard
            isOpen={isClickApply}
            onClose={() => setIsClickApply(false)}
            onSelect={handleSelectedChain}
          />
          <button
            disabled={!write}
            onClick={() => {
              write?.();
            }}
            className="bg-[#0603c8]"
          >
            Send Application
          </button>
        </>
      )}
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default JobHeader;
