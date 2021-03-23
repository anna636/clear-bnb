import "../css/Checkin.css";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ApartmentContext } from "../contexts/ApartmentContextProvider";
import { BookingContext } from "../contexts/BookingContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { useHistory } from "react-router-dom";
import Login from "../components/Login.js";
import Register from "../components/Register.js";
import styled from "styled-components";

export default function Checkin() {
  const history = useHistory();
  const { id } = useParams();
  const { apartments } = useContext(ApartmentContext);
  const apartment = apartments.find((el) => el._id === id);
  const { getCurrentUser, currentUser } = useContext(UserContext);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  //Taking choosen dates from calendar
  //service fee is 15% of total price + 5 euros for every new guest
  const {
    calendarDates,
    amountOfGuests,
    addBooking,
    updateApartmentDates,
    updateTotalPrice,
  } = useContext(BookingContext);

  //When clicking on guests div let user change amount of guests
  function changeGuests() {
    history.push("/plusminus/" + apartment._id);
  }

  //Creating new booking object and another object to update apartment bookedDates
  async function createBooking() {
    const newBooking = {
      userId: getCurrentUser()._id,
      apartmentId: id,
      startDate: calendarDates[0],
      endDate: calendarDates[calendarDates.length - 1],
    };

    const bookingInfo = {
      apartmentId: id,
      dates: [calendarDates[0], calendarDates[calendarDates.length - 1]],
    };
    const totalPrice =
      amountOfGuests * 5 +
      apartment.pricePerDay * calendarDates.length * 0.15 +
      apartment.pricePerDay * calendarDates.length;

    updateTotalPrice(totalPrice);
    addBooking(newBooking);
    updateApartmentDates(bookingInfo);
    console.log("new booking is", newBooking);

    history.push("/confirmation/" + apartment._id);
  }

  function checkApartmentOwner() {
    let notMyApartment = true;
    if (getCurrentUser() !== null) {
      console.log("youre logged  in");
      if (apartment.ownerId._id === getCurrentUser()._id) {
        console.log("You are an owner");
        notMyApartment = false;
      }
    }
    console.log('this is not my apartment?',notMyApartment);
    return notMyApartment;
  }

  return (
    <>
      {apartment && (
        <div className="checkin">
          <h1>Your trip</h1>
          {openLogin && (
            <div className="loginWrapper">
              <span onClick={() => setOpenLogin(false)}>x</span>
              <Login />
            </div>
          )}
          {openRegister && (
            <div className="registerWrapper">
              <span onClick={() => setOpenRegister(false)}>x</span>
              <Register />
            </div>
          )}

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
          </div>
          {getCurrentUser() !== null && (
            <button
              className="reserveButton"
              onClick={createBooking}
              disabled={!checkApartmentOwner()}
              style={
                !checkApartmentOwner() ? styles.notAllowed : styles.regular
              }
            >
              Reserve
            </button>
          )}
          {!checkApartmentOwner() && (
            <p className="apartmentWarning">This is your apartment</p>
          )}

          {getCurrentUser() === null && (
            <div className="buttonsWrapper">
              <button
                onClick={() =>
                  openRegister === false ? setOpenLogin(true) : ""
                }
              >
                Log in
              </button>
              <button
                onClick={() =>
                  openLogin === false ? setOpenRegister(true) : ""
                }
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

const styles = {
  notAllowed: {
    cursor: "not-allowed",
    opacity: "40%",
    
  },
  regular: {
    cursor: "pointer",
    opacity: "100%",
  },
};
