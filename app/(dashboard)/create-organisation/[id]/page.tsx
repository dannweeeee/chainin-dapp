"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

import ChainInService from "@/components/api/chainin-api";
import deployerABI from "../../../../contracts/ABI/Deployer.json";

export default function page({ params }: { params: { id: string } }) {
  const { address } = useAccount();
  const [schoolAddr, setSchoolAddr] = useState(null);
  const [companyAddr, setCompanyAddr] = useState(null);
  const [orgName, setOrgName] = useState("");
  const [orgSymbol, setOrgSymbol] = useState("");
  const [orgType, setOrgType] = useState(0);
  const [description, setDescription] = useState("");
  const [pictureURL, setPictureURL] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");

  useEffect(() => {
    if (schoolAddr === null && companyAddr === null) return;

    schoolAddr ? createOrg(schoolAddr) : createOrg(companyAddr);
  }, [schoolAddr, companyAddr]);

  const createOrg = async (addr: any) => {
    console.log("schoolAddr - ", schoolAddr);
    console.log("companyAddr - ", companyAddr);

    try {
      if (address !== undefined) {
        const post = await ChainInService.createOrganisation(
          orgName,
          orgSymbol,
          orgType,
          description,
          pictureURL,
          websiteURL,
          address,
          addr
        );

        console.log("createOrg - ", post);
      }
    } catch (error) {
      console.log("createOrg error - ", error);
    }
  };

  const createOrgClick = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://polygon-mumbai.g.alchemy.com/v2/JN27FrWzaeP_d2e4vtzLVdhD8opPD-xS`
    );
    const deployerAddr = "0x0854d10eF62823731C0227670915C9F569f8f47f"; // deployer contract on mumbai
    const signer = new ethers.Wallet(
      `0x80589dc788d4e50facb18831676547a3a1f4073bd0aec0c815505608866efd37`,
      provider
    );

    // Parameter for organisation
    const organisationType = 1; //1 = company, 2 = school
    const name = "Google";
    const symbol = "GOG";
    const operator = await signer.getAddress();
    const website = "https://www.google.com/";
    const imageURL =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1200px-Google_Chrome_icon_%28February_2022%29.svg.png";
    const description =
      "Google LLC is an American multinational technology company focusing on artificial intelligence, online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, and consumer electronics.";

    // set parameters for call api
    setOrgName(name);
    setOrgSymbol(symbol);
    setOrgType(organisationType);
    setDescription(description);
    setPictureURL(imageURL);
    setWebsiteURL(website);

    // call deployOrganisation() on Deployer contract
    const DeployerFactory = new ethers.Contract(
      deployerAddr,
      deployerABI.abi,
      signer
    );
    const tx = await DeployerFactory.deployOrganisation(
      organisationType,
      name,
      symbol,
      operator,
      imageURL,
      description
    );
    // get receipt of the transaction and fetch the event
    const receipt = await tx.wait();
    console.log("receipt - ", receipt);

    // fetch address of school/ company
    const newCompanySignature =
      "0xe975ce806e0fc48202608973e25a92eea9300b592f652043a604115a3af3171c";
    const newSchoolSignature =
      "0x0e28d88ea1f6786fc9c3fd67495a54fa0b5314e896d79d823be19bc399e78ce6";
    let schoolABI = [
      "event newSchool(address indexed school,string indexed name,string indexed imageURL,string description)",
    ];
    let companyABI = [
      "event newCompany(address indexed company,string indexed name,string indexed imageURL,string description)",
    ];
    //https://docs.ethers.org/v5/api/utils/abi/interface/
    let schoolIFace = new ethers.utils.Interface(schoolABI);
    let companyIFace = new ethers.utils.Interface(companyABI);

    receipt.logs.forEach((log: any) => {
      if (log.topics[0] == newSchoolSignature) {
        const parsedLog = schoolIFace.parseLog(log);
        const schoolAddr = parsedLog.args[0]; // address need to be stored
        setSchoolAddr(schoolAddr);
        const hashed_name = parsedLog.args[1].hash; // indexed string parameter is the keccak256(name)
        const hash_imageURL = parsedLog.args[2].hash; // indexed string parameter is the keccak256(imageURL)
        const description = parsedLog.args[3]; // original string

        // store the schoolAddr in DB
        // TODO: Define your logic here
        console.log("New school deployed on ", schoolAddr);
      } else if (log.topics[0] == newCompanySignature) {
        const parsedLog = companyIFace.parseLog(log);
        const companyAddr = parsedLog.args[0]; // address need to be stored
        setCompanyAddr(companyAddr);
        const hashed_name = parsedLog.args[1].hash; // indexed string parameter is the keccak256(name)
        const hash_imageURL = parsedLog.args[2].hash; // indexed string parameter is the keccak256(imageURL)
        const description = parsedLog.args[3]; // original string
        console.log("New company deployed on ", companyAddr);

        // store the companyAddr in DB
        // TODO: Define your logic here
      } else {
        console.log("No new organisation deployed in logIndex: ", log.logIndex);
      }
    });
  };

  return (
    <div>
      <Button onClick={createOrgClick}>Create an Organization</Button>
    </div>
  );
}
