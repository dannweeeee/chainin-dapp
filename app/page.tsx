"use client";

import TypewriterTitle from "@/components/main/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FileText, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HashLoader } from "react-spinners";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const openNewTab = (url: any) => {
    window.open(url, "_blank");
  };

  return (
    <div className="w-screen h-screen circles">
      <nav className="topbar py-8 px-5">
        <Link href="/" className="absolute">
          <Image
            src="/assets/chainin-logo-white-no-bg.png"
            alt="logo"
            width={210}
            height={210}
          />
        </Link>
        <div className="flex items-center gap-1">
          <div className="block md:hidden"></div>
        </div>

        <div>
          <div className="flex items-center gap-5 pr-8">
            <Button
              onClick={() =>
                openNewTab(
                  "https://elements.getpostman.com/redirect?entityId=31443216-dd0d4c78-1b59-4c28-9376-7605289e74b8&entityType=collection"
                )
              }
              className="bg-[#6789BA] text-[#E6E6E6] p-3 rounded-2xl hover:bg-[#E6E6E6]  hover:text-[#6789BA]"
            >
              <FileText className="cursor-pointer w-6 h-6" />
            </Button>
            <Button
              onClick={() =>
                openNewTab(
                  "https://elements.getpostman.com/redirect?entityId=31443216-dd0d4c78-1b59-4c28-9376-7605289e74b8&entityType=collection"
                )
              }
              className="bg-[#6789BA] text-[#E6E6E6] p-3 rounded-2xl hover:bg-[#E6E6E6] hover:text-[#6789BA]"
            >
              <Github className="cursor-pointer w-6 h-6" />
            </Button>
          </div>
        </div>
      </nav>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        {loading ? (
          <h1 className="font-semibold text-5xl text-center blue-text-gradient">
            <HashLoader
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
              color="000000"
            />
          </h1>
        ) : (
          <div className="flex flex-col items-center text-center">
            <Link href="/">
              <Image
                src="/assets/chainin-icon-no-bg.png"
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
            <h1 className="font-semibold text-5xl text-center mt-3 text-[#E6E6E6]">
              Business & Employment-Focused dApp
            </h1>
            <div className="mt-6"></div>
            <h3 className="font-semibold text-2xl text-center text-[#E6E6E6]">
              <TypewriterTitle />
            </h3>
            <div className="mt-10"></div>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
