"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ChainInApi from "@/components/api/chainin-api";
import ProfileSkeletonLoading from "@/components/skeletons/ProfileSkeletonLoading";
import {
  ChevronDown,
  FileEdit,
  Hand,
  HardHat,
  MapPinned,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  sepolia,
} from "wagmi";
import { isAddress } from "viem";
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

import { GraphQLClient, gql } from "graphql-request";

import { returnDestinationInfo } from "../../lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

interface Applicant {
  id: string;
  applicant: string;
  listingID: string;
  profileURL: string;
}
interface subgraphResponse {
  newApplicants: Applicant[];
}

interface ListingIDCounts {
  [listingID: string]: number;
}

interface subgraphReturnedData {
  combinedData: Applicant[];
  sepoliaCount: number;
  optimismCount: number;
  fujiCount: number;
}

//TODO: This is not working
function postNewApplicant(
  originalData: Applicant[] | undefined,
  newData: Applicant[]
) {
  if (originalData == undefined) {
    // POST all data to database
    newData.forEach(async (applicant) => {
      const data = await ChainInApi.createApplication(
        applicant.id,
        applicant.applicant,
        Number(applicant.listingID),
        applicant.profileURL
      );
      console.log("POST Application data ", data);
    });
  } else if (originalData) {
    // find new applicant and post to database
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
}

// Given a listing id, return the applicants from each chain and total applicants
async function fetchAllApplicantFromSubgraph({ listing_id }: Props) {
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

  let sepoliaResponse: subgraphResponse = await sepoliaGraphQLClient.request(
    queryFormat
  );
  let opResponse: subgraphResponse = await opGoerGraphQLClient.request(
    queryFormat
  );
  let fujiResponse: subgraphResponse = await fujiGraphQLClient.request(
    queryFormat
  );

  console.log("sepolia response ", sepoliaResponse);
  console.log("op response ", opResponse);
  console.log("fuji response ", fujiResponse);

  let sepoliaListingIDCount: ListingIDCounts = {};
  let sepoliaApplicants: Applicant[];
  if (JSON.stringify(sepoliaResponse).length === 0 || "{}") {
    console.log("sepolia is empty");
    sepoliaListingIDCount[listing_id] = 0;
    sepoliaApplicants = [];
  } else {
    sepoliaApplicants = sepoliaResponse.newApplicants;

    sepoliaApplicants.forEach((applicant) => {
      const listingID = applicant.listingID;
      sepoliaListingIDCount[listingID] =
        (sepoliaListingIDCount[listingID] || 0) + 1;
    });
    console.log("sepolia list ", sepoliaListingIDCount);
  }

  let fujiApplicants: Applicant[];

  let fujiListingIDCount: ListingIDCounts = {};

  if (JSON.stringify(fujiResponse).length === 0 || "{}") {
    console.log("fuji is empty");
    fujiListingIDCount[listing_id] = 0;
    fujiApplicants = [];
  } else {
    fujiApplicants = fujiResponse.newApplicants;

    fujiApplicants.forEach((applicant) => {
      const listingID = applicant.listingID;
      fujiListingIDCount[listingID] = (fujiListingIDCount[listingID] || 0) + 1;
    });
    console.log("fuji list ", fujiListingIDCount);
  }
  let opApplicants: Applicant[];

  let opListingIDCount: ListingIDCounts = {};

  if (JSON.stringify(opResponse).length === 0 || "{}") {
    console.log("fuji is empty");
    opListingIDCount[listing_id] = 0;
    opApplicants = [];
  } else {
    opApplicants = opResponse.newApplicants;

    opApplicants.forEach((applicant) => {
      const listingID = applicant.listingID;
      opListingIDCount[listingID] = (opListingIDCount[listingID] || 0) + 1;
    });
    console.log("op list ", opListingIDCount);
  }

  console.log("op list ", opListingIDCount);
  let combinedApplicantData = [
    ...sepoliaApplicants,
    ...fujiApplicants,
    ...opApplicants,
  ];

  const returnData = {
    combinedData: combinedApplicantData,
    sepoliaCount: sepoliaListingIDCount[listing_id],
    optimismCount: opListingIDCount[listing_id],
    fujiCount: fujiListingIDCount[listing_id],
  };
  console.log("return data", returnData);
  return returnData;
}

function JobHeader({ listing_id }: Props) {
  const [jobData, setJobData] = useState<JobDetails | null>(null);
  const [orgData, setOrgData] = useState<OrgDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeletingListing, setIsDeletingListing] = useState(false);
  const [subgraphData, setSubgraphData] = useState<Applicant[]>();
  const [sepoliaCount, setSepoliaCount] = useState(0);
  const [optimismCount, setOptimismCount] = useState(0);
  const [fujiCount, setFujiCount] = useState(0);
  const [selectedChain, setSelectedChain] = useState("");

  const { address } = useAccount();
  const router = useRouter();
  const chainsOptions = ["Sepolia", "Optimism Goerli", "Avalanche Fuji"];

  const { config, error } = usePrepareContractWrite({
    address: orgData?.results[0].nft_contract_address as `0x${string}`,
    abi: [
      {
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
        name: "applyJob",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
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

  console.log("config ", config);
  const { data, write } = useContractWrite(config);

  const { isLoading: txIsLoading, isSuccess: txIsSuccess } =
    useWaitForTransaction({
      hash: data?.hash,
    });

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

        // Fetch all data from subgraph based on listing id
        const subgraphReturnedData: subgraphReturnedData =
          await fetchAllApplicantFromSubgraph({
            listing_id,
          });
        // calculate the total applicant from different chain
        setSepoliaCount(subgraphReturnedData.sepoliaCount);
        setOptimismCount(subgraphReturnedData.optimismCount);
        setFujiCount(subgraphReturnedData.fujiCount);

        setSubgraphData((prevData) => {
          postNewApplicant(prevData, subgraphReturnedData.combinedData);
          return subgraphReturnedData.combinedData;
        });
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };
    handleJobDetails();
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

            {sepoliaCount + fujiCount + optimismCount == 0 ? (
              <p className="text-base mt-1 text-white flex gap-2">
                <MapPinned />
                Total Applicant: 0
              </p>
            ) : (
              <p className="text-base mt-1 text-white flex gap-2">
                <MapPinned />
                Total Applicant: {sepoliaCount + fujiCount + optimismCount}
                {sepoliaCount == 0
                  ? `${sepoliaCount} member(s) applied to Sepolia `
                  : ""}
                {optimismCount == 0
                  ? `${optimismCount} member(s) applied to Optimism Goerli `
                  : ""}
                {fujiCount == 0
                  ? `${fujiCount} member(s) applied to Avalanche Fuji`
                  : ""}
              </p>
            )}

            <p className="text-base mt-10 text-white flex flex-col w-full">
              <span className="font-bold text-lg">Job Description</span>
              {jobData?.results[0].description}
            </p>
          </div>
          {jobData?.results[0].organisation_creator === address ? (
            <div className="flex gap-2 mb-auto">
              <Button
                className="text-sm"
                onClick={() => {
                  router.push(`/edit-job/${listing_id}`);
                }}
              >
                <FileEdit />
              </Button>
              <Dialog>
                <DialogTrigger className="bg-[#FF6961] text-[#E6E6E6] hover:bg-[#E6E6E6]  hover:text-[#4A6FA4] text-lg font-bold rounded-2xl cursor-pointer h-10 px-4 py-2">
                  <Trash2 />
                </DialogTrigger>
                <DialogContent className="bg-[#E6E6E6] border-none">
                  <DialogHeader>
                    <DialogTitle className="text-[#4A6FA4] flex items-center justify-center mb-4">
                      Are you absolutely sure?
                    </DialogTitle>
                    <DialogDescription className="text-[#4A6FA4]">
                      This action cannot be undone. This will permanently delete
                      your job listing and remove the job listing's data from
                      our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center mt-3">
                    <DialogClose asChild>
                      <Button className="text-sm hover:bg-[#ADBFDA]">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      className="text-sm ml-auto bg-[#FF6961] gap-2 hover:bg-[#ADBFDA]"
                      onClick={handleDeleteListing}
                    >
                      {isDeletingListing ? (
                        <>
                          Deleting
                          <SyncLoader size={3} color="#E6E6E6" />
                        </>
                      ) : (
                        "Confirm"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            // Logic for normal user
            <>
              <Dialog>
                <DialogTrigger className="flex items-center justify-center bg-[#4A6FA4] text-[#E6E6E6] hover:bg-[#E6E6E6] hover:text-[#4A6FA4] text-sm font-bold rounded-2xl cursor-pointer h-10 px-3 py-2 gap-2 mb-auto w-full">
                  <Hand className="w-4 h-4" />
                  Easy Apply
                </DialogTrigger>
                <DialogContent className="bg-[#E6E6E6] border-none">
                  <DialogHeader>
                    <DialogTitle className="text-[#4A6FA4] flex items-center justify-center mb-6">
                      Mint your job application NFT
                    </DialogTitle>
                    <DialogDescription className="text-[#4A6FA4] flex items-center justify-center">
                      <Select
                        onValueChange={(value) => setSelectedChain(value)}
                      >
                        <SelectTrigger className="bg-[#4A6FA4] rounded-xl w-1/3 p-3 text-[#E6E6E6]">
                          <SelectValue placeholder="Select Destination Chain" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#6789BA] border-none text-[#E6E6E6] rounded-xl">
                          {chainsOptions.map((option) => (
                            <SelectItem
                              className="focus:bg-[#ADBFDA] hover:text-[E6E6E6] cursor-pointer rounded-xl"
                              value={option}
                              key={option}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center mt-3">
                    <DialogClose asChild>
                      <Button className="text-sm hover:bg-[#ADBFDA]">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      className="text-sm ml-auto bg-[#4A6FA4] gap-2 hover:bg-[#ADBFDA]"
                      onClick={() => {
                        console.log("Sending application...");
                        write?.();
                      }}
                    >
                      {txIsLoading ? (
                        <>
                          Minting NFT
                          <SyncLoader size={3} color="#E6E6E6" />
                        </>
                      ) : (
                        "Mint NFT"
                      )}
                    </Button>
                  </div>
                  {txIsSuccess && (
                    <div>
                      Successfully submitted your NFT!
                      <div>
                        <a
                          href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}
                        >
                          Click to view your transaction detail!
                        </a>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      )}
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default JobHeader;
