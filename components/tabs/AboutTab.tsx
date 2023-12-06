"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ChainInApi from "@/components/api/chainin-api";
import { MousePointerClick } from "lucide-react";
import { Button } from "../ui/button";
import DetailsSkeletonLoading from "../skeletons/DetailsSkeletonLoading";

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

function OrganisationHeader({ organisation_id }: { organisation_id: number }) {
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

  return (
    <div className="flex w-full flex-col justify-start organisation-header mt-5 pt-3">
      {loading ? (
        <div className="mt-10">
          <DetailsSkeletonLoading />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex-col items-center gap-3">
            <p className="font-bold text-2xl mt-5 text-white">Overview</p>
            <p className="text-base mt-2 text-white">
              {organisationData?.results[0].description}
            </p>
            <p className="font-bold text-lg mt-5 text-white">
              Organisation Symbol
            </p>
            <p className="text-base text-white">
              {organisationData?.results[0].organisation_symbol}
            </p>
            <p className="font-bold text-lg mt-5 text-white">
              Deployed Address
            </p>
            <p className="text-base text-white">
              {organisationData?.results[0].nft_contract_address}
            </p>
            <p className="font-bold text-lg mt-5 text-white">Created By</p>
            <p className="text-base text-white">
              {organisationData?.results[0].creator_wallet_address}
            </p>
          </div>
        </div>
      )}
      <div className="mt-10 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default OrganisationHeader;
