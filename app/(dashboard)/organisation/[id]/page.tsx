import Image from "next/image";
import { organisationTabs } from "@/constants";
import OrganisationHeader from "@/components/profile/OrganisationHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutTab from "@/components/tabs/AboutTab";
import JobsTab from "@/components/tabs/JobsTab";

async function OrganisationDetailsPage({ params }: { params: { id: number } }) {
  return (
    <section>
      <OrganisationHeader organisation_id={params.id} />
      <div>
        <Tabs defaultValue="about" className="w-full ml-10">
          <TabsList className="tab">
            {organisationTabs.map((tab) => (
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
          <TabsContent value="about" className="w-full text-light-1">
            <AboutTab organisation_id={params.id} />
          </TabsContent>
          <TabsContent value="jobs" className="w-full text-light-1">
            <JobsTab organisation_id={params.id} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default OrganisationDetailsPage;
