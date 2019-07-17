import React, { useState, useEffect } from "react";

const FindingBuddy = () => {
  const [current, setCurrent] = useState(0);

  const words = [
    "Finding you a buddy...",
    "Comparing your goals...",
    "A few more seconds...."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (current === words.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="container">
      <div className="center-align">
        <h1>{words[current]}</h1>
      </div>
    </div>
  );
};

export default FindingBuddy;
