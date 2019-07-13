import React, { useState, useEffect } from "react";
import M from "materialize-css";
import moment from "moment";

function DatePicker(props) {
  let instance;

  useEffect(() => {
    let now = moment();
    document.addEventListener("DOMContentLoaded", function() {
      const options = {
        format: "yyyy-mm-dd",
        default: now,
        setDefaultDate: true
      };
      console.log(options);
      var elems = document.querySelectorAll(".datepicker");
      instance = M.Datepicker.init(elems, options);
    });
  }, []);

  return (
    <button type="btn" className="btn datepicker">
      Date
    </button>
  );
}

export default DatePicker;
