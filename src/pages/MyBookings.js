import '../css/MyBookings.css'
import { ApartmentContext } from "../contexts/ApartmentContextProvider";
import { BookingContext } from "../contexts/BookingContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useContext, useState } from "react";

export default function MyBookings() {
  /* const [currentImg, setCurrentImg] = useState(0); */
  const { apartments } = useContext(ApartmentContext);
  const { currentUser, users } = useContext(UserContext);
  const { bookings } = useContext(BookingContext);
  const myBookings = bookings.filter(function(booking){
    return booking.userId._id===currentUser._id;
  });
  
  const Slider = ({booking}) => {
    const [currentImg, setCurrentImg] = useState(0);

    function prevImg(imgGallery) {
      let size = imgGallery.length - 1;
      let currentIndex = currentImg;
      currentIndex--;
      let nextImgIndex = currentIndex;
  
      if(nextImgIndex < 0) {
        setCurrentImg(size);
        return;
      }
  
      setCurrentImg(nextImgIndex);
      console.log("current img index: " + currentImg);
    }

    function nextImg(imgGallery) {
      let size = imgGallery.length - 1;
      let currentIndex = currentImg;
      currentIndex++;
      let nextImgIndex = currentIndex;
  
      if(nextImgIndex > size) {
        setCurrentImg(0);
        return;
      }
  
      setCurrentImg(nextImgIndex);
      console.log(imgGallery);
      console.log("current img index: " + currentImg);
    }
    
    return (
      <div className="apartmentImg">
        <div className="imgslider-btns">
          {/* <button onClick={() => setCurrentImg(currentImg - 1)} className="imgslider-btn-left"></button> */}
          <button onClick={() => prevImg(booking.apartmentId.gallery)} className="imgslider-btn-left"></button>
          {/* <button onClick={() => setCurrentImg(currentImg + 1)} className="imgslider-btn-right"></button> */}
          <button onClick={() => nextImg(booking.apartmentId.gallery)} className="imgslider-btn-right"></button>
        </div>
        <img src={booking.apartmentId.gallery[currentImg]}></img>
      </div>
    );
  }

  const history = useHistory();
  const { id } = useParams();

  function getOwner(ownerId) {
    const owner = users.find(user => user._id === ownerId)
    return owner
  }

  /* function prevImg(imgGallery) {
    let size = imgGallery.length - 1;
    let currentIndex = currentImg;
    currentIndex--;
    let nextImgIndex = currentIndex;

    if(nextImgIndex < 0) {
      setCurrentImg(size);
      return;
    }

    setCurrentImg(nextImgIndex);
    console.log("current img index: " + currentImg);
  }

  function nextImg(imgGallery) {
    let size = imgGallery.length - 1;
    let currentIndex = currentImg;
    currentIndex++;
    let nextImgIndex = currentIndex;

    if(nextImgIndex > size) {
      setCurrentImg(0);
      return;
    }

    setCurrentImg(nextImgIndex);
    console.log(imgGallery);
    console.log("current img index: " + currentImg);
  } */


  return (
    <>
      {bookings && currentUser && users && (
        <div className="mybookings-container">
          <div className="mybookings-top">
            <h1>My bookings</h1>
            <div className="upper-info">
              {myBookings.length > 1 ? <p>You have booking {myBookings.length} objects</p> : <p>You have booking {myBookings.length} objects</p>}
            </div>
          </div>
          <div className="mybookings-listing">
            {myBookings.map((booking) => (
              <div className="booking">
                {/* <div className="apartmentImg">
                  <div className="imgslider-btns">
                    <button onClick={() => prevImg(booking.apartmentId.gallery)} className="imgslider-btn-left"></button>
                    <button onClick={() => nextImg(booking.apartmentId.gallery)} className="imgslider-btn-right"></button>
                  </div>
                  <img src={booking.apartmentId.gallery[currentImg]}></img>
                </div> */}
                <Slider booking={booking}/>
                <div className="booking-object-details">
                  <div className="renter-div infodiv">
                    <p className="description-p">Owner: </p>
                    <div className="ownername-icon">
                      <i className="fas fa-user-circle"></i>
                      <p className="ownername">{getOwner(booking.apartmentId.ownerId).fullName}{" "}</p>
                    </div>
                  </div>
                  <p className="description-p booked-dates-p">Booked dates:</p>
                  <div className="booking-dates infodiv">
                    <p className="checkinout">Check in: <span className="boldspan">{booking.startDate}</span></p>
                    <p className="checkinout">Check out: <span className="boldspan">{booking.endDate}</span></p>
                  </div>
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="apartment-info infodiv">
                    <p>{booking.apartmentId.city}, {booking.apartmentId.city}</p>
                    <p>{booking.apartmentId.pricePerDay}€/night</p>
                  </div>
                  <hr className="line"/>
                  <button onClick={() => history.push("/details/" + booking.apartmentId._id)} className="show-more-btn"> Show me this apartment </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* {bookings && currentUser && users && (
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
      )} */}
    </>
  );
}


