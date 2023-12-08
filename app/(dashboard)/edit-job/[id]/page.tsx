import EditJobForm from "@/components/forms/EditJobForm";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <EditJobForm listing_id={params.id} />
    </div>
  );
};

export default page;
