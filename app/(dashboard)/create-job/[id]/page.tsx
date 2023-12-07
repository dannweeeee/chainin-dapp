import JobForm from "@/components/forms/JobForm";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <JobForm organisation_id={params.id} />
    </div>
  );
};

export default page;
