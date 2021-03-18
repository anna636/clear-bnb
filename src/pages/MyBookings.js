import '../css/MyBookings.css'
import { ApartmentContext } from "../contexts/ApartmentContextProvider";
import { BookingContext } from "../contexts/BookingContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useContext, useState } from "react";

export default function MyBookings() {


  const { apartments } = useContext(ApartmentContext);
   const { currentUser, users } = useContext(UserContext);
  const { bookings } = useContext(BookingContext);
  const myBookings = bookings.filter(function(booking){
  return booking.userId._id===currentUser._id;
}); 

    const history = useHistory();
    const { id } = useParams();

  function getOwner(ownerId) {
    const owner = users.find(user => user._id === ownerId)
    return owner
  }


  return (
    <>
      {bookings && currentUser && users && (
        <div className="bookingsWrapper">
          <h1>My bookings</h1>
          <div className="bookingsComp">
            {myBookings.map((booking) => (
              <div className="bookingItem">
                <div className="apartmentImg">
                  <img src={booking.apartmentId.gallery[0]} />
                </div>

                <div className="info">
                  <div className="apartmentInfo">
                    <p>City: {booking.apartmentId.city} </p>
                    <p>
                      Price per night: {booking.apartmentId.pricePerDay} eur
                    </p>

                    <p>
                      Owner: {getOwner(booking.apartmentId.ownerId).fullName}{" "}
                    </p>
                  </div>
                  <div className="dateInfo">
                    <p>Check-in date: {booking.startDate}</p>
                    <p>Check-out date: {booking.endDate}</p>
                    <div className="buttonWrapperBooking">
                    <button onClick={() => history.push("/details/" + booking.apartmentId._id)}>
                        Show me this apartment
                    </button>
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}


