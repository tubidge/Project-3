import React from "react";
import magnify from "../../assets/Magnify-1s-200px.svg";
import Fade from "../Fade";

const FindingBuddy = () => {
  return (
    <div className="container">
      <div className="center-align">
        <Fade>
          <h1>Finding you a Buddy...</h1>
        </Fade>
        <img src={magnify} alt="Searching" />
      </div>
    </div>
  );
};

export default FindingBuddy;
