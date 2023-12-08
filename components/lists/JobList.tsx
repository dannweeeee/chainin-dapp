"use client";

import ChainInApi from "@/components/api/chainin-api";
import { useEffect, useState } from "react";
import JobCard from "@/components/cards/JobCard";
import SkeletonLoading from "@/components/skeletons/SkeletonLoading";

interface ListingDetails {
  listing_id: number;
  listing_title: string;
  employment_status: string;
  location: string;
  description: string;
  organisation_id: number;
  organisation_logo: string;
  organisation_name: string;
}

const JobList = () => {
  const [jobs, setJobs] = useState<ListingDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleJobList = async () => {
      try {
        setLoading(true);
        const data = await ChainInApi.fetchAllListings();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    handleJobList();
  }, []);

  const openNewTab = (url: any) => {
    window.open(url, "_blank");
  };

  return (
    <section className="flex flex-col">
      {loading ? (
        <div className="w-full">
          <SkeletonLoading />
        </div>
      ) : jobs && jobs.length > 0 ? (
        jobs.map((job) => (
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
        <p className="font-semibold flex items-center justify-center mt-8 text-white">
          No Jobs Currently
        </p>
      )}
    </section>
  );
};

export default JobList;
