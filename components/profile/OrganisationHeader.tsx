"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ChainInApi from "@/components/api/chainin-api";
import ProfileSkeletonLoading from "@/components/skeletons/ProfileSkeletonLoading";
import { BadgePlus, Cog, ExternalLink, PlusSquare } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, Flex } from "@radix-ui/themes";
import { QRCode } from "react-qr-svg";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

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
                <Button className="flex items-center justify-center text-base gap-2">
                  <Cog />
                </Button>
              </div>
            ) : null}
            <div className="flex items-center justify-center mt-12 gap-2">
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button className="flex items-center justify-center text-base gap-2">
                    Add to Profile
                    <BadgePlus />
                  </Button>
                </Dialog.Trigger>

                <Dialog.Content>
                  <Dialog.Title>Polygon ID Verification</Dialog.Title>

                  <Dialog.Description size="2" mb="4">
                    Please scan this QR code with your mobile phone
                    <QRCode
                      level="Q"
                      style={{ width: 256, marginTop: "20px" }}
                      value={JSON.stringify(qrProofRequestJson)}
                    />
                  </Dialog.Description>

                  <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                      <Button variant="secondary" color="gray">
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                      <Button>Save</Button>
                    </Dialog.Close>
                  </Flex>
                </Dialog.Content>
              </Dialog.Root>

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
