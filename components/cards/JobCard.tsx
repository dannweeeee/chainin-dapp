"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPinned, MousePointerClick } from "lucide-react";
import { Button } from "../ui/button";

type JobProps = {
  listing_id: number;
  listing_title: string;
  employment_status: string;
  location: string;
  description: string;
  organisation_id: number;
  organisation_logo: string;
  organisation_name: string;
};

const JobCard = ({
  listing_id,
  listing_title,
  employment_status,
  location,
  description,
  organisation_id,
  organisation_logo,
  organisation_name,
}: JobProps) => {
  return (
    <article className="job-card gap-10">
      <Link href={`/listing/${listing_id}`} className="cursor-pointer">
        <div className="job-card_avatar flex flex-wrap gap-3 items-center">
          <div className="relative h-12 w-12">
            <Image
              src={organisation_logo}
              alt="organisation_logo"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1 text-ellipsis">
            <h4 className="text-light-1">
              <span className="font-bold">{listing_title}</span>
            </h4>
            <h4 className="text-light-1 text-sm">{organisation_name}</h4>
            <h4 className="text-light-1 text-sm flex gap-1 items-center mt-2">
              <MapPinned />
              {location}
            </h4>
          </div>
          <Button className="text-sm flex items-center justify-center gap-2">
            <MousePointerClick />
            Click to Apply
          </Button>
        </div>
      </Link>
    </article>
  );
};

export default JobCard;
