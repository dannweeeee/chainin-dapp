import React from "react";
import { Landmark } from "lucide-react";
import OrganisationList from "../lists/OrganisationList";
import { Separator } from "../ui/separator";

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="flex items-center justify-center font-semibold text-lg text-white gap-2">
          <Landmark />
          Explore Organisations
        </h3>
        <div className="h-2"></div>
        <Separator />
        <div className="flex w-[350px] flex-col gap-9">
          <OrganisationList />
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
