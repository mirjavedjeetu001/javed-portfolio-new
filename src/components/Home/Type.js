import React from "react";
import Typewriter from "typewriter-effect";

function Type({ strings = ["Software Developer", "MERN Stack Developer", "Open Source Contributor"] }) {
  return (
    <Typewriter
      options={{
        strings,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
