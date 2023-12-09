"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { creatorOrganisationTabs, userOrganisationTabs } from "@/constants";
import Image from "next/image";
import AboutTab from "./AboutTab";
import JobsTab from "./JobsTab";
import ChainInApi from "../api/chainin-api";
import { useAccount } from "wagmi";
import ApplicationsTab from "./ApplicationsTab";

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

const OrganisationTabsArray = ({
  organisation_id,
}: {
  organisation_id: number;
}) => {
  const [organisationData, setOrganisationData] =
    useState<OrganisationDetails | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    const handleOrganisationDetails = async () => {
      try {
        const data = await ChainInApi.fetchOrganisationByOrganisationId(
          organisation_id
        );
        setOrganisationData(data);
      } catch (error) {
        console.error("Error fetching community data:", error);
      }
    };
    handleOrganisationDetails();
  }, [organisation_id]);

  return (
    <div>
      <Tabs defaultValue="about" className="w-full ml-10">
        <TabsList className="tab">
          {organisationData?.results[0].creator_wallet_address === address ? (
            <>
              {creatorOrganisationTabs.map((tab) => (
                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="max-sm:hidden">{tab.label}</p>
                  {tab.label === "Posts" && (
                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2"></p>
                  )}
                </TabsTrigger>
              ))}
            </>
          ) : (
            <>
              {userOrganisationTabs.map((tab) => (
                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="max-sm:hidden">{tab.label}</p>
                  {tab.label === "Posts" && (
                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2"></p>
                  )}
                </TabsTrigger>
              ))}
            </>
          )}
        </TabsList>
        <TabsContent value="about" className="w-full text-light-1">
          <AboutTab organisation_id={organisation_id} />
        </TabsContent>
        <TabsContent value="jobs" className="w-full text-light-1">
          <JobsTab organisation_id={organisation_id} />
        </TabsContent>
        <TabsContent value="applications" className="w-full text-light-1">
          <ApplicationsTab organisation_id={organisation_id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganisationTabsArray;
