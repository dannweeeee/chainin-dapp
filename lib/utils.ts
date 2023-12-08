import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function returnDestinationInfo(destinationChain: string) {
  switch (destinationChain) {
    case "Sepolia":
      return {
        selector: 16015286601757825753,
        minter: "0x3a3C3F10db0B5DF58C29Cc4C6E008A692e321b50",
      };
    case "Optimism Goerli":
      return { selector: 2664363617261496610, minter: "" };
    case "Avalanche Fuji":
      return { selector: 14767482510784806043, minter: "" };
  }
}
