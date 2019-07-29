import React from "react";
import { Link } from "react-router-dom";
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
          <div className="wrapper">
            <div className="navBtnDiv">
              <Link to="/dashboard" className="btn btn-large btn-gold ">
                Login
              </Link>
              <Link to="/profile" className="btn btn-large btn-blue">
                Sign Up
              </Link>
            </div>

            <div className="container">
              <div className="row">
                <div className="col s12 center-align">
                  <div className="title_homePage">
                    <h1>
                      Goal<span className="den">Den</span>
                    </h1>
                    <h5>Share goals & achieve more.</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="teamContainer z-depth-3">
            <div className="row">
              <div className="col s12">
                <h3 className="center-align">
                  <img className="logo" src={logo} alt="Logo" />
                  <br />
                  <span className="brandedText">Our Team</span>
                </h3>
                <div className="row">
                  <div className="col l3 s12">
                    <div className="card">
                      <img
                        className="circle responsive-img teamPic"
                        src={alex}
                        alt="Alex"
                      />
                      <div className="card-stacked">
                        <div className="home-card-content">
                          <p className="picName">Alex</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col l3 s12">
                    <div className="card">
                      <img
                        className="circle responsive-img teamPic"
                        src={hunter}
                        alt="Hunter"
                      />
                      <div className="card-stacked">
                        <div className="home-card-content">
                          <p className="picName">Hunter</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col l3 s12">
                    <div className="card">
                      <img
                        className="circle responsive-img teamPic"
                        src={phil}
                        alt="Phil"
                      />
                      <div className="card-stacked">
                        <div className="home-card-content">
                          <p className="picName">Phil</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col l3 s12">
                    <div className="card">
                      <img
                        className="circle responsive-img teamPic"
                        src={josh}
                        alt="Josh"
                      />
                      <div className="card-stacked">
                        <div className="home-card-content">
                          <p className="picName">Josh</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contactContainer z-depth-3">
            <div className="row">
              <div className="col s8 offset-s2">
                <h3 className="center-align">
                  <span className="brandedText">Contact</span>
                </h3>
                <div className="row">
                  <form
                    action="https://formspree.io/goal.denapp@gmail.com"
                    method="POST"
                  >
                    <div className="input-field">
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                      />
                    </div>
                    <div className="input-field ">
                      <input
                        id="email"
                        type="email"
                        className="form-input"
                        name="_email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="input-field">
                      <textarea
                        id="message"
                        className="materialize-textarea"
                        placeholder="Message"
                        name="message"
                      />
                    </div>
                    <p className="right-align">
                      <button
                        type="submit"
                        className="btn btn-blue"
                        name="action"
                      >
                        Send Message
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {isAuthenticated && <Dashboard />}
    </>
  );
};

export default Home;
