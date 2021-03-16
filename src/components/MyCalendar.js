import "../css/Calendar.css";
import React, { useState, useContext } from 'react'
import { BookingContext } from '../contexts/BookingContextProvider'
import { UserContext } from "../contexts/UserContextProvider";
import Calendar from 'react-calendar'  // npm i react-calendar
import { useHistory } from 'react-router-dom'
import Login from '../components/Login.js'
import Register from '../components/Register.js'
const moment = require("moment");  // npm i moment


export default function ReactCalendar({ userSearch }) {
  const history = useHistory()
  const [dates, setDates] = useState() // dates is array of 2 dates picked
  const { addCalendarDates } = useContext(BookingContext)
  const { user } = useContext(UserContext)
  const [openLogin, setOpenLogin]=useState(false)
  const [openRegister, setOpenRegister]=useState(false)

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
    var stopDate1 = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  }

  return (
    <div className="myCalendar">
      {openLogin && (
        <div className="loginDiv">
          <div className="closeLogin" onClick={() => setOpenLogin(false)}>
            <span>x</span>
          </div>
          <Login />{" "}
        </div>
      )}
      {openRegister && (
        <div className="registerDiv">
          <div className="closeRegister" onClick={() => setOpenRegister(false)}>
            <span>x</span>
          </div>
          <Register />
        </div>
      )}

      <Calendar
        minDate={new Date()}
        onChange={onChange}
        value={dates}
        selectRange={true}
      />
      <>
        {user.fullName && (
          <button className="calendarNext calendarButton" onClick={next}>
            Next
          </button>
        )}
        {!user.fullName && (
          <div>
            <button
              className="calendarLogin calendarButton"
              onClick={() => setOpenLogin(true)}
            >
              Log in
            </button>
            <button
              className="calendarRegister calendarButton"
              onClick={() => setOpenRegister(true)}
            >
              Register
            </button>
          </div>
        )}
      </>
      <div>
        <p>Just a check that it works: </p>
        {dates &&
          dates.map((d) => (
            <div key={d.toString()}>
              <h3>{d.toString()}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
