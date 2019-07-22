import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

import bronzeFinancialBadge from "../../assets/badges/bronze_financial.svg";
import bronzeFitnessBadge from "../../assets/badges/bronze_fitness.svg";
import bronzeTravelBadge from "../../assets/badges/bronze_travel.svg";
import bronzeWellnessBadge from "../../assets/badges/bronze_wellness.svg";
import bronzeEducationBadge from "../../assets/badges/bronze_education.svg";

import silverFinancialBadge from "../../assets/badges/silver_financial.svg";
import silverFitnessBadge from "../../assets/badges/silver_fitness.svg";
import silverTravelBadge from "../../assets/badges/silver_travel.svg";
import silverWellnessBadge from "../../assets/badges/silver_wellness.svg";
import silverEducationBadge from "../../assets/badges/silver_education.svg";

import goldFinancialBadge from "../../assets/badges/gold_financial.svg";
import goldFitnessBadge from "../../assets/badges/gold_fitness.svg";
import goldTravelBadge from "../../assets/badges/gold_travel.svg";
import goldWellnessBadge from "../../assets/badges/gold_wellness.svg";
import goldEducationBadge from "../../assets/badges/gold_education.svg";

import "./style.css";

const UserProfile = props => {
  const fade = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1
  });
  // this works! Just creat a function to make it cleaner
  const [financialGoals, setFinancialGoals] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState("");
  const [travelGoals, setTravelGoals] = useState("");
  const [wellnessGoals, setWellnessGoals] = useState("");
  const [educationGoals, setEducationGoals] = useState("");

  useEffect(() => {
    if (props.completeGoals) {
      let tempFinancialGoals = props.completeGoals.filter(
        goal => goal.category === "Financial"
      );
      setFinancialGoals(tempFinancialGoals);

      let tempFitnessGoals = props.completeGoals.filter(
        goal => goal.category === "Fitness"
      );
      setFitnessGoals(tempFitnessGoals);

      let tempTravelGoals = props.completeGoals.filter(
        goal => goal.category === "Travel"
      );
      setTravelGoals(tempTravelGoals);

      let tempWellnessGoals = props.completeGoals.filter(
        goal => goal.category === "Wellness"
      );
      setWellnessGoals(tempWellnessGoals);

      let tempEducationGoals = props.completeGoals.filter(
        goal => goal.category === "Education"
      );
      setEducationGoals(tempEducationGoals);
    }
  }, []);

  const renderBadge = (array, category) => {
    if (array.length > 9) {
      switch (category) {
        case "Financial":
          return (
            <>
              <span class="badge">1</span>
              <img src={goldFinancialBadge} alt={category} />
            </>
          );
        case "Fitness":
          return <img src={goldFitnessBadge} alt={category} />;
        case "Wellness":
          return <img src={goldWellnessBadge} alt={category} />;
        case "Travel":
          return <img src={goldTravelBadge} alt={category} />;
        case "Education":
          return <img src={goldEducationBadge} alt={category} />;
      }
    }
    if (array.length < 10 && array.length > 3) {
      switch (category) {
        case "Financial":
          return <img src={silverFinancialBadge} alt={category} />;
        case "Fitness":
          return <img src={silverFitnessBadge} alt={category} />;
        case "Wellness":
          return <img src={silverWellnessBadge} alt={category} />;
        case "Travel":
          return <img src={silverTravelBadge} alt={category} />;
        case "Education":
          return <img src={silverEducationBadge} alt={category} />;
      }
    }
    if (array.length < 4) {
      switch (category) {
        case "Financial":
          return (
            <>
              {/* <span className="badge">1</span> */}
              <img src={bronzeFinancialBadge} alt={category} />
            </>
          );
        case "Fitness":
          return (
            <>
              <img src={bronzeFitnessBadge} alt={category} />
            </>
          );
        case "Wellness":
          return <img src={bronzeWellnessBadge} alt={category} />;
        case "Travel":
          return <img src={bronzeTravelBadge} alt={category} />;
        case "Education":
          return <img src={bronzeEducationBadge} alt={category} />;
      }
    }
  };

  return (
    <animated.div style={fade}>
      <div className="profileSummary">
        <div className="row center-align" style={{ marginBottom: "13px" }}>
          <div className="profileImageContainer">
            <img
              className="circle responsive-img z-depth-3"
              alt="Profile"
              src={props.userPicture}
            />
          </div>
          {!props.buddyProfile && <Link to="/profile">Edit Picture</Link>}
          <div>
            <span className="buddyInfo" style={{ fontSize: "1.5em" }}>
              {props.username}
            </span>
          </div>
        </div>
        <div className="row center-align" style={{ marginBottom: "10px" }}>
          <div className="badges">
            {props.completeGoals && (
              <>
                {financialGoals.length > 0
                  ? renderBadge(financialGoals, "Financial")
                  : null}
                {fitnessGoals.length > 0
                  ? renderBadge(fitnessGoals, "Fitness")
                  : null}
                {wellnessGoals.length > 0
                  ? renderBadge(wellnessGoals, "Wellness")
                  : null}
                {travelGoals.length > 0
                  ? renderBadge(travelGoals, "Travel")
                  : null}
                {educationGoals.length > 0
                  ? renderBadge(educationGoals, "Education")
                  : null}
              </>
            )}
          </div>
          <div className="col s6">
            <span style={{ fontSize: "1.2em" }} className="buddyInfo">
              Goals
            </span>
            <br />
            <span style={{ fontSize: "1.1em" }}>
              {props.incompleteGoals.length}
            </span>
          </div>
          <div className="col s6">
            <span style={{ fontSize: "1.2em" }} className="buddyInfo">
              Buddies
            </span>
            <br />
            <span style={{ fontSize: "1.1em" }}>
              {props.buddies ? props.buddies.length : "0"}
            </span>
          </div>
        </div>
        <div className="row center-align" style={{ marginBottom: "10px" }}>
          <span className="buddyInfo">
            Completed {props.completeGoals ? props.completeGoals.length : 0}/
            {props.incompleteGoals.length} goals
          </span>
        </div>
        <hr style={{ marginTop: "0", margin: "3px", width: "100%" }} />
      </div>
    </animated.div>
  );
};

export default UserProfile;
