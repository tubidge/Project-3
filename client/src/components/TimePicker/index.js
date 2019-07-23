import React, { useEffect } from "react";
import M from "materialize-css";

function TimePicker(props) {
  useEffect(() => {
    let instance;
    document.addEventListener("DOMContentLoaded", function() {
      const options = {};
      var elems = document.querySelectorAll(".timepicker");
      var instance = M.Timepicker.init(elems, options);
    });
  });

  return (
    <button type="btn" className="btn timepicker">
      Time
    </button>
  );
}

export default TimePicker;
