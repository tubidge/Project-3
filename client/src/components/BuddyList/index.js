import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
import ChatButton from "../ChatButton";

const BuddyList = props => {
  const [buddies, setBuddies] = useState(props.buddies);

  const getUnique = (arr, comp) => {
    const unique = arr
      .map(e => e[comp])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e]);
    return unique;
  };

  useEffect(() => {
    console.log("======================================");
    console.log(props.buddies);
    console.log(props.channels);
    configChannels();
  }, []);

  const configChannels = () => {
    props.channels.forEach(index => {
      let channel = index;
      console.log(channel);
      buddies.forEach(index => {
        if (index.email === channel.user) {
          return index.channel === channel;
        }
      });
    });
    console.log(buddies);
  };

  return (
    <>
      <section className="buddiesList">
        <ul className="collection with-header">
          <li className="collection-header">
            <h5>Buddies</h5>
            {/* <Link to="/buddies">Search Buddies</Link> */}
            <Link
              to={{
                pathname: "/buddies",
                state: {
                  user: props.userEmail
                }
              }}
            >
              Search Buddies
            </Link>
          </li>
          <span>
            {buddies &&
              buddies.map(buddy => (
                <li key={props.makeid(5)} className="collection-item avatar">
                  <img
                    className="circle responsive-img z-depth-1"
                    src={buddy.image}
                    alt="Profile"
                  />
                  <span className="title">{buddy.username}</span>
                  <p>
                    <Link
                      to={`/buddy-profile/${buddy.buddyId}`}
                      style={{ marginRight: "15px" }}
                    >
                      View Profile
                    </Link>

                    <ChatButton
                      key={buddy.channel}
                      openChannel={props.openChannel}
                      channel={buddy.channel}
                      user={buddy.email}
                    />
                  </p>
                </li>
              ))}
            {!props.buddies && null}
          </span>
        </ul>
      </section>
    </>
  );
};

export default BuddyList;
