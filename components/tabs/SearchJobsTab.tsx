"use client";

import ChainInApi from "@/components/api/chainin-api";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import JobCard from "@/components/cards/JobCard";
import JobList from "@/components/lists/JobList";

interface ListingData {
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

function SearchJobsTab() {
  const [listingTitle, setListingTitle] = useState("");
  const [jobData, setJobData] = useState<ListingData | null>(null);

  const handleJobSearch = async () => {
    try {
      const data = await ChainInApi.fetchListingByListingTitle(listingTitle);
      console.log("LISTING DATA", data);
      setJobData(data);
    } catch (error) {
      console.error("Error fetching job listing data:", error);
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
          value={listingTitle}
          onChange={(e) => setListingTitle(e.target.value)}
          placeholder={"Enter Job Title 💼"}
          className="no-focus searchbar_input text-white font-semibold"
        />
        <Button className="gap-5 text-sm mr-1" onClick={handleJobSearch}>
          Search
        </Button>
      </div>
      <div className="flex flex-col gap-9 rounded-lg p-5">
        {jobData && jobData.results.length > 0 ? (
          jobData.results.map((job) => (
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
          <JobList />
        )}
      </div>
    </div>
  );
}

export default SearchJobsTab;
