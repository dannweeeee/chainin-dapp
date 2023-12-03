"use client";

import TypewriterTitle from "@/components/main/TypewriterTitle";
import { FileText, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEnterChainIn = () => {
    router.push("/dashboard/home");
  };

  return (
    <div className="w-screen h-screen circles">
      <nav className="topbar py-8 px-5">
        <Link href="/" className="absolute">
          <Image
            src="/assets/chainin-logo-no-bg.png"
            alt="logo"
            width={210}
            height={210}
          />
        </Link>
        <div className="flex items-center gap-1">
          <div className="block md:hidden"></div>
        </div>

        <div>
          <div className="flex items-center gap-7 pr-8">
            <Link
              href="https://elements.getpostman.com/redirect?entityId=31443216-dd0d4c78-1b59-4c28-9376-7605289e74b8&entityType=collection"
              className="bg-[#E6E6E6] p-3 rounded-2xl hover:bg-[#6789bA]  hover:text-[#FFFFFF]"
            >
              <FileText className="cursor-pointer w-6 h-6" />
            </Link>
            <Link
              href="https://github.com/usechainin"
              className="bg-[#E6E6E6] p-3 rounded-2xl hover:bg-[#6789bA] hover:text-[#FFFFFF]"
            >
              <Github className="cursor-pointer w-6 h-6" />
            </Link>
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
          <div>
            {" "}
            <h1 className="font-semibold text-6xl text-center">ChainIn</h1>
            <div className="mt-4"></div>
            <h2 className="font-semibold text-4xl text-center">
              Business & Employment-Focused dApp
            </h2>
            <div className="mt-4"></div>
            <h3 className="font-semibold text-2xl text-center text-black">
              <TypewriterTitle />
            </h3>
            <div className="mt-4"></div>
            <div className="flex justify-center"></div>
          </div>
        )}
      </div>
    </div>
  );
}
