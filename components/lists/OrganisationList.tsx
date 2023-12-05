"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChainInApi from "@/components/api/chainin-api";
import OrganisationCard from "@/components/cards/OrganisationCard";
import OrganisationSkeletonLoading from "@/components/skeletons/OrganisationSkeletonLoading";

interface Organisation {
  organisation_id: number;
  organisation_name: string;
  organisation_symbol: string;
  organisation_type: string;
  description: string;
  picture_url: string;
  website_url: string;
  creator_wallet_address: string;
  nft_contract_address: string;
}

function OrganisationList() {
  const router = useRouter();
  const [exploreOrganisations, setExploreOrganisations] = useState<
    Organisation[] | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const data = await ChainInApi.fetchAllOrganisations();
        setExploreOrganisations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganisations();
  }, []);

  console.log("LIST OF ORGANISATIONS", exploreOrganisations);

  return (
    <div>
      {loading ? (
        <OrganisationSkeletonLoading />
      ) : exploreOrganisations ? (
        <>
          {exploreOrganisations.map((organisation) => (
            <OrganisationCard
              key={organisation.organisation_id}
              organisation_id={organisation.organisation_id}
              organisation_name={organisation.organisation_name}
              organisation_symbol={organisation.organisation_symbol}
              organisation_type={organisation.organisation_type}
              description={organisation.description}
              picture_url={organisation.picture_url}
              website_url={organisation.website_url}
              creator_wallet_address={organisation.creator_wallet_address}
              nft_contract_address={organisation.nft_contract_address}
            />
          ))}
        </>
      ) : (
        <p className="text-base-regular text-light-3 mt-8">
          No Organisations Currently
        </p>
      )}
    </div>
  );
}

export default OrganisationList;
