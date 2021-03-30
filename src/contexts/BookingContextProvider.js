import { createContext, useState, useEffect } from "react";

// create a reference to this context (to be used with the useContext hook in components)
export const BookingContext = createContext();

export default function BookingContextProvider(props) {
  const [bookings, setBookings] = useState([]);

  // storing the dates the user picked from MyCalendar
  const [calendarDates, setCalendarDates] = useState([]);
  const [amountOfGuests, setAmountOfGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const addCalendarDates = (newDates) => {
    setCalendarDates(newDates);
  };

  const updateTotalPrice = (price) => {
    setTotalPrice(price);
  };

  function addGuests(guests) {
    setAmountOfGuests(guests);
  }
  
  const fetchBookings = async () => {
    let res = await fetch("/rest/bookings");
    res = await res.json();
    setBookings(res);
 
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  const updateApartmentDates = async (bookingInfo) => {
    let res = await fetch("/api/update-dates/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookingInfo),
    });
    res = await res.json();
    console.log("updating apartment dates ok");
  };

  // Sends a new booking to backend which saves it
  const addBooking = async (booking) => {
    let res = await fetch("/rest/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(booking),
    });
    res = await res.json();
  };

  const deleteBooking = async (bookingId) => {
    let res = await fetch("/rest/bookings/" + bookingId, {
      method: "DELETE",
    });
    res = await res.json();
    console.log('booking with id ${bookingId} has been deleted');
  };

  const values = {
    bookings,
    calendarDates,
    addCalendarDates,
    addGuests,
    amountOfGuests,
    addBooking,
    updateApartmentDates,
    updateTotalPrice,
    totalPrice,
    fetchBookings,
    deleteBooking
  };

  return (
    <BookingContext.Provider value={values}>
      {props.children}
    </BookingContext.Provider>
  );
}
