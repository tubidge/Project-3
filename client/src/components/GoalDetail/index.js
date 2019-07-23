import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ProgressBar from "../ProgressBar";
import moment from "moment";
import Loading from "../../components/Loading";
import DayCard from "../DayCard";
import MilestonesCard from "../MilestonesCard";
import Modal from "../Modal";
import API from "../../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import M from "materialize-css";

function GoalDetail(props) {
  const [currentGoal, setCurrentGoal] = useState();
  const [days, setDays] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reRender, setreRender] = useState(false);
  const [total, setTotal] = useState();
  const [percentage, setPercentage] = useState();
  const [goalStatus, setGoalStatus] = useState(false);
  const [currentDay, setCurrentDay] = useState();
  const [followers, setFollowers] = useState();
  const frequencies = ["Daily", "Weekly", "Monthly"];

  useEffect(() => {
    document.addEventListener("click", function() {
      let options = { fullWidth: true };
      var elems = document.querySelectorAll(".collapsible");
      var instances = M.Collapsible.init(elems, options);
    });

    let modals = document.querySelectorAll(".modal");
    let options = {
      dismissible: true,
      inDuration: 200,
      outDuration: 400
    };
    M.Modal.init(modals, options);

    getData();
  }, [props.goal.id, reRender]);

  const getData = () => {
    API.getFollowers(props.goal.id)
      .then(data => {
        setFollowers(data.data);
      })
      .then(() => {
        API.getGoal(props.goal.id).then(resp => {
          setCurrentGoal(resp.data);
          let total =
            resp.data.milestones.complete.length +
            resp.data.milestones.incomplete.length;
          setTotal(total);
          let progress = resp.data.milestones.complete.length;
          let percentage = progress / total;

          setPercentage(percentage);
          configureDays(resp.data);
        });
      });
  };

  const getMilestoneRender = () => {
    getData();
  };

  // useEffect(() => {
  //   API.getGoal(props.goal.id).then(resp => {
  //     console.log(resp.data);
  //     setCurrentGoal(resp.data);

  //     let total =
  //       resp.data.milestones.complete.length +
  //       resp.data.milestones.incomplete.length;

  //     setTotal(total);
  //     let progress = resp.data.milestones.complete.length;
  //     let percentage = progress / total;
  //     console.log(percentage);
  //     setPercentage(percentage);
  //   });
  // }, [goalStatus]);

  // useEffect(() => {
  //   console.log(renderDays);
  //   configureDays();
  // }, [renderDays]);

  const orderProgressRender = () => {
    setGoalStatus(!goalStatus);
  };

  // useEffect(() => {
  //   if (goal.milestones) {
  //     let total =
  //       goal.milestones.completed.length + goal.milestones.incomplete.length;
  //     console.log(total);
  //     setTotal(total);
  //     let progress = goal.milestones.completed.length;
  //     let percentage = progress / total;
  //     console.log(percentage);
  //     setPercentage(percentage);
  //   }
  // }, []);

  const orderRender = () => {
    console.log("running good");
    props.orderRender();
    setreRender(!reRender);
  };

  const configureDays = goal => {
    let arrDays = [];
    let now;
    if (currentDay) {
      now = moment(currentDay).format("YYYY-MM-DD");
    } else {
      now = moment().format("YYYY-MM-DD");
    }
    setCurrentDay(now);
    for (var i = 0; i < 5; i++) {
      // let num = [i + 1];
      let day = moment(now)
        .add(`${i}`, "days")
        .format("YYYY-MM-DD");

      arrDays.push(day);
    }

    let configDays = [];
    // let data = data;
    arrDays.forEach(index => {
      const day = {
        date: index,
        incompleteMilestone: [],
        completedMilestone: []
      };
      goal.milestones.incomplete.forEach(index => {
        if (index.dueDate === day.date) {
          day.incompleteMilestone.push(index);
        }
      });

      goal.milestones.complete.forEach(index => {
        if (index.dueDate === day.date) {
          day.completedMilestone.push(index);
        }
      });

      configDays.push(day);
    });

    setDays(configDays);
    setIsLoading(false);
  };

  const nextFive = () => {
    let arrDays = [];
    let now = moment(currentDay)
      .add("5", "days")
      .format("YYYY-MM-DD");

    setCurrentDay(now);
    for (var i = 0; i < 5; i++) {
      // let num = [i + 1];
      let day = moment(now)
        .add(`${i}`, "days")
        .format("YYYY-MM-DD");

      arrDays.push(day);
    }

    let configDays = [];
    // let data = data;
    arrDays.forEach(index => {
      const day = {
        date: index,
        incompleteMilestone: [],
        completedMilestone: []
      };
      currentGoal.milestones.incomplete.forEach(index => {
        if (index.dueDate === day.date) {
          day.incompleteMilestone.push(index);
        }
      });

      currentGoal.milestones.complete.forEach(index => {
        if (index.dueDate === day.date) {
          day.completedMilestone.push(index);
        }
      });

      configDays.push(day);
    });

    setDays(configDays);
  };

  const makeid = l => {
    let text = "";
    let char_list =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < l; i++) {
      text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
  };

  const lastFive = () => {
    let arrDays = [];
    let now = moment(currentDay)
      .subtract("5", "days")
      .format("YYYY-MM-DD");

    setCurrentDay(now);
    for (var i = 0; i < 5; i++) {
      // let num = [i + 1];
      let day = moment(now)
        .add(`${i}`, "days")
        .format("YYYY-MM-DD");

      arrDays.push(day);
    }

    let configDays = [];
    // let data = data;
    arrDays.forEach(index => {
      const day = {
        date: index,
        incompleteMilestone: [],
        completedMilestone: []
      };
      currentGoal.milestones.incomplete.forEach(index => {
        if (index.dueDate === day.date) {
          day.incompleteMilestone.push(index);
        }
      });

      currentGoal.milestones.complete.forEach(index => {
        if (index.dueDate === day.date) {
          day.completedMilestone.push(index);
        }
      });

      configDays.push(day);
    });

    setDays(configDays);
  };

  const oderEditRender = () => {
    setreRender(!reRender);
  };

  const getToday = () => {
    setCurrentDay(false);
    setreRender(!reRender);
  };

  const handleInput = event => {
    let value = event.target.value;
    let name = event.target.name;

    switch (name) {
      case "private":
        let privacy = !currentGoal.private;
        let data = {
          colName: "private",
          info: privacy
        };
        API.editGoal(currentGoal.id, data).then(resp => {
          console.log(resp);
          setreRender(!reRender);
        });
        break;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="row">
      <div className="col s1 nextGoalArrow">
        <span>
          <FontAwesomeIcon icon={faChevronLeft} onClick={props.prevGoal} />
        </span>
      </div>
      <div className="col s10">
        <div id="goalCard" className="card z-depth-5">
          <div className="row">
            <div
              className="col s12"
              style={{ textAlign: "right", marginBottom: "-42px" }}
            >
              <i
                className="material-icons"
                style={{
                  color: "white",
                  cursor: "pointer",
                  fontSize: "3rem"
                }}
                onClick={props.exit}
              >
                close
              </i>
            </div>
          </div>
          <div className="card-content goal-page-card">
            <div className="card-title goal-page-cardTitle">
              <div className="goal-page-sub-header">
                <div className="switch">
                  <p className="goal-page-privacy white-text">
                    {currentGoal.private ? "Private" : "Public"}
                  </p>
                  <div className="goal-privacy-checkbox">
                    <label>
                      <input
                        onChange={handleInput}
                        type="checkbox"
                        name="private"
                        checked={currentGoal.private ? "" : "checked"}
                      />
                      <span className="lever" />
                    </label>
                  </div>
                </div>
                <p className="goal-page-dueDate white-text">
                  Due: {moment(currentGoal.dueDate).format("MM/DD/YYYY")}
                </p>
              </div>
              <h3 className="goal-page-title white-text">
                {currentGoal.name}{" "}
                <Modal
                  className="material-icons goal-edit-button modal-trigger"
                  header="Edit This Goal"
                  btnName="edit"
                  action="Edit"
                  goalId={currentGoal.id}
                  name={currentGoal.name}
                  dueDate={currentGoal.dueDate}
                  orderRender={oderEditRender}
                  dataTarget={`editGoal_${makeid(5)}`}
                />
              </h3>
            </div>
            <div className="row">
              <div className="col s6 offset-s3">
                <div className="">
                  <ProgressBar
                    total={total}
                    percentage={percentage}
                    header="goal-page"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              {currentGoal ? (
                <>
                  <div className="col s5 offset-s1">
                    <ul className="collapsible">
                      <li>
                        <div className="collapsible-header milestonesListHeader">
                          <i className="material-icons">assignment</i>
                          Milestones: {currentGoal.milestones.complete.length}/
                          {currentGoal.milestones.complete.length +
                            currentGoal.milestones.incomplete.length}
                        </div>
                        <div className="collapsible-body milestones-body">
                          {frequencies.map(index => {
                            return (
                              <MilestonesCard
                                frequency={index}
                                goalId={currentGoal.id}
                                userId={props.userId}
                                orderProgressRender={orderProgressRender}
                                reRender={orderRender}
                                key={index}
                              />
                            );
                          })}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col s5">
                    <ul className="collapsible">
                      <li>
                        <div className="collapsible-header milestonesListHeader">
                          <i className="material-icons">directions_run</i>
                          Followers: {followers.length}{" "}
                        </div>
                        <div className="collapsible-body followers-body">
                          {followers.map(index => {
                            return (
                              <div
                                className="chip"
                                style={{
                                  backgroundColor: "#d4ac0d",
                                  color: "#10355f",
                                  cursor: "pointer"
                                }}
                              >
                                <img
                                  src={
                                    index.image
                                      ? index.image
                                      : "https://image.flaticon.com/icons/png/128/57/57117.png"
                                  }
                                />

                                <Link
                                  to={`/buddy-profile/${index.id}`}
                                  className="follower-link"
                                >
                                  {index.username}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="row">
              <div
                className="col s12"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {" "}
                <div>
                  <i
                    class="material-icons day-card-controls"
                    onClick={lastFive}
                    style={{
                      color: "white",
                      fontSize: "3rem",
                      cursor: "pointer"
                    }}
                  >
                    fast_rewind
                  </i>

                  <i
                    class="material-icons day-card-controls"
                    onClick={getToday}
                    style={{
                      color: "white",
                      fontSize: "3rem",
                      cursor: "pointer",
                      marginLeft: "2rem"
                    }}
                  >
                    today
                  </i>
                </div>
                <i
                  onClick={nextFive}
                  class="material-icons day-card-controls"
                  style={{
                    color: "white",
                    fontSize: "3rem",
                    cursor: "pointer"
                  }}
                >
                  fast_forward
                </i>
              </div>
            </div>
            <div className="row">
              <div className="goal-page-upcomingView">
                {days.map(index => {
                  return (
                    <DayCard
                      orderProgressRender={orderProgressRender}
                      key={index.date}
                      reRender={orderRender}
                      userId={props.userId}
                      goalId={currentGoal.id}
                      date={index}
                      getMilestoneRender={getMilestoneRender}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col s1 nextGoalArrow">
        <span>
          <FontAwesomeIcon icon={faChevronRight} onClick={props.nextGoal} />
        </span>
      </div>
    </div>
  );
}

export default GoalDetail;
