import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";
import GoalDetail from "../../components/GoalDetail";
import MilestoneColumn from "../../components/MilestoneColumn";
import Milestone from "../../components/Milestone";
import Buddy from "../../components/Buddy";
import BuddyColumn from "../../components/BuddyColumn";
import M from "materialize-css";
import "./style.css";
import API from "../../utils/API";

const Goals = props => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [, setGoalInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [allBuddies, setAllBuddies] = useState();

  useEffect(() => {
    M.AutoInit();
    getAllData();
  }, []);

  const getAllData = () => {
    API.getUserByEmail(user.email).then(resp => {
      console.log(resp.data);
      let userData = resp.data;
      API.getAllGoals(userData.id).then(res => {
        console.log(res.data);
        let goalData = res.data;
        setGoalInfo(goalData);
        setUserInfo(userData);
        if (userData.buddies) {
          setAllBuddies(userData.buddies.allBuddies);
        }
        setIncompleteGoals(goalData.currentGoals.incomplete);
        setCategories(
          goalData.currentGoals.incomplete
            .map(goal => goal.category)
            .reduce(
              (unique, item) =>
                unique.includes(item) ? unique : [...unique, item],
              []
            )
        );
        setIsLoading(false);
        console.log(incompleteGoals);
      });
    });
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

  return (
    <section className="container">
      <div className="row">
        <div className="col s12">
          <ul className="tabs">
            {categories.map(category => (
              <>
                <li key={makeid(5)} className="tab col s3">
                  <Link to="#test1">{category}</Link>
                </li>
              </>
            ))}
            <li className="tab col s3">
              <a href="#test1">Category 1</a>
            </li>
            <li className="tab col s3">
              <a href="#test2">Category 2</a>
            </li>
            <li className="tab col s3">
              <a href="#test3">Category 3</a>
            </li>
            <li className="tab col s3">
              <a href="#test4">Category 4</a>
            </li>
          </ul>
        </div>

        <div id="test1">
          <div className="col s2">
            <ul className="goal-tabs">
              <a href="#goal1-1">
                <li className="goal-tab center-align">Goal 1</li>
              </a>
              <a href="#goal1-2">
                <li className="goal-tab center-align">Goal 2</li>
              </a>
              <a href="#goal1-3">
                <li className="goal-tab center-align">Goal 3</li>
              </a>
            </ul>
          </div>

          <div className="col s10 goal-detail">
            <GoalDetail
              name="Example Goal"
              due="01/01/2019"
              desc="Here is a description of your goal"
            >
              <MilestoneColumn>
                {incompleteGoals.map(goal =>
                  goal.milestones.incomplete.map(milestone => (
                    <Milestone
                      id={milestone.id}
                      key={milestone.id}
                      name={milestone.name}
                      frequency={milestone.frequency}
                      due={milestone.dueDate}
                    />
                  ))
                )}
              </MilestoneColumn>
              <BuddyColumn>
                {incompleteGoals.map(goal =>
                  goal.buddy.current.map(buddy => <Buddy name={buddy} />)
                )}
              </BuddyColumn>
            </GoalDetail>
          </div>
        </div>

        <div id="test2">
          <div className="col s2">
            <ul className="goal-tabs">
              <a href="#goal1-1">
                <li className="goal-tab center-align">Goal 1</li>
              </a>
              <a href="#goal1-2">
                <li className="goal-tab center-align">Goal 2</li>
              </a>
              <a href="#goal1-3">
                <li className="goal-tab center-align">Goal 3</li>
              </a>
            </ul>
          </div>

          <div className="col s10 goal-detail">{props.children}</div>
        </div>

        <div id="test3">
          <div className="col s2">
            <ul className="goal-tabs">
              <a href="#goal1-1">
                <li className="goal-tab center-align">Goal 1</li>
              </a>
              <a href="#goal1-2">
                <li className="goal-tab center-align">Goal 2</li>
              </a>
              <a href="#goal1-3">
                <li className="goal-tab center-align">Goal 3</li>
              </a>
            </ul>
          </div>
        </div>

        <div id="test4">
          <div className="col s2">
            <ul className="goal-tabs">
              <a href="#goal1-1">
                <li className="goal-tab center-align">Goal 1</li>
              </a>
              <a href="#goal1-2">
                <li className="goal-tab center-align">Goal 2</li>
              </a>
              <a href="#goal1-3">
                <li className="goal-tab center-align">Goal 3</li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Goals;
