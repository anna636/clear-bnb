import '../css/MyBookings.css'
import { BookingContext } from "../contexts/BookingContextProvider";
import { UserContext} from "../contexts/UserContextProvider";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useContext, useState, useEffect } from "react";

export default function MyBookings() {
  const { currentUser, users } = useContext(UserContext);
  const { bookings, fetchBookings } = useContext(BookingContext);
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
          <button onClick={() => prevImg(booking.apartmentId.gallery)} className="imgslider-btn-left">
            <i class="fas fa-angle-left"></i>
          </button>
          <button onClick={() => nextImg(booking.apartmentId.gallery)} className="imgslider-btn-right">
            <i class="fas fa-angle-right"></i>
          </button>
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

    useEffect(() => {
      fetchBookings();
    }, []);


  return (
    <>
      {bookings && currentUser && users && (
        <div className="mybookings-container">
          <div className="mybookings-top">
            <h1>My bookings</h1>
            <div className="upper-info">
              {myBookings.length > 1 ? <p>You have {myBookings.length} booking objects</p> : <p>You have {myBookings.length} booking objects</p>}
            </div>
          </div>
          <div className="mybookings-listing">
            {myBookings.map((booking) => (
              <div className="booking">
                <Slider booking={booking}/>
                <div className="booking-object-details">
                  <div className="renters-div infodiv">
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
                  <hr className="hr-line"/>
                  <button onClick={() => history.push("/details/" + booking.apartmentId._id)} className="show-more-btn"> Show me this apartment </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}


