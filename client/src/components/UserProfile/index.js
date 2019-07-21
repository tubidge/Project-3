import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import bronzeFitnessBadge from "../../assets/badges/bronze_fitness.svg";
import silverEducationBadge from "../../assets/badges/silver_education.svg";
import goldTravelBadge from "../../assets/badges/gold_travel.svg";
import "./style.css";

const UserProfile = props => {
  // this works! Just creat a function to make it cleaner
  const [fitnessGoals, setFitnessGoals] = useState("");
  const [educationGoals, setEducationGoals] = useState("");

  const fade = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1
  });

  useEffect(() => {
    if (props.completeGoals) {
      let tempFitnessGoals = props.completeGoals.filter(
        goal => goal.category === "Fitness"
      );
      setFitnessGoals(tempFitnessGoals);

      let tempEducationGoals = props.completeGoals.filter(
        goal => goal.category === "Education"
      );
      setEducationGoals(tempEducationGoals);
    }
  }, []);

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
                {fitnessGoals.length > 0 ? (
                  <img src={bronzeFitnessBadge} alt="Fitness" />
                ) : null}
                {educationGoals.length > 0 ? (
                  <img src={silverEducationBadge} alt="Education" />
                ) : null}
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
