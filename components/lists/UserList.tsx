"use client";

import ChainInApi from "@/components/api/chainin-api";
import { useEffect, useState } from "react";
import UserCard from "@/components/cards/UserCard";
import SkeletonLoading from "@/components/skeletons/SkeletonLoading";

interface UserDetails {
  wallet_address: string;
  first_name: string;
  last_name: string;
  email_address: string;
  biography: string;
}

const UserList = () => {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleUserList = async () => {
      try {
        setLoading(true);
        const data = await ChainInApi.fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    handleUserList();
  }, []);

  const openNewTab = (url: any) => {
    window.open(url, "_blank");
  };

  return (
    <section className="flex flex-col gap-2">
      {loading ? (
        <div className="w-full">
          <SkeletonLoading />
        </div>
      ) : users && users.length > 0 ? (
        users.map((user) => (
          <UserCard
            key={user.wallet_address}
            wallet_address={user.wallet_address}
            first_name={user.first_name}
            last_name={user.last_name}
            email_address={user.email_address}
            biography={user.biography}
          />
        ))
      ) : (
        <p className="text-white font-semibold no-result mt-10 items-center justify-center flex ml-10">
          No Users Currently
        </p>
      )}
    </section>
  );
};

export default UserList;
