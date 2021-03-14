import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import ApartmentList from "../components/ApartmentList";
import { ApartmentContext } from '../contexts/ApartmentContextProvider'
import { BookingContext } from '../contexts/BookingContextProvider';
const moment = require("moment");  // npm i moment


export default function ApartmentSearch() {
  const { city } = useParams()  // Gets location from url

  const { apartments } = useContext(ApartmentContext)

  const { calendarDates } = useContext(BookingContext)


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


  function filterByLocationAndDates(location, allApartments) {

    let filteredByLocationArray = allApartments.filter((apartment) => apartment.city.toLowerCase() === location || apartment.region.toLowerCase() === location)
    let unavailableApartments = []

    for (const apartment of filteredByLocationArray) {
      for (const bookeddate of apartment.bookedDates) {
        if (calendarDates.includes(bookeddate)) {
          unavailableApartments.push(apartment)
          break  // check this doesn't break whole apartments loop!!
        }
      }
    }

    // Maybe add a field to apartment, boolean availableToRent? On a timer..?


    console.log('Unavailable apartments:', unavailableApartments)

    let filteredByLocationAndDateArray = filteredByLocationArray.filter((ap) => !unavailableApartments.includes(ap))

    return filteredByLocationAndDateArray
  }



  return (
    <div className="apartment-search">
      <h3>{calendarDates[0]} to {calendarDates[calendarDates.length - 1]}</h3>
      <h1>{capitalFirstLetter(city)}</h1>
      <ApartmentList apartments={filterByLocationAndDates(city, apartments)} />
    </div>
  )
}

function capitalFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}