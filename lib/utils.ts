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
        subgraph:
          "https://api.studio.thegraph.com/query/60400/chainlinkhackathon/version/latest",
      };
    case "Optimism Goerli":
      return {
        selector: 2664363617261496610,
        minter: "0x1ff52708d610b1d17f0830f036e992677cdc508a",
        subgraph:
          "https://api.studio.thegraph.com/query/60400/chainlinkhack-opgoer-nft/version/latest",
      };
    case "Avalanche Fuji":
      return {
        selector: 14767482510784806043,
        minter: "0xcF7E187Ed1090B9CE8E4a7266B5309d839E85648",
        subgraph:
          "https://api.studio.thegraph.com/query/60400/chainlinkhack-fuji-nft/version/latest",
      };
    default:
      return {
        selector: 2664363617261496610,
        minter: "0x1ff52708d610b1d17f0830f036e992677cdc508a",
        subgraph:
          "https://api.studio.thegraph.com/query/60400/chainlinkhack-opgoer-nft/version/latest",
      };
  }
}
