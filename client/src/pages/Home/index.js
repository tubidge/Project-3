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
<<<<<<< HEAD
import phil from "./pics/Labor Day Pic.jpg";
=======
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
import "./style.css";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <>
          <div id="index-banner" className="parallax-container">
            <div className="section">
              <Link
                to="/profile"
                className="login waves-effect amber accent-3 btn right"
              >
                Sign Up
              </Link>
              <Link
                to="/dashboard"
                className=" signUp waves-effect amber accent-3 btn right"
              >
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
                    <hr className="hr amber-text text-accent-3" />
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

          <div className="section" id="purpose">
            <div className="container">
              <h3 className="mb-5 font-weight-bold" id="purposeTitle">
                Our Purpose
              </h3>
              <div className="row d-flex justify-content-center mb-4 purpose">
                <div className="col-md-6">
                  <p className="text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quasi voluptate hic provident nulla repellat facere esse
                    molestiae ipsa labore porro minima quam quaerat rem, natus
                    repudiandae debitis est sit pariatur.
                  </p>
                  <p className="text">
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
          </div>
          <div className="container">
            <div className="section" id="team">
              <div className="col-md-2 mb-5">
                <h3 className="mb-5 font-weight-bold">Our Team</h3>
                <div className="row">
                  <div className="col s3 m3">
                    <div className="card">
                      <div className="card-image">
                        <img src={alex} />
                      </div>
                      <div className="card-stacked">
                        <div className="card-content">
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
                        <div className="card-content">
                          <p className="center">Hunter</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col s3 m3">
                    <div className="card">
                      <div className="card-image">
<<<<<<< HEAD
                        <img src={phil} />
=======
                        <img src={image} />
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
                      </div>
                      <div className="card-stacked">
                        <div className="card-content">
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
                        <div className="card-content">
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
              <div className="col m12 bold text-center white-text">
                <div className="text2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
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
                  <div className="col m12">
                    <h3 className="center-align">Contact</h3>
                    <div className="row">
<<<<<<< HEAD
                      <form
                        method="POST"
                        action="https://formspree.io/goal.denapp@gmail.com"
                      >
                        <div className="row">
                          <div className="input-field col s12">
                            <input
                              name="name"
                              id="name"
                              type="text"
                              placeholder="Name"
                            />
=======
                      <form className="col m8 offset-m2 s12">
                        <div className="row">
                          <div className="input-field col s12">
                            <input id="name" type="text" placeholder="Name">
                              {/* <label for="name">Name</label> */}
                            </input>
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
                          </div>
                          <div className="input-field col s12">
                            <input
                              id="email"
<<<<<<< HEAD
                              name="email"
                              type="email"
                              className="form-input"
                              placeholder="Email"
                            />
                          </div>
                          <div className="input-field col s12">
                            <textarea
                              name="message"
=======
                              type="email"
                              className="form-input"
                              placeholder="Email"
                            >
                              {/* <label for="email">Email</label> */}
                            </input>
                          </div>
                          <div className="input-field col s12">
                            <textarea
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
                              id="message"
                              className="materialize-textarea"
                              placeholder="Message"
                            />
<<<<<<< HEAD
=======
                            {/* <label for="message">Message</label> */}
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
                          </div>
                        </div>
                        <div className="row">
                          <div className="col m12">
                            <p className="right-align">
                              <button
                                className="waves-effect amber accent-3 btn"
<<<<<<< HEAD
                                type="submit"
=======
                                type="button"
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
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
      <Footer />
      {isAuthenticated && <Dashboard />}
      <Footer />
    </>
  );
};

export default Home;
