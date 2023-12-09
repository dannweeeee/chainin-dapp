"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ChainInApi from "@/components/api/chainin-api";
import ProfileSkeletonLoading from "@/components/skeletons/ProfileSkeletonLoading";
import { FileEdit, Hand, HardHat, MapPinned, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { SyncLoader } from "react-spinners";

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
    organisation_creator: string;
  }[];
}

function JobHeader({ listing_id }: Props) {
  const [jobData, setJobData] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeletingListing, setIsDeletingListing] = useState(false);
  const { address } = useAccount();
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

  const handleDeleteListing = async () => {
    try {
      setIsDeletingListing(true);
      const listing = await ChainInApi.deleteListingByListingId(listing_id);
      console.log("listing deleted", listing);
      setIsDeletingListing(false);
      router.push("/home");
    } catch (error) {
      console.error("Error deleting listing:", error);
      setIsDeletingListing(false);
    }
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
                  "/assets/placeholder.png"
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
            <p className="text-base mt-10 text-white flex flex-col w-full">
              <span className="font-bold text-lg">Job Description</span>
              {jobData?.results[0].description}
            </p>
          </div>
          {jobData?.results[0].organisation_creator === address ? (
            <div className="flex gap-2 mb-auto">
              <Button
                className="text-sm"
                onClick={() => {
                  router.push(`/edit-job/${listing_id}`);
                }}
              >
                <FileEdit />
              </Button>
              <Dialog>
                <DialogTrigger className="bg-[#FF6961] text-[#E6E6E6] hover:bg-[#E6E6E6]  hover:text-[#4A6FA4] text-lg font-bold rounded-2xl cursor-pointer h-10 px-4 py-2">
                  <Trash2 />
                </DialogTrigger>
                <DialogContent className="bg-[#E6E6E6] border-none">
                  <DialogHeader>
                    <DialogTitle className="text-[#4A6FA4] flex items-center justify-center mb-4">
                      Are you absolutely sure?
                    </DialogTitle>
                    <DialogDescription className="text-[#4A6FA4]">
                      This action cannot be undone. This will permanently delete
                      your job listing and remove the job listing's data from our
                      servers.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center mt-3">
                    <DialogClose asChild>
                      <Button className="text-sm hover:bg-[#ADBFDA]">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      className="text-sm ml-auto bg-[#FF6961] gap-2 hover:bg-[#ADBFDA]"
                      onClick={handleDeleteListing}
                    >
                      {isDeletingListing ? (
                        <>
                          Deleting
                          <SyncLoader size={3} color="#E6E6E6" />
                        </>
                      ) : (
                        "Confirm"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <Button className="text-sm gap-2 mb-auto">
              <Hand />
              Apply for Job
            </Button>
          )}
        </div>
      )}
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default JobHeader;
