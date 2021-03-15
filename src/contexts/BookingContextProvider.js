import { createContext, useState } from 'react'

// create a reference to this context (to be used with the useContext hook in components)
export const BookingContext = createContext()

export default function BookingContextProvider(props) {

  const [bookings, setBookings] = useState([])

  // storing the dates the user picked from MyCalendar
  const [calendarDates, setCalendarDates] = useState(["test", "yep"])
  const [amountOfGuests, setAmountOfGuests] = useState(1);






  const addCalendarDates = newDates => {
    setCalendarDates(newDates)  
  }

  function addGuests(guests){
    console.log('amount is booking context is', guests);
   
    setAmountOfGuests(guests)
    
    console.log(amountOfGuests);
  }

  

  const updateApartmentDates = async bookedDates => {
    let res = await fetch("/api/update-dates/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookedDates),
    });
    res = await res.json();
    console.log("updating apartment dates ok");
  };
  

  // Sends a new booking to backend which saves it
  const addBooking = async booking => {
    let res = await fetch('/rest/bookings', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(booking)
    })
    res = await res.json();
    
     await updateApartmentDates([calendarDates[0], calendarDates[1]]);
    console.log('id is', res._id)
    
   
  }






  const values = {
    bookings,
    calendarDates,
    addCalendarDates,
    addGuests,
    amountOfGuests,
    addBooking,
    updateApartmentDates,
  };

  return (
    <BookingContext.Provider value={values}>
      {props.children}
    </BookingContext.Provider>
  )


}

