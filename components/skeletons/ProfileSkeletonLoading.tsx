import React from "react";

function ProfileSkeletonLoading() {
  return (
    <div>
      <div className="bg-[#8AA4CA] rounded-xl p-2 w-full">
        <div className="animate-pulse flex gap-3">
          <div className="rounded-lg bg-[#EDEDE9] h-[80px] w-[80px]"></div>
          <div className="flex-1 space-y-2 py-3 ">
            <div className="h-2 bg-[#EDEDE9] rounded w-1/2"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-1/2"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeletonLoading;
