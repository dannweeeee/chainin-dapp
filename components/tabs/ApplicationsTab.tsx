"use client";

import ChainInApi from "@/components/api/chainin-api";
import { useEffect, useState } from "react";
import ApplicationCard from "@/components/cards/ApplicationCard";
import SkeletonLoading from "@/components/skeletons/SkeletonLoading";

interface ApplicationDetails {
  applicant_wallet_address: string;
  listing_id: number;
  listing_title: string;
  organisation_id: number;
  profile_url: string;
  subgraph_id: string;
}

const ApplicationsTab = ({ organisation_id }: { organisation_id: number }) => {
  const [applications, setApplications] = useState<ApplicationDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleApplicationListByOrganisation = async () => {
      try {
        setLoading(true);
        const data = await ChainInApi.fetchApplicationByOrganisationId(
          organisation_id
        );
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    handleApplicationListByOrganisation();
  }, [organisation_id]);

  const openNewTab = (url: any) => {
    window.open(url, "_blank");
  };

  return (
    <section className="flex flex-col mt-5">
      {loading ? (
        <div className="w-full">
          <SkeletonLoading />
        </div>
      ) : applications ? (
        <ApplicationCard
          key={applications.subgraph_id}
          applicant_wallet_address={applications.applicant_wallet_address}
          listing_id={applications.listing_id}
          listing_title={applications.listing_title}
          organisation_id={applications.organisation_id}
          profile_url={applications.profile_url}
          subgraph_id={applications.subgraph_id}
        />
      ) : (
        <p className="font-semibold flex items-center justify-center mt-8 text-white">
          No Applicants Currently
        </p>
      )}
    </section>
  );
};

export default ApplicationsTab;
