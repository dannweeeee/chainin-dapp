"use client";

import UserForm from "@/components/forms/UserForm";
import Topbar from "@/components/main/Topbar";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FileText, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center circles w-screen h-screen">
      <Topbar />
      <UserForm />
    </div>
  );
};

export default page;
