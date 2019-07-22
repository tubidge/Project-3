import React, { useState, useEffect } from "react";
import magnify from "../../assets/Magnify-1s-200px.svg";
import Fade from "../Fade";

const FindingBuddy = () => {
  const [rand, setRand] = useState(Math.random());
  const [mount, setMount] = useState(true);

  const words = [
    "Finding you a buddy...",
    "Comparing your goals...",
    "A few more seconds...."
  ];

  useEffect(() => {
    setInterval(() => setMount(mount => !mount), 800);
  }, []);

  return (
    <div className="container">
      <div className="center-align">
        <Fade>{mount ? <h1>{words[0]}</h1> : null}</Fade>
        <img src={magnify} alt="Loading" />
      </div>
    </div>
  );
};

export default FindingBuddy;
