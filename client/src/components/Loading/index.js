import React from "react";
import loading from "../../assets/loading.svg";
import ripple from "../../assets/Ripple-1s-200px.svg";

const Loading = () => (
  // <div className="spinner">
  //   <img src={loading} alt="Loading" />
  // </div>
  <div className="spinner">
    <img src={ripple} alt="Loading" />
  </div>
);

export default Loading;
