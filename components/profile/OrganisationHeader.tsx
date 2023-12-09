"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ChainInApi from "@/components/api/chainin-api";
import ProfileSkeletonLoading from "@/components/skeletons/ProfileSkeletonLoading";
import { BadgePlus, BadgeX, Cog, ExternalLink, PlusSquare } from "lucide-react";
import { Button } from "../ui/button";
import { QRCodeSVG } from "qrcode.react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
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
  organisation_id: number;
}

interface OrganisationDetails {
  meta: {
    duration: number;
  };
  success: boolean;
  results: {
    organisation_id: number;
    organisation_name: string;
    organisation_symbol: string;
    organisation_type: string;
    description: string;
    picture_url: string;
    website_url: string;
    creator_wallet_address: string;
    nft_contract_address: string;
  }[];
}

function OrganisationHeader({ organisation_id }: Props) {
  const [organisationData, setOrganisationData] =
    useState<OrganisationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeletingOrganisation, setIsDeletingOrganisation] = useState(false);
  const router = useRouter();
  const { address } = useAccount();
  // update with your contract address
  const deployedContractAddress = "0x1b9CaFa940303CA46408a9b9b924F67F8DB84213";
  // more info on query based requests: https://0xpolygonid.github.io/tutorials/wallet/proof-generation/types-of-auth-requests-and-proofs/#query-based-request
  // qrValueProofRequestExample: https://github.com/0xPolygonID/tutorial-examples/blob/main/on-chain-verification/qrValueProofRequestExample.json
  const qrProofRequestJson = {
    id: "7f38a193-0918-4a48-9fac-36adfdb8b542",
    typ: "application/iden3comm-plain-json",
    type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
    thid: "7f38a193-0918-4a48-9fac-36adfdb8b542",
    body: {
      reason: "airdrop participation",
      transaction_data: {
        contract_address: deployedContractAddress,
        method_id: "b68967e2",
        chain_id: 80001,
        network: "polygon-mumbai",
      },
      scope: [
        {
          id: 1,
          circuitId: "credentialAtomicQuerySigV2OnChain",
          query: {
            allowedIssuers: ["*"],
            context: "ipfs://QmfUycCFuSkdeUMdgYPTPH29KMhw6u7jFThoa93YbHacko",
            credentialSubject: {
              isMember: {
                $eq: 1,
              },
            },
            type: "Membership",
          },
        },
      ],
    },
  };

  useEffect(() => {
    const handleOrganisationDetails = async () => {
      try {
        setLoading(true);
        const data = await ChainInApi.fetchOrganisationByOrganisationId(
          organisation_id
        );
        setOrganisationData(data);
      } catch (error) {
        console.error("Error fetching community data:", error);
      } finally {
        setLoading(false);
      }
    };
    handleOrganisationDetails();
  }, [organisation_id]);

  const handleDeleteOrganisation = async () => {
    try {
      setIsDeletingOrganisation(true);
      const organisation = await ChainInApi.deleteOrganisationByOrganisationId(
        organisation_id
      );
      console.log("organisation deleted", organisation);
      setIsDeletingOrganisation(false);
      router.push("/home");
    } catch (error) {
      console.error("Error deleting organisation:", error);
      setIsDeletingOrganisation(false);
    }
  };

  const openNewTab = (url: any) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex w-full flex-col justify-star organisation-header">
      {loading ? (
        <ProfileSkeletonLoading />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex-col items-center gap-3">
            <div className="relative h-20 w-20 object-cover">
              <Image
                src={
                  organisationData?.results[0].picture_url ||
                  "/assets/placeholder.png"
                }
                alt="organisation_logo"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>
            <p className="font-bold text-2xl mt-5 text-white">
              {organisationData?.results[0].organisation_name}
            </p>
            <p className="text-base mt-1 text-white">
              {organisationData?.results[0].organisation_type
                ? parseInt(
                    organisationData.results[0].organisation_type,
                    10
                  ) === 1
                  ? "Company"
                  : "School"
                : "Unknown"}
            </p>
          </div>
          <div className="mt-auto flex flex-col gap-2">
            {address === organisationData?.results[0].creator_wallet_address ? (
              <div className="flex justify-end gap-2">
                <Button
                  className="flex items-center justify-center text-base gap-2"
                  onClick={() => {
                    router.push(
                      `/create-job/${organisationData?.results[0].organisation_id}`
                    );
                  }}
                >
                  Create Job
                  <PlusSquare />
                </Button>
                <Button
                  className="flex items-center justify-center text-base gap-2"
                  onClick={() => {
                    router.push(`/edit-organisation/${organisation_id}`);
                  }}
                >
                  <Cog />
                </Button>
                <Dialog>
                  <DialogTrigger className="bg-[#FF6961] text-[#E6E6E6] hover:bg-[#E6E6E6]  hover:text-[#4A6FA4] text-lg font-bold rounded-2xl cursor-pointer h-10 px-4 py-2">
                    <BadgeX />
                  </DialogTrigger>
                  <DialogContent className="bg-[#E6E6E6] border-none">
                    <DialogHeader>
                      <DialogTitle className="text-[#4A6FA4] flex items-center justify-center mb-4">
                        Are you absolutely sure?
                      </DialogTitle>
                      <DialogDescription className="text-[#4A6FA4]">
                        This action cannot be undone. This will permanently
                        delete your organisation and remove the organisation's
                        data from our servers.
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
                        onClick={handleDeleteOrganisation}
                      >
                        {isDeletingOrganisation ? (
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
            ) : null}
            <div className="flex items-center justify-center mt-12 gap-2">
              <Dialog>
                <DialogTrigger className="bg-[#4A6FA4] text-[#E6E6E6] hover:bg-[#E6E6E6]  hover:text-[#4A6FA4] flex items-center justify-center gap-1 text-lg font-bold rounded-2xl cursor-pointer h-10 px-4 py-2">
                  Add to Profile
                  <BadgePlus />
                </DialogTrigger>
                <DialogContent className="bg-[#E6E6E6] border-none">
                  <DialogHeader>
                    <DialogTitle className="text-[#4A6FA4] flex items-center justify-center mb-4">
                      Polygon ID Verification
                    </DialogTitle>
                    <DialogDescription className="text-[#4A6FA4] flex flex-col items-center justify-center">
                      Please scan this QR code with your mobile phone
                      <QRCodeSVG
                        level="Q"
                        size={350}
                        style={{ marginTop: "20px" }}
                        value={JSON.stringify(qrProofRequestJson)}
                      />
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center mt-3">
                    <DialogClose asChild>
                      <Button className="text-sm hover:bg-[#ADBFDA]">
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button className="text-sm ml-auto hover:bg-[#ADBFDA]">
                        Save
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                className="flex items-center justify-center text-base gap-2 mt-auto"
                onClick={() =>
                  organisationData?.results?.[0]?.website_url &&
                  openNewTab(organisationData.results[0].website_url)
                }
              >
                Visit Website
                <ExternalLink className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default OrganisationHeader;
