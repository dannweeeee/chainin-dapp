"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ChainInApi from "@/components/api/chainin-api";
import ProfileSkeletonLoading from "@/components/skeletons/ProfileSkeletonLoading";
import {
  BadgePlus,
  Hand,
  HardHat,
  Mail,
  MapPinned,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  listing_id: number;
}

interface JobDetails {
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

function JobHeader({ listing_id }: Props) {
  const [jobData, setJobData] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleJobDetails = async () => {
      try {
        setLoading(true);
        const data = await ChainInApi.fetchListingsByListingId(listing_id);
        console.log("listing data", data);
        setJobData(data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };
    handleJobDetails();
  }, [listing_id]);

  const openNewTab = (url: any) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex w-full flex-col justify-star profile-header mt-3">
      {loading ? (
        <ProfileSkeletonLoading />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex-col items-center gap-3">
            <div className="relative h-20 w-20 object-cover">
              <Image
                src={
                  jobData?.results[0].organisation_logo ||
                  "/assets/landmark.svg"
                }
                alt="profile_picture"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>
            <p className="font-bold text-2xl mt-5 text-white">
              {jobData?.results[0].listing_title}
            </p>
            <p className="text-base mt-1 text-white">
              {jobData?.results[0].organisation_name}
            </p>
            <p className="text-base mt-1 text-white flex gap-2">
              <HardHat />
              {jobData?.results[0].employment_status}
            </p>
            <p className="text-base mt-1 text-white flex gap-2">
              <MapPinned />
              {jobData?.results[0].location}
            </p>
            <p className="text-base mt-10 text-white flex flex-col">
              <span className="font-bold text-lg">Job Description</span>
              {jobData?.results[0].description}
            </p>
          </div>
          <Button className="text-sm gap-2 mt-auto">
            <Hand />
            Apply for Job
          </Button>
        </div>
      )}
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default JobHeader;
