"use client";

import ChainInApi from "@/components/api/chainin-api";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import UserCard from "@/components/cards/UserCard";
import UserList from "@/components/lists/UserList";

interface UserData {
  wallet_address: string;
  first_name: string;
  last_name: string;
  email_address: string;
  biography: string;
}

function SearchUserTab() {
  const [walletAddress, setWalletAddress] = useState("");
  const [userData, setUserData] = useState<UserData>();

  const handleUserSearch = async () => {
    try {
      const data = await ChainInApi.fetchUserByWalletAddress(walletAddress);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="ml-10 mt-10">
      <div className="searchbar">
        <Image
          src="/assets/search.svg"
          alt="search"
          width={22}
          height={22}
          className="object-contain"
        />
        <Input
          id="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder={"Enter Wallet Address 😌"}
          className="no-focus searchbar_input text-white font-semibold"
        />
        <Button className="gap-5 text-sm mr-1" onClick={handleUserSearch}>
          Search
        </Button>
      </div>
      <div className="flex flex-col gap-9 rounded-lg p-5 mt-2">
        {userData ? (
          <UserCard
            key={userData.wallet_address}
            wallet_address={userData.wallet_address}
            first_name={userData.first_name}
            last_name={userData.last_name}
            email_address={userData.email_address}
            biography={userData.biography}
          />
        ) : (
          <UserList />
        )}
      </div>
    </div>
  );
}

export default SearchUserTab;
