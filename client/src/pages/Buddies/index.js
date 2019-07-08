import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Autocomplete} from "react-materialize"
import { useAuth0 } from "../../react-auth0-spa";
import API from "../../utils/API";
import Loading from "../../components/Loading";
import "./style.css";

const Buddies = () => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const data = {
    data: 
    {
      "Gus Fring": null,
      "Saul Goodman": null,
      "Tuco Salamanca": 'https://placehold.it/250x250'
    }
  }

  useEffect(() => {
    API.getAllUsers().then(res => {
      console.log(res.data);
      setUsers(res.data);
      setIsLoading(false);
    });
  }, []);

  if (loading || !users || isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h1 className="text-center">Search for Buddies</h1>
      <Autocomplete options={data} placeholder="username" />
      <div className="row">
        <div className="col-sm-6 mx-auto">
              <div className="input-field mb-3">
                        <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Check to see if any items are found*/}
        {users.length ? (
          <>
            <ul className="collection">
              {users.map(user => (
                <li key={user.id} className="collection-item avatar">
                  <img
                    src={user.image}
                    alt={user.username}
                    className="circle responsive-img"
                  />
                  <span className="title">{user.username}</span>
                  <p>{`${user.firstName} ${user.lastName}`}</p>
                  <Link to="#">View Profile</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </div>
    </div>
  );
};

export default Buddies;
