// components/Popup.js
import React, { FC } from "react";

interface CardProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
}
const ApplyJobCard: FC<CardProps> = ({ isOpen, onClose, onSelect }) => {
  const chainsOptions = ["Sepolia", "Optimism Goerli", "Avalanche Fuji"];

  return (
    isOpen && (
      <div className="">
        <div className="">
          <button onClick={onClose} className="bg-[#0603c8]">
            Close
          </button>
          <label htmlFor="dropdown">
            Select destination chain to mint the application NFT:
          </label>
          <select id="dropdown" onChange={(e) => onSelect(e.target.value)}>
            {chainsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              console.log("send tx");
            }}
            className="bg-[#0603c8]"
          >
            send tx
          </button>
        </div>
      </div>
    )
  );
};

export default ApplyJobCard;
