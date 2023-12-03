import React from "react";
import OrganisationView from "../views/OrganisationView";
import { Landmark } from "lucide-react";

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="flex items-center font-semibold text-lg text-white gap-2">
          <Landmark />
          Explore Organisations
        </h3>
        <div className="flex w-[350px] flex-col gap-9">
          <OrganisationView />
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
