"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ChainInApi from "@/components/api/chainin-api";
import ProfileSkeletonLoading from "@/components/skeletons/ProfileSkeletonLoading";
import { MousePointerClick } from "lucide-react";
import { Button } from "../ui/button";

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

  useEffect(() => {
    const handleCommunitySearch = async () => {
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
    handleCommunitySearch();
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
                src={organisationData?.results[0].picture_url || ""}
                alt="organisation_logo"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>
            <p className="font-bold text-2xl mt-5 text-white">
              {organisationData?.results[0].organisation_name}
            </p>
            <p className="text-base mt-1 text-white">
              {organisationData?.results[0].organisation_type}
            </p>
          </div>
          <Button
            className="flex items-center justify-center text-base gap-2 mt-auto"
            onClick={() =>
              organisationData?.results?.[0]?.website_url &&
              openNewTab(organisationData.results[0].website_url)
            }
          >
            Visit Website
            <MousePointerClick className="w-5 h-5" />
          </Button>
        </div>
      )}
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default OrganisationHeader;
