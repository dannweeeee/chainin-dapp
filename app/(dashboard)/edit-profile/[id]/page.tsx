import EditUserForm from "@/components/forms/EditUserForm";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <EditUserForm wallet_address={params.id} />
    </div>
  );
};

export default page;
