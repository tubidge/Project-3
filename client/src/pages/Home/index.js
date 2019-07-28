import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { useAuth0 } from "../../react-auth0-spa";
import Dashboard from "../Dashboard";
import josh from "./pics/Josh.jpg";
import alex from "./pics/Alex.jpg";
import hunter from "./pics/Hunter.jpg";
import phil from "./pics/Phil.jpg";
import logo from "../../assets/logo.png";
import "./style.css";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <>
          <div id="homePage">
            <div className="container">
              <div className="row">
                <div className="col s12 center-align">
                  <span className="tagline">
                    Share your Goals & Achieve More
                    <br /> with
                  </span>
                  <h1 className="logo_HomePage">
                    Goal<span className="logo_Den">Den</span>
                  </h1>
                </div>
              </div>
            </div>

            <div className="btns_HomePage">
              <Link to="/dashboard" className="loginBtn btn btn-large">
                Login
              </Link>
              <Link to="/profile" className="signUpBtn btn btn-large">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="teamContainer container">
            <div className="col">
              <h3 className="center-align">
                <img className="logo" src={logo} alt="Logo" />
                <br />
                <span className="brandedText">Our Team</span>
              </h3>
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
          <br />
          <div className="container contactContainer">
            <section id="contact">
              <div className="row">
                <div className="contactCard_HomePage col s12">
                  <h3 className="center-align">
                    <span className="brandedText">Contact</span>
                  </h3>
                  <div className="row">
                    <form
                      action="https://formspree.io/goal.denapp@gmail.com"
                      method="POST"
                      className="col m8 offset-m2 s12"
                    >
                      <div className="row">
                        <div className="input-field col s12">
                          <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Name"
                          />
                        </div>
                        <div className="input-field col s12">
                          <input
                            id="email"
                            type="email"
                            className="form-input"
                            name="_email"
                            placeholder="Email"
                          />
                        </div>
                        <div className="input-field col s12">
                          <textarea
                            id="message"
                            className="materialize-textarea"
                            placeholder="Message"
                            name="message"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col m12">
                          <p className="right-align">
                            <button
                              type="submit"
                              className="btn sendMessage_HomePage"
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
            </section>
          </div>
        </>
      )}
      {isAuthenticated && <Dashboard />}
    </>
  );
};

export default Home;
