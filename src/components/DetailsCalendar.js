import "../css/Calendar.css";
import React, { useState, useContext, useEffect } from "react";
import { BookingContext } from "../contexts/BookingContextProvider";
import { ApartmentContext } from '../contexts/ApartmentContextProvider'
import Calendar from "react-calendar"; // npm i react-calendar
import { useHistory } from "react-router-dom";
const moment = require("moment"); // npm i moment


export default function DetailsCalendar({ apartmentId }) {
  const history = useHistory();
  const [dates, setDates] = useState(); // dates is array of 2 dates picked
  const { addCalendarDates, addGuests } = useContext(BookingContext);
  const { calendarDates } = useContext(BookingContext)
  const { getApartmentById, apartment } = useContext(ApartmentContext)


  useEffect(() => {
    getApartmentById(apartmentId)
  }, []);


  const onChange = (newDate) => {
    setDates(newDate);
    console.log(newDate)
  };

  function goToCheckIn() {
    const getDatesArray = getDates(dates[0], dates[1])
    addCalendarDates(getDatesArray)
    addGuests(1);
    history.push("/checkin/" + apartmentId);
  }

  //Function to get array of dates between 2 dates
  function getDates(startDate, stopDate) {
    let tempArray = [];
    let currentDate = moment(startDate);
    let stopDate1 = moment(stopDate);
    while (currentDate <= stopDate1) {
      tempArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }

    // Filters out bookedDates of the apartment
    let datesArray = []
    for (const d of tempArray) {
      if (!apartment.bookedDates.includes(d)) {
        datesArray.push(d)
      }
    }

    console.log(datesArray)

    return datesArray;
  }

  function disabledTiles({ date, view }) {
    if (view === 'month') {
      return apartment.bookedDates.find(d => (d === moment(date).format("YYYY-MM-DD")))
    }
  }

  function convertStringToDate(stringDate) {
    let dateObject = new Date(stringDate + ' 12:00:00')
    return dateObject
  }

  const oneYearFromNow = () => {
    let inAYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    console.log(inAYear)
    return inAYear
  }


  return (
      <>{!calendarDates.length && apartment.bookedDates &&
        <>
          <Calendar
        minDate={apartment.availableDates.length ? convertStringToDate(apartment.availableDates[0].availableStartDate) : new Date()}
        maxDate={apartment.availableDates.length ? convertStringToDate(apartment.availableDates[0].availableEndDate) : oneYearFromNow() }
            onChange={onChange}
            value={dates}
            selectRange={true}
            tileClassName={apartment.bookedDates}
            tileDisabled={disabledTiles}
          />
          <button className="calendarNext" disabled={!dates} onClick={goToCheckIn}>Next</button>
        </>
      }</>
  );
}