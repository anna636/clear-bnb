import { createContext, useState } from 'react'

// create a reference to this context (to be used with the useContext hook in components)
export const BookingContext = createContext()

export default function BookingContextProvider(props) { 

  // Reactive state to store bookings, with empty array as start value
  const [] = useState([])

  // Sends a new booking to backend which saves it
  const addBooking = async booking => { 
    let res = await fetch('/rest/bookings', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(booking)
    })

    console.log(res)
  }


  return (
    <BookingContext.Provider>
      {props.children}
    </BookingContext.Provider>
  )


}

