import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import ApartmentList from "../components/ApartmentList";
import { ApartmentContext } from '../contexts/ApartmentContextProvider'
import { BookingContext } from '../contexts/BookingContextProvider';

import '../css/ApartmentSearch.css'

export default function ApartmentSearch() {
  const { city } = useParams()  // Gets location from url

  const { apartments } = useContext(ApartmentContext)

  const { calendarDates } = useContext(BookingContext)


  function filterByLocationAndDates(location, allApartments) {

    let filteredByLocationArray = allApartments.filter((apartment) => apartment.city.toLowerCase() === location || apartment.region.toLowerCase() === location)
    let unavailableApartments = []

    for (const apartment of filteredByLocationArray) {
      for (const bookeddate of apartment.bookedDates) {
        if (calendarDates.includes(bookeddate)) {
          unavailableApartments.push(apartment)
          break
        }
      }
    }

    // Maybe add a field to apartment, boolean availableToRent? On a timer..?


    console.log('Unavailable apartments:', unavailableApartments)  // Check that booking filter worked

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