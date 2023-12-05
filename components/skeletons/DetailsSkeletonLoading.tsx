import React from "react";

function DetailsSkeletonLoading() {
  return (
    <div>
      <div className="bg-[#6789BA] shadow rounded-xl p-2 w-full">
        <div className="animate-pulse flex gap-3">
          <div className="flex-1 space-y-2 py-3 ">
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsSkeletonLoading;
