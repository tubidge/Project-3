import React, { useEffect, useState } from "react";
import "./style.css";
import ProgressBar from "../ProgressBar";
import moment from "moment";
import Loading from "../../components/Loading";
import DayCard from "../DayCard";

function GoalDetail(props) {
  const [goal, setGoal] = useState({});
  const [days, setDays] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reRender, setreRender] = useState(false);

  useEffect(() => {
    console.log(props.goal);
    setGoal(props.goal);
    configureDays();
  }, [props.goal]);

  const configureDays = () => {
    let arrDays = [];
    for (var i = 0; i < 5; i++) {
      let num = [i + 1];
      let day = moment()
        .add(`${num}`, "days")
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-title">
          <div className="goal-page-sub-header">
            <p className="goal-page-dueDate">Due: {goal.dueDate}</p>
            {/* <div className="goal-page-progressBar">
              <ProgressBar />
            </div> */}
            <p className="goal-page-privacy">
              {goal.private ? "Private" : "Public"}
            </p>
          </div>
          <h3 className="goal-page-title">{goal.name}</h3>
        </div>
        <div className="goal-page-upcomingView">
          {days.map(index => {
            return (
              <DayCard
                userId={props.userId}
                goalId={goal.id}
                date={index.date}
                completed={index.completedMilestone}
                incomplete={index.incompleteMilestone}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GoalDetail;
