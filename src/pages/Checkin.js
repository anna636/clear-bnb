import "../css/Checkin.css";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ApartmentContext } from "../contexts/ApartmentContextProvider";
import { BookingContext } from "../contexts/BookingContextProvider";
import { useHistory } from "react-router-dom";

export default function Checkin() {
  const history = useHistory();
  const { id } = useParams();
  const { apartments } = useContext(ApartmentContext);
  const apartment = apartments.find((el) => el._id === id);

  //Taking choosen dates from calendar
  //service fee is 15% of total price + 5 euros for every new guest
  const { calendarDates, amountOfGuests } = useContext(BookingContext);


  //When clicking on guests div let user change amount of guests
  function changeGuests() {
    history.push("/plusminus/" + apartment._id);
    console.log(calendarDates);
  }

  function createBooking() {
    console.log('id here is', id);
    const newBooking = {
      "userId": "",
      "apartmentId": id,
      "startDate": calendarDates[0],
      "endDate": calendarDates[calendarDates.length-1]
    }
    console.log(newBooking);
  }

  return (
    <>
      {apartment && (
        <div className="checkin">
          <h1>Your trip</h1>
          <div className="tripInformation">
            <div className="datesAndGuests">
              <div className="dates">
                <div className="startDate">
                  <h4>CHECK-IN</h4>
                  <p>{calendarDates[0]}</p>
                </div>
                <div className="endDate">
                  <h4>CHECK-OUT</h4>
                  <p>{calendarDates[calendarDates.length - 1]}</p>
                </div>
              </div>
              <div className="guests">
                <h4>Guests</h4>
                <p onClick={changeGuests}>
                  {amountOfGuests} {amountOfGuests > 1 ? "people" : "person"}
                </p>
              </div>
            </div>

            <div className="price">
              <p className="nightsAndPrice">
                {apartment.pricePerDay} x {calendarDates.length} nights
              </p>
              <p className="change">
                {apartment.pricePerDay * calendarDates.length} €
              </p>
              <p>Service fee</p>
              <p className="change">
                {amountOfGuests * 5 +
                  apartment.pricePerDay * calendarDates.length * 0.15}{" "}
                € 
              </p>
            </div>
            <div className="totalPrice">
              <h4>Total</h4>
              <p>
                {amountOfGuests * 5 +
                  apartment.pricePerDay * calendarDates.length * 0.15 +
                  apartment.pricePerDay * calendarDates.length}{" "}
                €
              </p>
            </div>

            <button className="reserveButton"
             onClick={createBooking}>Reserve</button>
          </div>
        </div>
      )}
    </>
  );
}