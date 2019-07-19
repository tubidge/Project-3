import React, { useEffect, useState } from "react";
import "./style.css";
import ProgressBar from "../ProgressBar";
import moment from "moment";
import Loading from "../../components/Loading";
import DayCard from "../DayCard";
import MilestonesCard from "../MilestonesCard";
import API from "../../utils/API";
import M from "materialize-css";

function GoalDetail(props) {
  const [currentGoal, setCurrentGoal] = useState({});
  const [days, setDays] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reRender, setreRender] = useState(false);
  const [total, setTotal] = useState();
  const [percentage, setPercentage] = useState();
  const [goalStatus, setGoalStatus] = useState(false);
  const [renderDays, setRenderDays] = useState(false);

  const frequencies = ["Daily", "Weekly", "Monthly"];

  useEffect(() => {
    document.addEventListener("click", function() {
      let options = {};
      var elems = document.querySelectorAll(".collapsible");
      var instances = M.Collapsible.init(elems, options);
    });
    setIsLoading(true);
    console.log(props.goal);
    API.getGoal(props.goal.id)
      .then(resp => {
        console.log(resp.data);
        setCurrentGoal(resp.data);

        let total =
          resp.data.milestones.complete.length +
          resp.data.milestones.incomplete.length;

        setTotal(total);
        let progress = resp.data.milestones.complete.length;
        let percentage = progress / total;
        console.log(percentage);
        setPercentage(percentage);
      })
      .then(() => {
        console.log(currentGoal);
        configureDays();
      });
  }, [props.goal.id, reRender]);

  useEffect(() => {
    API.getGoal(props.goal.id).then(resp => {
      console.log(resp.data);
      setCurrentGoal(resp.data);

      let total =
        resp.data.milestones.complete.length +
        resp.data.milestones.incomplete.length;

      setTotal(total);
      let progress = resp.data.milestones.complete.length;
      let percentage = progress / total;
      console.log(percentage);
      setPercentage(percentage);
    });
  }, [goalStatus]);

  useEffect(() => {
    console.log(renderDays);
    configureDays();
  }, [renderDays]);

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

  const orderDays = () => {
    console.log("days running");
    setRenderDays(!renderDays);
    console.log(renderDays);
  };

  const configureDays = () => {
    console.log(currentGoal);
    if (currentGoal.dueDate) {
      let arrDays = [];
      for (var i = 0; i < 5; i++) {
        // let num = [i + 1];
        let day = moment()
          .add(`${i}`, "days")
          .format("YYYY-MM-DD");

        arrDays.push(day);
      }

      let configDays = [];
      arrDays.forEach(index => {
        const day = {
          date: index,
          incompleteMilestone: [],
          completedMilestone: []
        };
        currentGoal.milestones.incomplete.forEach(index => {
          if (index.dueDate === day.date) {
            day.incompleteMilestone.push(index);
            console.log(day);
          }
        });

        currentGoal.milestones.complete.forEach(index => {
          if (index.dueDate === day.date) {
            day.completedMilestone.push(index);
            console.log(day);
          }
        });

        configDays.push(day);
      });
      console.log(configDays);
      setDays(configDays);

      setIsLoading(false);
    } else {
      setreRender(!reRender);
    }
  };

  // const renderDayCards = () => {
  //   console.log("running");
  //   console.log(days);
  //   days.map(index => {

  //     return (

  //         <DayCard
  //           orderProgressRender={orderProgressRender}
  //           key={index.date}
  //           reRender={orderRender}
  //           userId={props.userId}
  //           goalId={currentGoal.id}
  //           date={index.date}
  //           status={reRender}
  //         />

  //     );
  //   });
  // };

  const handleInput = event => {
    let value = event.target.value;
    let name = event.target.name;
    console.log(value);
    console.log(name);

    switch (name) {
      case "private":
        let privacy = !currentGoal.private;
        let data = {
          colName: "private",
          info: privacy
        };
        API.editGoal(currentGoal.id, data).then(resp => {
          console.log(resp);
          setGoalStatus(!goalStatus);
        });
        break;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="card indigo darken-4 z-depth-5">
      <div className="card-content goal-page-card">
        <div className="card-title goal-page-cardTitle">
          <div className="goal-page-sub-header">

            <p className="goal-page-dueDate white-text">
              Due: {currentGoal.dueDate}
            </p>

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
          </div>
          <h3 className="goal-page-title white-text">{currentGoal.name}</h3>
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
          <div className="col s5">
            <ul className="collapsible">
              <li>
                <div className="collapsible-header">
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
                        orderProgressRender={orderProgressRender}
                        reRender={orderRender}
                        key={index}
                        orderDays={orderDays}
                      />
                    );
                  })}
                </div>
              </li>
              <li>
                <div className="collapsible-header">
                  <i className="material-icons">directions_run</i>
                  Followers: {currentGoal.buddies.current.length}{" "}
                </div>
                <div className="collapsible-body followers-body">
                  <span>Lorem ipsum dolor sit amet.</span>
                </div>
              </li>
            </ul>
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
                  date={index.date}
                  status={renderDays}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalDetail;
