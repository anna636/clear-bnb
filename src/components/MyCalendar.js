import React, { useState, useContext } from 'react'
import { BookingContext } from '../contexts/BookingContextProvider'
import Calendar from 'react-calendar'  // npm i react-calendar
import { useHistory } from 'react-router-dom'
const moment = require("moment");  // npm i moment
import '../css/Calendar.css'

export default function ReactCalendar({ userSearch }) {
  const history = useHistory()
  const [dates, setDates] = useState() // dates is array of 2 dates picked
  const { addCalendarDates } = useContext(BookingContext)

  const onChange = newDate => {
    setDates(newDate)
  }

  function next() {
    const getDatesArray = getDates(dates[0], dates[1])
    console.log(getDatesArray)
    addCalendarDates(getDatesArray)

    history.push('/search/' + userSearch)
  }

  //Function to get array of dates between 2 dates
  function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
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
        value={date}
        selectRange={true}
      />
      <button className="calendarNext" onClick={next}>Next</button>
      <div>
        <p>Just a check that it works: </p>
        {date &&
          date.map((d) => (
            <div key={d.toString()}>
              <h3>{d.toString()}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
