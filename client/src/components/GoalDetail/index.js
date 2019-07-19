import React, { useEffect, useState } from "react";
import "./style.css";
import ProgressBar from "../ProgressBar";
import moment from "moment";
import Loading from "../../components/Loading";
import DayCard from "../DayCard";
import API from "../../utils/API";

function GoalDetail(props) {
  const [goal, setGoal] = useState({});
  const [days, setDays] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reRender, setreRender] = useState(false);
  const [total, setTotal] = useState();
  const [percentage, setPercentage] = useState();

  useEffect(() => {
    console.log(props.goal);
    API.getGoal(props.goal.id).then(resp => {
      console.log(resp);
      setGoal(resp.data);
      let total =
        resp.data.milestones.complete.length +
        resp.data.milestones.incomplete.length;
      console.log(total);
      setTotal(total);
      let progress = resp.data.milestones.complete.length;
      let percentage = progress / total;
      console.log(percentage);
      setPercentage(percentage);
      configureDays();
    });
  }, [props.goal, reRender]);

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

  const configureDays = () => {
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
      props.goal.milestones.incomplete.forEach(index => {
        if (index.dueDate === day.date) {
          day.incompleteMilestone.push(index);
          console.log(day);
        }
      });

      props.goal.milestones.completed.forEach(index => {
        if (index.dueDate === day.date) {
          day.completedMilestone.push(index);
          console.log(day);
        }
      });

      configDays.push(day);
    });
    console.log(configDays);
    setDays(configDays);
    console.log(goal);
    setIsLoading(false);
  };

  const handleInput = event => {
    let value = event.target.value;
    let name = event.target.name;
    console.log(value);
    console.log(name);

    switch (name) {
      case "private":
        let privacy = !goal.private;
        let data = {
          colName: "private",
          info: privacy
        };
        API.editGoal(goal.id, data).then(resp => {
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
    <div className="card indigo darken-4 z-depth-5">
      <div className="card-content">
        <div className="card-title">
          <div className="goal-page-sub-header">
            <p className="goal-page-dueDate white-text">Due: {goal.dueDate}</p>
            {/* <div className="goal-page-progressBar">
              <ProgressBar />
            </div> */}
            <div
              className="tooltipped"
              data-position="top"
              data-tooltip="Private goals will not be seen by others"
            >
              <div className="switch">
                <p className="goal-page-privacy white-text">
                  {goal.private ? "Private" : "Public"}
                </p>
                <div className="goal-privacy-checkbox">
                  <label>
                    <input
                      onChange={handleInput}
                      type="checkbox"
                      name="private"
                      checked={goal.private ? "checked" : ""}
                    />
                    <span className="lever" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <h3 className="goal-page-title white-text">{goal.name}</h3>
        </div>
        <div className="row">
          <div className="col s6 offset-s3">
            <div className="">
              <ProgressBar total={total} percentage={percentage} />
            </div>
          </div>
        </div>

        <div className="goal-page-upcomingView">
          {days.map(index => {
            return (
              <DayCard
                key={index.date}
                reRender={orderRender}
                userId={props.userId}
                goalId={goal.id}
                date={index.date}
                status={reRender}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GoalDetail;
