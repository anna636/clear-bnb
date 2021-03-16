import "../css/Calendar.css";
import React, { useState, useContext } from "react";
import { BookingContext } from "../contexts/BookingContextProvider";
import Calendar from "react-calendar"; // npm i react-calendar
import { useHistory } from "react-router-dom";
const moment = require("moment"); // npm i moment

export default function ReactCalendar({ userSearch }) {
  const history = useHistory();
  const [dates, setDates] = useState(); // dates is array of 2 dates picked
  const { addCalendarDates, addGuests } = useContext(BookingContext);

  const onChange = (newDate) => {
    setDates(newDate);
  };

  function next() {
    const getDatesArray = getDates(dates[0], dates[1])
    addCalendarDates(getDatesArray)
    addGuests(1);

    history.push("/search/" + userSearch);
  }

  //Function to get array of dates between 2 dates
  function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate1 = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  }

  return (
    <div className="myCalendar">
      <Calendar
        minDate={new Date()}
        onChange={onChange}
        value={dates}
        selectRange={true}
      />
      <button className="calendarNext" onClick={next}>Next</button>
    </div>
  );
}
