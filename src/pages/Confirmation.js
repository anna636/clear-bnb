import "../css/Confirmation.css";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { BookingContext } from "../contexts/BookingContextProvider";

export default function Confirmation() {
  const { id } = useParams();
  const history = useHistory();
  const { totalPrice, amountOfGuests, calendarDates } = useContext(
    BookingContext
  );

  return (
    <div className="confirmation">
      <h1> Confirmation</h1>

      <div className="bookingInformation">
        <div className="infoHeader">
          <h3>Booking information</h3>
        </div>

        <p>Total price: {totalPrice} €</p>
        <p>Registered amount of guests: {amountOfGuests}</p>
        <p>Check in:   {calendarDates[0]}</p>
        <p>Check out:   {calendarDates[calendarDates.length - 1]}</p>
      </div>
      <div className="buttonWrapper">
        <button onClick={() => history.push("/")}>Take me to start page</button>
      </div>
    </div>
  );
}
