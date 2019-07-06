import React from "react";
import "./style.css";

// // This code may be necessary for some Materialize animation/functionality
// useEffect(() => {
//     // Update the document title using the browser API
//     M.AutoInit();
// });

function GoalsView(props) {
    return (
        <section className="container">
            <div className="row">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s3"><a href="#test1">Category 1</a></li>
                        <li className="tab col s3"><a href="#test2">Category 2</a></li>
                        <li className="tab col s3"><a href="#test3">Category 3</a></li>
                        <li className="tab col s3"><a href="#test4">Category 4</a></li>
                    </ul>
                </div>

                <div id="test1">
                    <div className="col s2">
                        <ul className="goal-tabs">
                            <li className="goal-tab center-align"><a href="#goal1-1">Goal 1</a></li>
                            <li className="goal-tab center-align"><a href="#goal1-2">Goal 2</a></li>
                            <li className="goal-tab center-align"><a href="#goal1-3">Goal 3</a></li>
                        </ul>
                    </div>

                    <div className="col s10 goal-detail">
                        {props.children}
                    </div>
                </div>

                <div id="test2">
                    <div className="col s2">
                        <ul className="goal-tabs">
                            <li className="goal-tab center-align"><a href="#goal2-1">Goal 1</a></li>
                            <li className="goal-tab center-align"><a href="#goal2-2">Goal 2</a></li>
                            <li className="goal-tab center-align"><a href="#goal2-3">Goal 3</a></li>
                        </ul>
                    </div>

                    <div className="col s10 goal-detail">
                        {props.children}
                    </div>
                </div>

                <div id="test3">
                    <div className="col s2">
                        <ul className="goal-tabs">
                            <li className="goal-tab center-align"><a href="#goal3-1">Goal 1</a></li>
                            <li className="goal-tab center-align"><a href="#goal3-2">Goal 2</a></li>
                            <li className="goal-tab center-align"><a href="#goal3-3">Goal 3</a></li>
                        </ul>
                    </div>
                </div>

                <div id="test4">
                    <div className="col s2">
                        <ul className="goal-tabs">
                            <li className="goal-tab center-align"><a href="#goal4-1">Goal 1</a></li>
                            <li className="goal-tab center-align"><a href="#goal4-2">Goal 2</a></li>
                            <li className="goal-tab center-align"><a href="#goal4-3">Goal 3</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Materialize nested tabs not working, leaves sub tab content showing within each tab */}
            {/* <div className="row">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s3"><a href="#test1">Category 1</a></li>
                        <li className="tab col s3"><a href="#test2">Category 2</a></li>
                        <li className="tab col s3"><a href="#test3">Category 3</a></li>
                        <li className="tab col s3"><a href="#test4">Category 4</a></li>
                    </ul>
                </div>

                <div className="row">
                    <div id="test1" className="col s3">
                        <ul className="tabs2">
                            <li className="tab goal-tab center-align"><a href="#goal1-1">Goal 1</a></li>
                            <li className="tab goal-tab center-align"><a href="#goal1-2">Goal 2</a></li>
                            <li className="tab goal-tab center-align"><a href="#goal1-3">Goal 3</a></li>
                        </ul>
                    </div>
                    <div id="goal1-1" className="col s9 goal-detail">Testing Goal 1</div>
                    <div id="goal1-2" className="col s9 goal-detail">Testing Goal 2</div>
                    <div id="goal1-3" className="col s9 goal-detail">Testing Goal 3</div>
                </div>

                <div className="row">
                    <div id="test2" className="col s3">
                        <ul className="tabs3">
                            <li className="tab goal-tab center-align"><a href="#goal2-1">Goal 1</a></li>
                            <li className="tab goal-tab center-align"><a href="#goal2-2">Goal 2</a></li>
                            <li className="tab goal-tab center-align"><a href="#goal2-3">Goal 3</a></li>
                        </ul>
                    </div>
                    <div id="goal2-1" className="col s9 goal-detail">Testing Goal 1</div>
                    <div id="goal2-2" className="col s9 goal-detail">Testing Goal 2</div>
                    <div id="goal2-3" className="col s9 goal-detail">Testing Goal 3</div>
                </div>
                <div id="test3" className="col s12">Test 3</div>
                <div id="test4" className="col s12">Test 4</div>
            </div> */}
        </section >
    )
};

export default GoalsView;