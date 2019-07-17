import React, { useEffect, useState } from "react";
import "./style.css";
import ProgressBar from "../ProgressBar";
import moment from "moment";
import Loading from "../../components/Loading";
import DayCard from "../DayCard";
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
            <ul class="collapsible">
              <li>
                <div class="collapsible-header">Milestones:</div>
                <div class="collapsible-body">
                  <span>Lorem ipsum dolor sit amet.</span>
                </div>
              </li>
              <li>
                <div class="collapsible-header">Followers:</div>
                <div class="collapsible-body">
                  <span>Lorem ipsum dolor sit amet.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* <div className="col s5 offset-s2">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light milestone-image">
                <img
                  className="activator milestone-image"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp-9dM8KwwPjPYeQZSemZR-vslgDfxvnED6twp31maZ24WkWWmKQ"
                />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  Card Title<i className="material-icons right">more_vert</i>
                </span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  Card Title<i className="material-icons right">close</i>
                </span>
                <p>
                  Here is some more information about this product that is only
                  revealed once clicked on.
                </p>
              </div>
            </div>
          </div> */}
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
                  status={reRender}
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
