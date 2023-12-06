"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ChainInApi from "@/components/api/chainin-api";
import ProfileSkeletonLoading from "@/components/skeletons/ProfileSkeletonLoading";
import { BadgePlus, Mail, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

interface Props {
  wallet_address: string;
}

interface ProfileDetails {
  wallet_address: string;
  first_name: string;
  last_name: string;
  email_address: string;
  biography: string;
}

function ProfileHeader({ wallet_address }: Props) {
  const [profileData, setProfileData] = useState<ProfileDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { address } = useAccount();

  useEffect(() => {
    const handleProfileDetails = async () => {
      try {
        setLoading(true);
        const data = await ChainInApi.fetchUserByWalletAddress(wallet_address);
        console.log("profile data", data);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    handleProfileDetails();
  }, [wallet_address]);

  return (
    <div className="flex w-full flex-col justify-star profile-header mt-3">
      {loading ? (
        <ProfileSkeletonLoading />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex-col items-center gap-3">
            <div className="relative h-20 w-20 object-cover">
              <Image
                src={`https://api.multiavatar.com/${profileData?.wallet_address}.png`}
                alt="profile_picture"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>
            <p className="font-bold text-2xl mt-5 text-white">
              {profileData?.first_name} {profileData?.last_name}
            </p>
            <p className="text-base mt-1 text-white">
              {profileData?.biography}
            </p>
          </div>
          <div className="flex-col items-center justify-center">
            <div className="flex items-center justify-end mb-auto gap-2">
              <Button
                onClick={() =>
                  router.push(`mailto:${profileData?.email_address}`)
                }
              >
                <Mail />
              </Button>
              {address === wallet_address ? (
                <Button>
                  <UserCog />
                </Button>
              ) : null}
            </div>
            {address === wallet_address ? (
              <div className="mt-5">
                <Button
                  className="text-sm gap-2"
                  onClick={() => {
                    router.push(`/create-organisation/${wallet_address}`);
                  }}
                >
                  <BadgePlus />
                  Create Organisation
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default ProfileHeader;
