import React, { useEffect } from "react";
import moment from "moment";

function DatePicker(props) {
  useEffect(() => {
    let now = moment();
    document.addEventListener("DOMContentLoaded", function() {
      const options = {
        format: "yyyy-mm-dd",
        default: now,
        setDefaultDate: true
      };
    });
  }, []);

  return (
    <button type="btn" className="btn datepicker">
      Date
    </button>
  );
}

export default DatePicker;
