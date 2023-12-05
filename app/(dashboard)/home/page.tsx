'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";

import deployerABI from "../../../contracts/ABI/Deployer.json";

export default function page () {
  const createOrg = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://polygon-mumbai.g.alchemy.com/v2/JN27FrWzaeP_d2e4vtzLVdhD8opPD-xS`
    );
    const deployerAddr = "0x0854d10eF62823731C0227670915C9F569f8f47f"; // deployer contract on mumbai
  }

  return ( 
    <div>
      <Button onClick={createOrg}>
        Create an Organization
      </Button>
    </div>
  )
};
