"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface OrganisationProps {
  organisation_id: number;
  organisation_name: string;
  organisation_symbol: string;
  organisation_type: string;
  description: string;
  picture_url: string;
  website_url: string;
  creator_wallet_address: string;
  nft_contract_address: string;
}

function OrganisationCard({
  organisation_id,
  organisation_name,
  organisation_symbol,
  organisation_type,
  description,
  picture_url,
  website_url,
  creator_wallet_address,
  nft_contract_address,
}: OrganisationProps) {
  const router = useRouter();

  return (
    <article className="organisation-card mt-2">
      <Link
        href={`/organisation/${organisation_id}`}
        className="cursor-pointer"
      >
        <div className="organisation-card_avatar flex flex-wrap items-center gap-3">
          <div className="relative h-12 w-12">
            <Image
              src={picture_url}
              alt="organisation_logo"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1 text-ellipsis">
            <h4 className="text-light-1">
              <span className="font-semibold">{organisation_name}</span>
              {" | "}
              <span>{organisation_symbol}</span>
            </h4>
            <h4 className="text-light-1"></h4>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default OrganisationCard;
