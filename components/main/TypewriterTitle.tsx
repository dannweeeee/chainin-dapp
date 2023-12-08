import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterTitle = () => {
  return (
    <Typewriter
      options={{
        loop: true, // loop indefinitely
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("✅ Authenticity-Driven")
          .changeDeleteSpeed(250)
          .pauseFor(200)
          .deleteAll()
          .typeString("✅ Privacy-Focused")
          .changeDeleteSpeed(250)
          .pauseFor(200)
          .deleteAll()
          .typeString(
            "✅ Powered by Chainlink CCIP, Polygon ID, The Graph and Tableland"
          )
          .changeDeleteSpeed(250)
          .pauseFor(200)
          .deleteAll()
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
