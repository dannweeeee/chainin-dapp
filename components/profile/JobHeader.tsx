"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ChainInApi from "@/components/api/chainin-api";
import ProfileSkeletonLoading from "@/components/skeletons/ProfileSkeletonLoading";
import { FileEdit, Hand, HardHat, MapPinned, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

import ApplyJobCard from "../cards/ApplyJobCard";
import { subgraphEndpoints } from "../../constants/index";
import { returnDestinationInfo } from "../../lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { SyncLoader } from "react-spinners";

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
    organisation_creator: string;
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
interface Applicant {
  id: string;
  applicant: string;
  listingID: string;
  profileURL: string;
}
interface subgraphResponse {
  data: {
    newApplicants: Applicant[];
  };
}

interface ListingIDCounts {
  [listingID: string]: number;
}

function fetchAllApplicant({ listing_id }: Props) {}
function postNewApplicant(originalData: Applicant[], newData: Applicant[]) {
  if (originalData) {
    const newEntries = newData.filter((newEntry) => {
      return !originalData!.some((prevEntry) => prevEntry.id === newEntry.id);
    });

    // newEntries contains the entries that are not in the previous data
    console.log("New Entries:", newEntries);
    newEntries.forEach(async (newEntry) => {
      const data = await ChainInApi.createApplication(
        newEntry.id,
        newEntry.applicant,
        Number(newEntry.listingID),
        newEntry.profileURL
      );
      console.log("POST Application data ", data);
    });
  }

  // Update previousDataArray for the next comparison
}
function JobHeader({ listing_id }: Props) {
  const [jobData, setJobData] = useState<JobDetails | null>(null);
  const [orgData, setOrgData] = useState<OrgDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalApplicantCount, setTotalApplicantCount] = useState(0);
  const router = useRouter();
  const { address, status } = useAccount();

  const sepoliaGraphQLClient = new GraphQLClient(
    returnDestinationInfo("Sepolia").subgraph
  );
  const opGoerGraphQLClient = new GraphQLClient(
    returnDestinationInfo("Optimism Goerli").subgraph
  );
  const fujiGraphQLClient = new GraphQLClient(
    returnDestinationInfo("Avalanche Fujii").subgraph
  );

  const queryFormat = gql`
    query {
      newApplicants {
        id
        applicant
        listingID
        profileURL
        transactionHash
      }
    }
  `;
  useEffect(() => {
    const handleJobDetails = async () => {
      try {
        setLoading(true);
        const data = await ChainInApi.fetchListingsByListingId(listing_id);
        console.log("listing data", data);
        setJobData(data);
        if (data?.results && data.results.length > 0) {
          const orgData = await ChainInApi.fetchOrganisationByOrganisationId(
            data?.results[0].organisation_id
          );
          console.log("Organisation data ", orgData);
          setOrgData(orgData);
        }

        // TODO: fetch all the applicants that applied to the same listing ID

        const listingData = await ChainInApi.fetchApplicationByListingId(
          listing_id
        );
        setTotalApplicants(listingData.length);

        // TODO: fetch data from subgraph and calculate the total minted NFT on each destination chain

        // let sepoliaResponse: subgraphResponse =
        //   await sepoliaGraphQLClient.request(queryFormat);
        // let opResponse: subgraphResponse = await opGoerGraphQLClient.request(
        //   queryFormat
        // );
        // let fujiResponse: subgraphResponse = await fujiGraphQLClient.request(
        //   queryFormat
        // );

        // console.log("sepolia response ", sepoliaResponse);
        // console.log("op response ", opResponse);
        // console.log("fuji response ", fujiResponse);
        // const sepoliaApplicants = sepoliaResponse.data.newApplicants;

        // const sepoliaListingIDCount: ListingIDCounts = {};

        // sepoliaApplicants.forEach((applicant) => {
        //   const listingID = applicant.listingID;
        //   sepoliaListingIDCount[listingID] =
        //     (sepoliaListingIDCount[listingID] || 0) + 1;
        // });

        // const fujiApplicants = fujiResponse.data.newApplicants;

        // const fujiListingIDCount: ListingIDCounts = {};

        // fujiApplicants.forEach((applicant) => {
        //   const listingID = applicant.listingID;
        //   fujiListingIDCount[listingID] =
        //     (fujiListingIDCount[listingID] || 0) + 1;
        // });

        // const opApplicants = opResponse.data.newApplicants;

        // const opListingIDCount: ListingIDCounts = {};

        // opApplicants.forEach((applicant) => {
        //   const listingID = applicant.listingID;
        //   opListingIDCount[listingID] = (opListingIDCount[listingID] || 0) + 1;
        // });

        // setSepoliaApplicantCount(sepoliaListingIDCount[listing_id]);
        // setOpApplicantCount(opListingIDCount[listing_id]);
        // setFujiApplicantCount(opListingIDCount[listing_id]);
        // let combinedApplicantData = [
        //   ...sepoliaApplicants,
        //   ...fujiApplicants,
        //   ...opApplicants,
        // ];
        // setAllApplicants(combinedApplicantData);
        // postNewApplicant(allApplicants!, combinedApplicantData);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };
    handleJobDetails();
    console.log("Conenct account from job header ", address);
  }, [listing_id]);

  const handleDeleteListing = async () => {
    try {
      setIsDeletingListing(true);
      const listing = await ChainInApi.deleteListingByListingId(listing_id);
      console.log("listing deleted", listing);
      setIsDeletingListing(false);
      router.push("/home");
    } catch (error) {
      console.error("Error deleting listing:", error);
      setIsDeletingListing(false);
    }
  };

  const handleDeleteListing = async () => {
    try {
      setIsDeletingListing(true);
      const listing = await ChainInApi.deleteListingByListingId(listing_id);
      console.log("listing deleted", listing);
      setIsDeletingListing(false);
      router.push("/home");
    } catch (error) {
      console.error("Error deleting listing:", error);
      setIsDeletingListing(false);
    }
  };

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
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
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
            <p className="text-base mt-10 text-white flex flex-col w-full">
              <span className="font-bold text-lg">Job Description</span>
              {jobData?.results[0].description}
            </p>
            <p className="text-base mt-10 text-white flex flex-col w-full">
              <span className="font-bold text-lg">Total Applicants</span>
              {totalApplicants}
            </p>
            {sepoliaApplicantCount != 0 ||
              null ||
              (undefined && (
                <p className="text-base mt-10 text-white flex flex-col w-full">
                  <span className="font-bold text-lg">
                    Applied from Sepolia
                  </span>
                  {sepoliaApplicantCount}
                </p>
              ))}
            {opApplicantCount != 0 ||
              null ||
              (undefined && (
                <p className="text-base mt-10 text-white flex flex-col w-full">
                  <span className="font-bold text-lg">
                    Applied from Optimism Goerli
                  </span>
                  {opApplicantCount}
                </p>
              ))}
            {fujiApplicantCount != 0 ||
              null ||
              (undefined && (
                <p className="text-base mt-10 text-white flex flex-col w-full">
                  <span className="font-bold text-lg">
                    Applied from Avalanche Fuji
                  </span>
                  {fujiApplicantCount}
                </p>
              ))}
          </div>
          {jobData?.results[0].organisation_creator === address ? (
            <Button
              className="text-sm gap-2 mb-auto"
              onClick={() => {
                router.push(`/edit-job/${listing_id}`);
              }}
            >
              <FileEdit />
            </Button>
          ) : (
            <Button
              className="text-sm gap-2 mb-auto"
              onClick={() => {
                setIsClickApply(true);
              }}
            >
              <Hand />
              Apply for Job
            </Button>
          )}
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
            disabled={!write || isLoading}
            onClick={() => {
              // write?.();
              console.log("Click");
            }}
            className="bg-[#0603c8] text-white"
          >
            {isLoading ? "Sending Application...." : "Send Application"}
          </button>
          {isSuccess && (
            <div>
              Successfully submitted your NFT!
              <div>
                <a href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}>
                  Etherscan
                </a>
              </div>
            </div>
          )}
        </>
      )}
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default JobHeader;
