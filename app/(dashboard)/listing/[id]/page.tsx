import JobHeader from "@/components/profile/JobHeader";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <JobHeader listing_id={params.id} />
    </div>
  );
};

export default page;
