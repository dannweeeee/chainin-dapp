"use client";

import ChainInApi from "@/components/api/chainin-api";
import TypewriterTitle from "@/components/main/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { DoorClosed, DoorOpen, FileText, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PacmanLoader, SyncLoader } from "react-spinners";
import { useAccount } from "wagmi";

export default function Home() {
  const router = useRouter();
  const { address, status } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (!address && openConnectModal) {
        openConnectModal();
        setTimeout(checkWalletConnection, 1000);
      }
    };
    checkWalletConnection();
  }, [address, openConnectModal]);

  const openNewTab = (url: any) => {
    window.open(url, "_blank");
  };

  const enterChainIn = async () => {
    try {
      setLoading(true);
      const userExists = await ChainInApi.fetchUserByWalletAddress(address);
      if (userExists) {
        setLoading(false);
        router.push("/home");
      } else {
        setLoading(false);
        router.push("/onboarding");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user:", error);
      router.push("/onboarding");
    }
  };

  return (
    <div className="w-screen h-screen circles">
      <nav className="topbar py-8 px-5">
        <Link href="/" className="absolute">
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
          <div className="flex items-center gap-5 pr-8">
            <Button
              onClick={() =>
                openNewTab(
                  "https://elements.getpostman.com/redirect?entityId=31443216-dd0d4c78-1b59-4c28-9376-7605289e74b8&entityType=collection"
                )
              }
              className="p-3 rounded-2xl bg-[#6789BA] text-[#E6E6E6] hover:bg-[#E6E6E6]  hover:text-[#6789BA]"
            >
              <FileText className="cursor-pointer w-6 h-6" />
            </Button>
            <Button
              onClick={() =>
                openNewTab(
                  "https://elements.getpostman.com/redirect?entityId=31443216-dd0d4c78-1b59-4c28-9376-7605289e74b8&entityType=collection"
                )
              }
              className=" p-3 rounded-2xl bg-[#6789BA] text-[#E6E6E6] hover:bg-[#E6E6E6] hover:text-[#6789BA]"
            >
              <Github className="cursor-pointer w-6 h-6" />
            </Button>
          </div>
        </div>
      </nav>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-semibold text-5xl text-center mt-3 text-[#E6E6E6]">
            Business & Employment Aggregator dApp
          </h1>
          <div className="mt-6"></div>
          <p className="font-semibold text-2xl text-center mt-3 text-[#E6E6E6]">
            🚀 Decentralising Careers, Connecting Futures 🚀
          </p>
          <div className="mt-6"></div>
          <h3 className="font-semibold text-xl text-center text-[#E6E6E6]">
            <TypewriterTitle />
          </h3>
          <div className="mt-6"></div>
          <div className="flex-col justify-center">
            <Button
              id="enterChainInButton"
              onClick={enterChainIn}
              className="h-12 gap-2 bg-[#4A6FA4] hover:bg-[#6789BA] hover:border text-[#E6E6E6] hover:text-[#E6E6E6]"
            >
              {loading ? (
                <>
                  Entering ChainIn
                  <SyncLoader size={5} color="#E6E6E6" />
                </>
              ) : status === "connected" ? (
                <>
                  Enter ChainIn <DoorOpen />
                </>
              ) : (
                <>
                  Connect Wallet <DoorClosed />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
