import React from "react";

function JobSkeletonLoading() {
  return (
    <div>
      <div className="bg-[#6789BA] shadow rounded-2xl p-2 w-full mt-5">
        <div className="animate-pulse flex gap-3">
          <div className="bg-[#EDEDE9] h-[60px] w-[60px] rounded-3xl"></div>
          <div className="flex-1 space-y-2 py-3 ">
            <div className="h-2 bg-[#EDEDE9] rounded w-1/3"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
          </div>
        </div>
      </div>
      <div className="bg-[#6789BA] shadow rounded-2xl p-2 w-full mt-5">
        <div className="animate-pulse flex gap-3">
          <div className="bg-[#EDEDE9] h-[60px] w-[60px] rounded-3xl"></div>
          <div className="flex-1 space-y-2 py-3 ">
            <div className="h-2 bg-[#EDEDE9] rounded w-1/3"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
          </div>
        </div>
      </div>
      <div className="bg-[#6789BA] shadow rounded-2xl p-2 w-full mt-5">
        <div className="animate-pulse flex gap-3">
          <div className="bg-[#EDEDE9] h-[60px] w-[60px] rounded-3xl"></div>
          <div className="flex-1 space-y-2 py-3 ">
            <div className="h-2 bg-[#EDEDE9] rounded w-1/3"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSkeletonLoading;
