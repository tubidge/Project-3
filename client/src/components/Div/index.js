import React from "react";
import useChannel from "../../hooks/useChannel";

function Div(props) {
  console.log(props);
  if (props.buddy === undefined) {
    return false;
  } else {
    return useChannel(props);
  }
}

export default Div;
