import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import JoinGoalModal from "../JoinGoalModal";
import M from "materialize-css";
import API from "../../utils/API";
import moment from "moment";
import "./style.css";

const BuddyGoalCard = props => {
  const [joinedGoals, setJoinedGoals] = useState([]);

  const slideDown = useSpring({
    from: {
      marginTop: -1000
    },
    to: {
      marginTop: 0
    }
  });

  useEffect(() => {
    getJoinedGoals();
  }, []);

  const getJoinedGoals = () => {
    let temp = [];
    if (props.buddyGoals.length > 0) {
      props.buddyGoals.map(buddy => {
        buddy.joinedGoals.map(goal => {
          temp.push(goal.id);
        });
      });
    }
    setJoinedGoals(temp);
  };

  const renderFollowBtn = (id, name) => {
    let ids = [];
    let keys = [];
    props.following.forEach(index => {
      ids.push(index.id);
      keys.push(index);
    });

    if (ids.includes(id)) {
      let num = ids.indexOf(id);
      let follower = keys[num];
      console.log(follower);
      return (
        <button
          onClick={() => unFollow(follower.rowId, follower.name)}
          className="btn followBtn_BuddyCard"
        >
          <i className="material-icons left followIcon">directions_run</i>
          Unfollow
        </button>
      );
    } else {
      return (
        <button
          onClick={() => follow(id, name)}
          className="btn followBtn_BuddyCard"
        >
          <i className="material-icons left followIcon">directions_run</i>
          Follow
        </button>
      );
    }
  };

  const follow = (id, name) => {
    API.addFollower({
      follower: props.userId,
      GoalId: id
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        M.toast({ html: `Following '${name}'` });
        props.orderRender();
      } else {
        M.toast({ html: "Oops. Something went wrong" });
      }
    });
  };

  const unFollow = (id, name) => {
    console.log("function firing");
    API.deleteFollower(id).then(res => {
      if (res.data === "Success") {
        M.toast({ html: `Unfollowed '${name}'` });
        props.orderRender();
      } else {
        M.toast({ html: "Oops. Something went wrong" });
      }
    });
  };

  return (
    <animated.div style={slideDown}>
      {props.incompleteGoals.map(goal => (
        <div id="buddyGoalCard" key={goal.id} className="col l4 s12">
          <div className="card rounded">
            <div className="card-content">
              <div className="card-title">{goal.name}</div>
              <p>Category: {goal.category}</p>
              <p>Due Date: {moment(goal.dueDate).format("MM/DD/YYYY")}</p>
              <div className="card-action buddyCardBtnDiv">
                <JoinGoalModal
                  className="modal-trigger joinGoalBtn btn"
                  btnName={"Join goal"}
                  dataTarget={`joinGoal_${goal.id}`}
                  currentUserGoals={props.currentUserGoals}
                  addBuddy={props.addBuddy}
                  buddyName={props.buddyName}
                  userId={props.userId}
                  buddyGoalName={goal.name}
                  buddyId={props.buddyId}
                  buddyGoalId={goal.id}
                />
                {renderFollowBtn(goal.id, goal.name)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </animated.div>
  );
};

export default BuddyGoalCard;
