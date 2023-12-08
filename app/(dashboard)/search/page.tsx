import SearchJobsTab from "@/components/tabs/SearchJobsTab";
import SearchOrganisationTab from "@/components/tabs/SearchOrganisationTab";
import SearchUserTab from "@/components/tabs/SearchUserTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { searchTabs } from "@/constants";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section>
      <div className="ml-16">
        <Tabs defaultValue="user" className="w-full mt-3">
          <TabsList className="tab">
            {searchTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Posts" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2"></p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="user" className="w-full text-light-1">
            <SearchUserTab />
          </TabsContent>
          <TabsContent value="organisation" className="w-full text-light-1">
            <SearchOrganisationTab />
          </TabsContent>
          <TabsContent value="jobs" className="w-full text-light-1">
            <SearchJobsTab />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default page;
