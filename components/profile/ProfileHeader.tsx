"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ChainInApi from "@/components/api/chainin-api";
import ProfileSkeletonLoading from "@/components/skeletons/ProfileSkeletonLoading";
import { BadgePlus, Mail, UserCog, UserRoundX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
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
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

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

  const handleDeleteUser = async () => {
    try {
      setIsDeletingUser(true);
      const user = await ChainInApi.deleteUserByWalletAddress(wallet_address);
      console.log("user deleted", user);
      setIsDeletingUser(false);
      disconnect();
      router.push("/");
    } catch (error) {
      console.error("Error deleting user:", error);
      setIsDeletingUser(false);
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
              {address === wallet_address ? (
                <>
                  <Button
                    onClick={() => {
                      router.push(`/edit-profile/${wallet_address}`);
                    }}
                  >
                    <UserCog />
                  </Button>
                  <Dialog>
                    <DialogTrigger className="bg-[#FF6961] text-[#E6E6E6] hover:bg-[#E6E6E6]  hover:text-[#4A6FA4] text-lg font-bold rounded-2xl cursor-pointer h-10 px-4 py-2">
                      <UserRoundX />
                    </DialogTrigger>
                    <DialogContent className="bg-[#E6E6E6] border-none">
                      <DialogHeader>
                        <DialogTitle className="text-[#4A6FA4] flex items-center justify-center mb-4">
                          Are you absolutely sure?
                        </DialogTitle>
                        <DialogDescription className="text-[#4A6FA4]">
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
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
                          onClick={handleDeleteUser}
                        >
                          {isDeletingUser ? (
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
                </>
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
