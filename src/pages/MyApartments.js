import '../css/MyApartments.css'
import { ApartmentContext } from "../contexts/ApartmentContextProvider";
import { BookingContext } from "../contexts/BookingContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useContext } from "react";

export default function MyApartments() {
  
  const { apartments } = useContext(ApartmentContext);
  const { currentUser} = useContext(UserContext);
  const {bookings} = useContext(BookingContext);
  
  const myApartments = apartments.filter(function (apartment) {
    return apartment.ownerId._id === currentUser._id;
  });

  /* const rented = bookings.filter(booking => {
    return booking.apartmentId.ownerId === currentUser._id;
  });

  console.log(rented); */

  /* const test = bookings.filter(booking => {
    return booking.apartmentId.ownerId === currentUser._id;
  });

  console.log(test); */

  const getRenters = (housingId) => {
    let data = bookings.filter(booking => {
      return booking.apartmentId.ownerId === currentUser._id;
    });

    data = data.filter(booking => {
      return booking.apartmentId._id === housingId;
    });

    return data;
  }

  /* let test = getRenters('604b43fa6b715a316c048f3f');
  console.log(test); */

  /* function rented(housingId) {
    let data = bookings.filter(booking => {
      return booking.apartmentId.ownerId === currentUser._id;
    });
    
    data = data.filter(function(booking) {
      return booking.apartmentId._id === housingId;
    });

    return data;
  }; */

  /* const getRenters = (housingId) => {
    let data = bookings.filter(function(booking) {
      return booking.apartmentId.ownerId === currentUser._id;
    });
    
    data = data.filter(booking => {
      return booking.apartmentId._id === housingId;
    });

    return data;
  }
  
  let test = getRenters('604b7c6e11fc215c4764f81d');
  console.log(test); */

  /* let test = rented('604b7c6e11fc215c4764f81d');
  console.log(test); */

  /* const testing = bookings.map(booking => {
    return booking.apartmentId.ownerId;
  });

  console.log(testing); */

  /* 
    Detta skriver ut alla booking objekt id
  const test = bookings.map(booking => {
    return booking.userId._id;
  });

  console.log(test); */

  const history = useHistory();
  const { id } = useParams();



  return (
    <>
      {apartments && !myApartments.length && (
        <div className="noApartmentsFound">
          <h1>You do not have any apartment for rent</h1>
          <p>Would you like to post a new apartment?</p>
          <button className="rentOutApartmentButton" onClick={() => history.push("/rest/postNewApartment")}>Yes let's begin!</button>
        </div>
      )}

      {Boolean(apartments && currentUser && myApartments.length) && (
        <div className="apartmentsWrapper">
          <h1 className="apartmentsHeader">Apartments for rent</h1>

          <div className="apartmentsComp">
            {myApartments.map((apartment) => (
              <div
                className="apartmentItem"
                onClick={() => history.push("/details/" + apartment._id)}
              >
                <img className="rentOutImage" src={apartment.gallery[0]} />

                <div className="apartmentInfoRent">
                  <p>Dates: </p>
                  <p>From {apartment.availableDates.availableStartDate}</p>
                  <p>To {apartment.availableDates.availableEndDate}</p>
                  <p>City: {apartment.city}</p>
                  <p>
                    Amount of guests allowed: {apartment.maxGuests}{" "}
                    {apartment.maxGuests > 1 ? "people" : "person"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
<<<<<<< HEAD
      )} */}

      {Boolean(apartments && currentUser && myApartments.length) && (
        <div className="my-apartments-container">
          <div className="my-apartments-top">
            <h1>My apartments</h1>
          </div>
          <div className="apartment-listing-container">
            {myApartments.map((apartment) => (
              <div className="apartment-container">
                <div className="apartment-top-container">
                  <h1>{apartment.city} - {apartment.region}</h1>
                </div>
                <div className="image-gallery">
                  <div className="one-apartment-image">
                    <img className="image1 images" src={apartment.gallery[0]}/>
                  </div>
                  <div className="four-apartment-images">
                    <img className="image2 images" src={apartment.gallery[1]}/>
                    <img className="image3 images" src={apartment.gallery[2]}/>
                    <img className="image4 images" src={apartment.gallery[3]}/>
                    <img className="image5 images" src={apartment.gallery[4]}/>
                  </div>
                </div>
                <div className="apartment-information">
                  <div>
                    <h2>Details</h2>
                    <hr/>
                    {/* <p>{apartment._id}</p>
                    <p>{apartment.description}</p> */}
                    <div className="availability-section">
                      <h4>Availability:</h4>
                      <p>{apartment.availableDates.availableStartDate}</p>
                      -
                      <p>{apartment.availableDates.availableEndDate}</p>
                    </div>
                    <hr/>
                    <h2 className="bookings-title">Bookings<span className="booking-amount">({getRenters(apartment._id).length})</span></h2>
                    <div className="bookings-section">
                      {/* <h2>Bookings</h2> */}
                      {getRenters(apartment._id).map(booking => {
                        return <div className="booking-container">
                                 <div>
                                   <img
                                      className="booking-image" 
                                      src={booking.apartmentId.gallery[0]}/>
                                 </div>
                                 <div className="booking-information">
                                    <div className="wrap">
                                      <h6 style={{"fontWeight": 100, "opacity": 0.8, "fontSize": "10px"}}>Renter: </h6>
                                      <div className="renter-container">
                                        <i class="fas fa-user-circle"></i>
                                        <p className="inline username-renter">{booking.userId.fullName}</p>
                                      </div>
                                    </div>
                                    <div className="wrap">
                                      <h6 style={{"fontWeight": 100, "opacity": 0.8, "fontSize": "10px"}}>Dates: </h6>
                                      <div className="dates-container">
                                        <h6 >{booking.startDate} - {booking.endDate}</h6>
                                      </div>
                                    </div>
                                    <div className="wrap"> 
                                      <h6>{booking.apartmentId.city}, {booking.apartmentId.region}</h6>
                                    </div>
                                 </div>
                               </div>
                      })
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
=======
>>>>>>> parent of 2c52e2b (beginning redesign)
      )}
    </>
  );
}

