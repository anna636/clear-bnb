import "../../css/Calendar.css";
import React, { useState, useContext } from "react";
import Calendar from "react-calendar"; // npm i react-calendar
const moment = require("moment"); // npm i moment

export function MyCalendar() {
  const [dates, setDates] = useState();

  const onChange = (newDate) => {
    setDates(newDate);
  };

  function save(e) {
    e.preventDefault();
    const dateStart = moment(dates[0]).format("YYYY-MM-DD")
    const dateEnd = moment(dates[1]).format("YYYY-MM-DD")

    console.log(dateEnd, dateStart, 'start dates')
  }

  return (
    <div className="myCalendar">
      <Calendar
        minDate={new Date()}
        onChange={onChange}
        value={dates}
        selectRange={true}
      />
      <button className="calendarNext" disabled={!dates} onClick={(e) => save(e)}>Save</button>
    </div>
  );
}
