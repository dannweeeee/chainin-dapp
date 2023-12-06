"use client";

import ChainInApi from "@/components/api/chainin-api";
import { useEffect, useState } from "react";
import JobCard from "@/components/cards/JobCard";
import JobSkeletonLoading from "@/components/skeletons/JobSkeletonLoading";

interface ListingDetails {
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
  }[];
}

const JobsTab = ({ organisation_id }: { organisation_id: number }) => {
  const [jobs, setJobs] = useState<ListingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleJobListByOrganisation = async () => {
      try {
        setLoading(true);
        const data = await ChainInApi.fetchListingByOrganisationId(
          organisation_id
        );
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    handleJobListByOrganisation();
  }, [organisation_id]);

  const openNewTab = (url: any) => {
    window.open(url, "_blank");
  };

  console.log("LIST OF JOBS", jobs);

  return (
    <section className="flex flex-col">
      {loading ? (
        <div className="ml-10 w-full">
          <JobSkeletonLoading />
        </div>
      ) : jobs && jobs.results.length > 0 ? (
        jobs.results.map((job) => (
          <JobCard
            key={job.listing_id}
            listing_id={job.listing_id}
            listing_title={job.listing_title}
            employment_status={job.employment_status}
            location={job.location}
            description={job.description}
            organisation_id={job.organisation_id}
            organisation_logo={job.organisation_logo}
            organisation_name={job.organisation_name}
          />
        ))
      ) : (
        <p className="!text-base-regular text-light-3 no-result mt-10">
          No Jobs Currently
        </p>
      )}
    </section>
  );
};

export default JobsTab;
