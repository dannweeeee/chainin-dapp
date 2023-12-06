"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ChainInApi from "@/components/api/chainin-api";
import ProfileSkeletonLoading from "@/components/skeletons/ProfileSkeletonLoading";
import { BadgePlus, Mail, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    const handleProfileDetails = async () => {
      try {
        setLoading(true);
        console.log("wallet address", wallet_address);
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

  const openNewTab = (url: any) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex w-full flex-col justify-star profile-header">
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
            <div className="flex items-center justify-center mb-auto gap-2">
              <Button
                onClick={() =>
                  router.push(`mailto:${profileData?.email_address}`)
                }
              >
                <Mail />
              </Button>
              <Button>
                <UserCog />
              </Button>
            </div>
            <div className="mt-20">
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
          </div>
        </div>
      )}
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default ProfileHeader;
