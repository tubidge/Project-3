import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { useAuth0 } from "../../react-auth0-spa";
import Dashboard from "../Dashboard";
import image from "./pics/sea-919042_960_720.jpg";
import image2 from "./pics/stairway-1149473_960_720.jpg";
import josh from "./pics/Josh.jpg";
import alex from "./pics/Alex.jpg";
import hunter from "./pics/Hunter.jpg";
import phil from "./pics/Labor Day Pic.jpg";
import "./style.css";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <>
          <div id="index-banner" className="parallax-container">
            <div className="section">
              <Link to="/profile" className="login waves-effect btn right">
                Sign Up
              </Link>
              <Link to="/dashboard" className=" signUp waves-effectX btn right">
                Login
              </Link>
              <br />
              <br />
              <div className="container">
                <div className="row" />
                <br />
                <br />
                <br />
                <div className="row">
                  <div className="col s4" />
                  <div className="col s4">
                    <hr className="hr" />
                  </div>
                  <div className="col s4" />
                </div>
                <div className="row">
                  <div className="center" id="title">
                    GoalDen
                  </div>
                  <div className="center summary">
                    A new app that helps hold you accountable to achieve your
                    goals.
                  </div>
                </div>
              </div>
            </div>

            <div className="parallax">
              <img className="people" src={image} />
              <div className="shade" />
            </div>
          </div>

          {/* <div className="section" id="purpose">
            <div className="container">
              <h3 className="mb-5 font-weight-bold" id="purposeTitle">
                Our Purpose
              </h3>
              <div className="row d-flex justify-content-center mb-4 purpose">
                <div className="col-md-6">
                  <p className="home-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quasi voluptate hic provident nulla repellat facere esse
                    molestiae ipsa labore porro minima quam quaerat rem, natus
                    repudiandae debitis est sit pariatur.
                  </p>
                  <p className="home-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quasi voluptate hic provident nulla repellat facere esse
                    molestiae ipsa labore porro minima quam quaerat rem, natus
                    repudiandae debitis est sit pariatur. Lorem ipsum dolor sit
                    amet, consectetur adipisicing elit. Quasi voluptate hic
                    provident nulla repellat facere esse molestiae ipsa labore
                    porro minima quam quaerat rem, natus repudiandae debitis est
                    sit pariatur.
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          <div className="team container">
            <div className="section" id="team">
              <div className="col-md-2 mb-5">
                <h3 className="team-text mb-5 font-weight-bold">Our Team</h3>
                <div className="row">
                  <div className="col s3 m3">
                    <div className="card">
                      <div className="card-image">
                        <img src={alex} />
                      </div>
                      <div className="card-stacked">
                        <div className="home-card-content">
                          <p className="center">Alex</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col s3 m3">
                    <div className="card">
                      <div className="card-image">
                        <img src={hunter} />
                      </div>
                      <div className="card-stacked">
                        <div className="home-card-content">
                          <p className="center">Hunter</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col s3 m3">
                    <div className="card">
                      <div className="card-image">
                        <img src={phil} />
                      </div>
                      <div className="card-stacked">
                        <div className="home-card-content">
                          <p className="center">Phil</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col s3 m3">
                    <div className="card">
                      <div className="card-image">
                        <img src={josh} />
                      </div>
                      <div className="card-stacked">
                        <div className="home-card-content">
                          <p className="center">Josh</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="parallax-container valign-wrapper">
            <div className="row" id="quote">
              <div className="container">
                <div className="col m12 bold text-center white-text">
                  <div className="text2">
                    "I love GoalDen! I am finally able to hold myself
                    accountable using this app. I really like that it tracks my
                    progress and that the calendar reminds me which milestones I
                    have that day to reach my goals." -Heather W.
                  </div>
                </div>
              </div>
            </div>
            <div className="parallax">
              <img className="bridge" src={image2} />
            </div>
          </div>
          <br />
          <div className="container">
            <section id="contact">
              <div className="col-md-4 mb-1">
                <div className="row">
                  <div className="contact-card col m12">
                    <h3 className="center-align">Contact</h3>
                    <div className="row">
                      <form className="col m8 offset-m2 s12">
                        <div className="row">
                          <div className="input-field col s12">
                            <input id="name" type="text" placeholder="Name">
                              {/* <label for="name">Name</label> */}
                            </input>
                          </div>
                          <div className="input-field col s12">
                            <input
                              id="email"
                              type="email"
                              className="form-input"
                              placeholder="Email"
                            >
                              {/* <label for="email">Email</label> */}
                            </input>
                          </div>
                          <div className="input-field col s12">
                            <textarea
                              id="message"
                              className="materialize-textarea"
                              placeholder="Message"
                            />
                            {/* <label for="message">Message</label> */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col m12">
                            <p className="right-align">
                              <button
                                className="home-buttons waves-effect btn"
                                type="button"
                                name="action"
                              >
                                Send Message
                              </button>
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
      {isAuthenticated && <Dashboard />}
      <Footer />
    </>
  );
};

export default Home;
