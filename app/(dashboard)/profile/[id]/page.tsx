import ProfileHeader from "@/components/profile/ProfileHeader";
import React from "react";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  return (
    <section>
      <ProfileHeader wallet_address={params.id} />
    </section>
  );
};

export default ProfilePage;
