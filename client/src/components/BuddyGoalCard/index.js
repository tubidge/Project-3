import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import JoinGoalModal from "../JoinGoalModal";
import DeleteBuddyModal from "../DeleteBuddyModal";
import M from "materialize-css";
import API from "../../utils/API";
import moment from "moment";
import "./style.css";

const BuddyGoalCard = props => {
  const [filteredBuddyGoals, setBuddyGoals] = useState([]);

  const slideDown = useSpring({
    from: {
      marginTop: -1000
    },
    to: {
      marginTop: 0
    }
  });

  useEffect(() => {
    setBuddyGoals(getJoinedGoals);
  }, []);

  const getJoinedGoals = () => {
    let temp = [];
    props.buddyGoals
      .filter(item => item.username === props.buddyName)
      .map(item => item.joinedGoals.map(goal => temp.push(goal.buddyGoal)));
    return temp;
  };

  const deleteBuddy = id => {
    API.deleteBuddy(id).then(res => {
      setBuddyGoals(getJoinedGoals);
      console.log(res);
    });
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
                {getJoinedGoals().includes(goal.id) ? (
                  <DeleteBuddyModal
                    btnName="Leave Goal"
                    className="right leaveGoalBtn modal-trigger btn-darkBlue btn btn-small"
                    dataTarget={`deleteBuddy_${goal.id}`}
                    deleteBuddy={deleteBuddy}
                    id={goal.id}
                    endDate={goal.endDate}
                    buddyGoalName={goal.name}
                  />
                ) : (
                  <>
                    <JoinGoalModal
                      getUserData={props.getUserData}
                      className="modal-trigger joinGoalBtn btn"
                      btnName="Join Goal"
                      dataTarget={`joinGoal_${goal.id}`}
                      currentUserGoals={props.currentUserGoals}
                      addBuddy={props.addBuddy}
                      buddyName={props.buddyName}
                      userEmail={props.userEmail}
                      userId={props.userId}
                      buddyGoalName={goal.name}
                      buddyId={props.buddyId}
                      buddyGoalId={goal.id}
                    />
                    {renderFollowBtn(goal.id, goal.name)}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {filteredBuddyGoals.map(item =>
        item.joinedGoals.map(goal => (
          <ul key={goal.buddyGoal}>
            <li>{goal.buddyGoalName}</li>
            <span>{goal.buddyGoal}</span>
          </ul>
        ))
      )}
    </animated.div>
  );
};

export default BuddyGoalCard;
