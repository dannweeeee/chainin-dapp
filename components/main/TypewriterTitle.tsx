import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true, // loop indefinitely
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("✅ Decentralising Careers, Connecting Futures")
          .pauseFor(250)
          .deleteAll()
          .typeString(
            "✅ Powered by Chainlink CCIP, Polygon ID, The Graph and Tableland"
          )
          .pauseFor(250)
          .deleteAll()
          .typeString(
            "✅ Leveraging Blockchain to Create a New Paradigm for Careers"
          )
          .pauseFor(250)
          .deleteAll()
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
