"use client";

import ChainInApi from "@/components/api/chainin-api";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import OrganisationCard from "@/components/cards/OrganisationCard";
import OrganisationList from "@/components/lists/OrganisationList";

interface OrganisationData {
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

function SearchOrganisationTab() {
  const [organisationName, setOrganisationName] = useState("");
  const [organisationData, setOrganisationData] =
    useState<OrganisationData | null>(null);

  const handleOrganisationSearch = async () => {
    try {
      const data = await ChainInApi.fetchOrganisationByOrganisationName(
        organisationName
      );
      console.log("ORGANISATION DATA", data);
      setOrganisationData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="mt-10">
      <div className="searchbar">
        <Image
          src="/assets/search.svg"
          alt="search"
          width={22}
          height={22}
          className="object-contain"
        />
        <Input
          id="text"
          value={organisationName}
          onChange={(e) => setOrganisationName(e.target.value)}
          placeholder={"Enter Organisation Name 👔"}
          className="no-focus searchbar_input text-white font-semibold"
        />
        <Button
          className="gap-5 text-sm mr-1"
          onClick={handleOrganisationSearch}
        >
          Search
        </Button>
      </div>
      <div className="flex flex-col gap-9 rounded-lg p-5">
        {organisationData ? (
          organisationData.results.map((organisation) => (
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
          ))
        ) : (
          <OrganisationList />
        )}
      </div>
    </div>
  );
}

export default SearchOrganisationTab;
