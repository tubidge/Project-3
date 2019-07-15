import React, { useEffect, useState } from "react";
import "./style.css";
import ProgressBar from "../ProgressBar";
import moment from "moment";
import DayCard from "../DayCard";

// export default class GoalDetail extends React.Component {
//   state = {
//     name: this.props.goal.name,
//     description: this.props.goal.description,
//     dueDate: this.props.goal.dueDate,
//     private: this.props.goal.private
//   };

//   getDerivedStateFromProps() {
//     this.setState({
//       name: this.props.goal.name,
//       description: this.props.goal.description,
//       dueDate: this.props.goal.dueDate,
//       private: this.props.goal.private
//     });
//   }

//   render() {
//     console.log(this.state.name);
//     return (
//       <div className="card">
//         <div className="card-content">
//           <div className="card-title">
//             <h3>{this.state.name}</h3>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

function GoalDetail(props) {
  const [goal, setGoal] = useState({});
  const [dayOne, setDayOne] = useState();
  const [dayTwo, setDayTwo] = useState();
  const [dayThree, setDayThree] = useState();
  const [dayFour, setDayFour] = useState();
  const [dayFive, setDayFive] = useState();

  useEffect(() => {
    setGoal(props.goal);
  }, [props.goal]);

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
              {goal.private ? "Private Goal " : "Public Goal"}
            </p>
          </div>
          <h3 className="goal-page-title">{goal.name}</h3>
        </div>
        <div className="goal-page-upcomingView">
          <DayCard />
        </div>
      </div>
    </div>
  );
}

export default GoalDetail;
