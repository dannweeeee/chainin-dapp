"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface UserDetails {
  wallet_address: string;
  first_name: string;
  last_name: string;
  email_address: string;
  biography: string;
}

function UserCard({
  wallet_address,
  first_name,
  last_name,
  email_address,
  biography,
}: UserDetails) {
  const router = useRouter();

  return (
    <article className="user-card">
      <div className="user-card_avatar flex flex-wrap items-center gap-3">
        <div className="relative h-12 w-12">
          <Image
            src={`https://api.multiavatar.com/${wallet_address}.png`}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis ">
          <h4 className="font-semibold text-white">
            {first_name} {last_name}
          </h4>
          <h4 className="text-white text-sm">{biography}</h4>
        </div>
        <Button
          className="text-sm gap-2"
          onClick={() => {
            router.push(`/profile/${wallet_address}`);
          }}
        >
          <Eye />
          View Profile
        </Button>
      </div>
    </article>
  );
}

export default UserCard;
