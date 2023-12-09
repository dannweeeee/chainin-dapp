import OrganisationHeader from "@/components/profile/OrganisationHeader";
import OrganisationTabsArray from "@/components/tabs/OrganisationTabsArray";

async function OrganisationDetailsPage({ params }: { params: { id: number } }) {
  return (
    <section>
      <OrganisationHeader organisation_id={params.id} />
      <OrganisationTabsArray organisation_id={params.id} />
    </section>
  );
}

export default OrganisationDetailsPage;
