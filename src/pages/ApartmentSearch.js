import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import ApartmentList from "../components/ApartmentList";
import { ApartmentContext } from '../contexts/ApartmentContextProvider'
import { BookingContext } from '../contexts/BookingContextProvider';


export default function ApartmentSearch() {
  const { city } = useParams()  // Gets location from url

  const { apartments } = useContext(ApartmentContext)

  const { calendarDates } = useContext(BookingContext)


  return (
    <div className="apartment-search">
      <h1>{capitalFirstLetter(city)}</h1>
      <ApartmentList apartments={apartments.filter((apartment) => apartment.city.toLowerCase() === city || apartment.region.toLowerCase() === city)} />
      <h3>**TEST for calendarDates**{calendarDates}</h3>
    </div>
  )
}

function capitalFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}