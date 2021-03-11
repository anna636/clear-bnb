import { createContext, useState } from 'react'

// create a reference to this context (to be used with the useContext hook in components)
export const BookingContext = createContext()

export default function BookingContextProvider(props) {

  const [bookings, setBookings] = useState([])

  // storing the dates the user picked from MyCalendar
  const [calendarDates, setCalendarDates] = useState(["test", "yep"])


  const addCalendarDates = newDates => {
    setCalendarDates([...calendarDates, newDates])

    console.log('From bookingcontext, newdates: ', newDates)
    console.log('From bookingcontext: calendarDates: ', calendarDates)
  }

  // Sends a new booking to backend which saves it
  const addBooking = async booking => {
    let res = await fetch('/rest/bookings', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(booking)
    })

    console.log(res)
  }

  const values = {
    bookings,
    calendarDates,
    addCalendarDates
  }

  return (
    <BookingContext.Provider value={values}>
      {props.children}
    </BookingContext.Provider>
  )


}

