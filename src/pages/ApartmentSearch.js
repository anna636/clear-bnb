import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import ApartmentList from "../components/ApartmentList";
import { ApartmentContext } from '../contexts/ApartmentContextProvider'
import { BookingContext } from '../contexts/BookingContextProvider';


export default function ApartmentSearch() {
  const { city } = useParams()  // Gets location from url

  const { apartments } = useContext(ApartmentContext)

  const { calendarDates } = useContext(BookingContext)

  function filterByLocation(location, allApartments) {
    let filteredByLocationArray = allApartments.filter((apartment) => apartment.city.toLowerCase() === location || apartment.region.toLowerCase() === location)
    return filteredByLocationArray
  }


  return (
    <div className="apartment-search">
      <h3>{calendarDates[0]} to {calendarDates[calendarDates.length - 1]}</h3>
      <h1>{capitalFirstLetter(city)}</h1>
      <ApartmentList apartments={filterByLocation(city, apartments)} />
    </div>
  )
}

function capitalFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}