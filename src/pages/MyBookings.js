import "../css/MyBookings.css";
import { ApartmentContext } from "../contexts/ApartmentContextProvider";
import { BookingContext } from "../contexts/BookingContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useContext, useState } from "react";

export default function MyBookings() {
  const { currentUser, users } = useContext(UserContext);
  const { bookings } = useContext(BookingContext);
  const myBookings = bookings.filter(function (booking) {
    return booking.userId._id === currentUser._id;
  });

  const bookingHistory = []; //För bokningar som var förut

  const history = useHistory();
  const { id } = useParams();

  function getOwner(ownerId) {
    const owner = users.find((user) => user._id === ownerId);
    return owner;
  }

  //Om datum är mindre en den som är idag pusha booking till hisotry array och ta bort det från myBookings array
  function getDate() {
    myBookings.map((booking) => {
      console.log(booking);

      const todayDate = Date.parse(new Date());
      const bookingDate = Date.parse(booking.endDate);

      if (bookingDate < todayDate && !bookingHistory.includes(booking)) {
        bookingHistory.push(booking);
        myBookings.splice(myBookings.indexOf(booking), 1);
      }
    });
  }

  getDate(); //Kör metoden innan rendering

  return (
    <>
      {Boolean(bookings && currentUser && users) && (
        <div className="bookingsWrapper">
          <h1>My bookings</h1>
          <div className="bookingsComp">
            <div className="upcommingBookings">
            

              {Boolean(myBookings.length) && (
                <>
                  {" "}
                  {myBookings.map((booking) => (
                    <div className="bookingItem">
                      <div className="apartmentImg">
                        <img src={booking.apartmentId.gallery[0]} />
                      </div>

                      <div className="info">
                        <div className="apartmentInfo">
                          <p>City: {booking.apartmentId.city} </p>
                          <p>
                            Price per night: {booking.apartmentId.pricePerDay}{" "}
                            eur
                          </p>

                          <p>
                            Owner:{" "}
                            {getOwner(booking.apartmentId.ownerId).fullName}{" "}
                          </p>
                        </div>
                        <div className="dateInfo">
                          <p>Check-in date: {booking.startDate}</p>
                          <p>Check-out date: {booking.endDate}</p>
                          <div className="buttonWrapperBooking">
                            <button
                              onClick={() =>
                                history.push(
                                  "/details/" + booking.apartmentId._id
                                )
                              }
                            >
                              Show me this apartment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}{" "}
                </>
              )}
            </div>

            {Boolean(bookingHistory.length) && (
              <>
                {" "}
                <div className="historyBookings">
                  <h3>History</h3>
                  {bookingHistory.map((booking) => (
                    <div className="bookingItem">
                      <div className="apartmentImg">
                        <img src={booking.apartmentId.gallery[0]} />
                      </div>

                      <div className="info">
                        <div className="apartmentInfo">
                          <p>City: {booking.apartmentId.city} </p>
                          <p>
                            Price per night: {booking.apartmentId.pricePerDay}{" "}
                            eur
                          </p>

                          <p>
                            Owner:{" "}
                            {getOwner(booking.apartmentId.ownerId).fullName}{" "}
                          </p>
                        </div>
                        <div className="dateInfo">
                          <p>Check-in date: {booking.startDate}</p>
                          <p>Check-out date: {booking.endDate}</p>
                          <div className="buttonWrapperBooking">
                            <button
                              onClick={() =>
                                history.push(
                                  "/details/" + booking.apartmentId._id
                                )
                              }
                            >
                              Show me this apartment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>{" "}
              </>
            )}
          </div>
        </div>
      )}


      {Boolean(
        bookings &&
          currentUser &&
          users &&
          !myBookings.length &&
          !bookingHistory.length
      ) && (
        <div className="bookingsWrapper noBookings">
          <h1>You have no bookings</h1>
        </div>
      )}
    </>
  );
}
