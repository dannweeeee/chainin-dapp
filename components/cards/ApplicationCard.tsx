"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPinned, MousePointerClick } from "lucide-react";
import { Button } from "../ui/button";

type ApplicationProps = {
  applicant_wallet_address: string;
  listing_id: number;
  listing_title: string;
  organisation_id: number;
  profile_url: string;
  subgraph_id: string;
};

const ApplicationCard = ({
  applicant_wallet_address,
  listing_id,
  listing_title,
  organisation_id,
  profile_url,
  subgraph_id,
}: ApplicationProps) => {
  return (
    <article className="application-card mt-2">
      <Link
        href={`/profile/${applicant_wallet_address}`}
        className="cursor-pointer"
      >
        <div className="application-card_avatar flex flex-wrap gap-3 items-center">
          <div className="relative h-12 w-12">
            <Image
              src={`https://api.multiavatar.com/${applicant_wallet_address}.png`}
              alt="organisation_logo"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1 text-ellipsis">
            <h4 className="text-white">
              Applied for <span className="font-semibold">{listing_title}</span>
            </h4>
          </div>
          <Button className="text-sm flex items-center justify-center gap-2">
            <MousePointerClick />
            Click to View Profile
          </Button>
        </div>
      </Link>
    </article>
  );
};

export default ApplicationCard;
