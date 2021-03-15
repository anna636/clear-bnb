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
  const { calendarDates, amountOfGuests } = useContext(BookingContext);

  //When clicking on guests div let user change amount of guests
  function changeGuests() {
    history.push("/plusminus/" + apartment._id);
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
                  <p>{calendarDates[1]}</p>
                </div>
              </div>
              <div className="guests">
                <h4>Guests</h4>
                <p onClick={changeGuests}>{amountOfGuests} people</p>
              </div>
            </div>

            <div className="price">
              <p>{apartment.pricePerDay} x 3 nights</p>
              <p className="change">140 euros</p>
              <p>Service fee</p>
              <p className="change">8 euros</p>
            </div>
            <div className="totalPrice">
              <h4>Total</h4>
              <p>140 euros</p>
            </div>

            <button className="reserveButton">Reserve</button>
          </div>
        </div>
      )}
    </>
  );
}
