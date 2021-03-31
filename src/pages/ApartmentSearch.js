import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import ApartmentList from "../components/ApartmentList";
import { ApartmentContext } from '../contexts/ApartmentContextProvider'
import { BookingContext } from '../contexts/BookingContextProvider';
import '../css/ApartmentSearch.css'

const moment = require("moment"); // npm i moment


export default function ApartmentSearch() {
  const { city } = useParams()  // Gets location from url

  const { apartments } = useContext(ApartmentContext)

  const { calendarDates } = useContext(BookingContext)

  //Function to get array of dates between 2 dates
  function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate1 = moment(stopDate);
    while (currentDate <= stopDate1) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }

    return dateArray;
  }

  function convertStringToDate(stringDate) {
    let dateObject = new Date(stringDate + ' 12:00:00')
    return dateObject
  }

  function filterByLocationAndDates(location, allApartments) {
    let filteredByLocationArray = allApartments.filter((apartment) => apartment.city.toLowerCase() === location || apartment.region.toLowerCase() === location)
    let unavailableApartments = []
    let today = new Date()

    // First check if picked dates are within apartments available dates and that they're not from the past
    for (const apartment of filteredByLocationArray) {
      if ((apartment.availableDates) && (convertStringToDate(apartment.availableDates.availableEndDate) > today)) {
        let availableDatesArray = getDates(apartment.availableDates.availableStartDate, apartment.availableDates.availableEndDate)
        for (const date of calendarDates) {
          if (!availableDatesArray.includes(date)) {
            unavailableApartments.push(apartment)
            break
          }
        }
      }
      else { unavailableApartments.push(apartment) }
    }

    // Then check if picked dates are the same as any of the apartments booked dates
    for (const apartment of filteredByLocationArray) {
      if (unavailableApartments.includes(apartment)) {
        continue
      }
      else {
        for (const bookeddate of apartment.bookedDates) {
          if (calendarDates.includes(bookeddate)) {
            unavailableApartments.push(apartment)
            break
          }
        }
      }
    }

    let filteredByLocationAndDateArray = filteredByLocationArray.filter((ap) => !unavailableApartments.includes(ap))

    return filteredByLocationAndDateArray
  }



  return (
    <div className="apartment-search">
      <div className="dates-title">
        <> {calendarDates.length > 0 &&
          <h3>{calendarDates[0]} to {calendarDates[calendarDates.length - 1]}</h3>
        }</>
        <h1>{capitalFirstLetter(city)}</h1>
      </div>
      <ApartmentList apartments={filterByLocationAndDates(city, apartments)} />
    </div>
  )
}

function capitalFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}