"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

interface UserData {
  username: string;
  vaultId: string;
}

function Topbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <nav className="topbar py-8 px-5">
      <Link href="/home" className="absolute">
        <Image
          src="/assets/chainin-logo-white-no-bg.png"
          alt="logo"
          width={220}
          height={220}
        />
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden"></div>
      </div>

      <div>
        <div className="flex items-center gap-4 flex-col">
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
