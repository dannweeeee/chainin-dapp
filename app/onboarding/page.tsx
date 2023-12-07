"use client";

import UserForm from "@/components/forms/UserForm";
import Topbar from "@/components/main/Topbar";
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
