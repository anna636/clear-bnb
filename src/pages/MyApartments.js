import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import "../css/MyApartments.css";
import { ApartmentContext } from "../contexts/ApartmentContextProvider";
import { BookingContext } from "../contexts/BookingContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const moment = require("moment"); // npm i moment


export default function MyApartments() {
  const history = useHistory();
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [apartmentId, setApartmentId] = useState("");
  const handleClose = () => setShow(false);
  const { currentUser } = useContext(UserContext);
  const { bookings } = useContext(BookingContext);

  const {
    apartments,
    fetchApartments,
    deleteApartment,
    setCurrentApartmentId,
  } = useContext(ApartmentContext);

  const handleShow = function (id) {
     console.log('apartment id is', id);
     setApartmentId(id);
    setCurrentApartmentId(id);
     setShow(true);
   };


  const myApartments = apartments.filter(function (apartment) {
    return apartment.ownerId._id === currentUser._id;
  });


  const apartmentAmount = apartments.filter(function (apartment) {
    return apartment.ownerId._id === currentUser._id;
  });

  const getRenters = (housingId) => {
    let data = bookings.filter((booking) => {
      return booking.apartmentId.ownerId === currentUser._id;
    });
    data = data.filter((booking) => {
      return booking.apartmentId._id === housingId;
    });
    return data;
  };

  const rentersAmount = async () => await bookings.filter((booking) => {
    return booking.apartmentId.ownerId === currentUser._id;
  });

  const removeApartment = () => {
    let checkBookings = []
    let today = moment(new Date()).format("YYYY-MM-DD")
    console.log(today)
    showDeleteMessage = false;

    bookings.map((booking) => {
      // If there is a booking for this apartment, put booking in checkBookings
      if (booking.apartmentId._id === apartmentId) {
        showDeleteMessage = true
        console.log('wrong alternative');
        checkBookings.push(booking)
        return;
      }
    })

    // If checkBookings is empty, ok to remove
    if (!checkBookings.length) {
        console.log(apartmentId);
        deleteApartment(apartmentId);
        handleClose();
        // fetchApartments();  // check!!
    }
    
  };

  let showDeleteMessage = false;

  useEffect(() => {
    fetchApartments();
  }, []);



  return (
    <>
     
      {Boolean(apartments && !myApartments.length) && (
        <div className="noApartmentsFound">
          <h1>You do not have any apartments for rent</h1>
          <p>Would you like to post a new apartment?</p>
          <button
            className="rentOutApartmentButton"
            onClick={() => history.push("/apartment-listing")}
          >
            Yes let's begin!
          </button>
        </div>
      )}
      {Boolean(apartments && currentUser && myApartments !== null && bookings !== null  ) && (
        <div className="my-apartments-container">
          <div className="my-apartments-top">
            <h1>My apartments</h1>
            <div className="upper-info">
              {apartmentAmount.length > 1 ? (
                <p>You have {apartmentAmount.length} apartments uploaded</p>
              ) : (
                <p>You have {apartmentAmount.length} apartment uploaded</p>
              )}
              {rentersAmount.length > 1 ? (
                <p>You have {rentersAmount.length} bookings</p>
              ) : (
                <p>You have {rentersAmount.length} booking</p>
              )}
            </div>
          </div>
          <div className="apartment-listing-container">
            {myApartments.map((apartment) => (
              <div className="apartment-container">
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Are you sure you want to delete this apartment?
                    </Modal.Title>
                  </Modal.Header>

                  <Modal.Footer>
                    <Button variant="dark" onClick={removeApartment}>
                      Yes, delete
                    </Button>
                    <>{showDeleteMessage &&
                      <label>You can't delete an apartment with active bookings</label>
                    }</>
                  </Modal.Footer>
                </Modal>

                <div className="apartment-top-container">
                  <h1>
                    {apartment.city} - {apartment.region}
                  </h1>
                  <div className="options-btns">
                    <div className="deleteApartment">
                      <span
                        className="trash-icon"
                        onClick={() => {
                          handleShow(apartment._id);
                        }}
                      >
                        🗑️
                      </span>
                    </div>

                    <div className="detailedInfo">
                      <Link to={"/details/" + apartment._id}>
                        <label>details: </label>
                        <i class="far fa-arrow-alt-circle-right myArrow"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="image-gallery">
                  <div className="one-apartment-image">
                    <img className="image1 images" src={apartment.gallery[0]} />
                  </div>
                  <div className="four-apartment-images">
                    <img className="image2 images" src={apartment.gallery[1]} />
                    <img className="image3 images" src={apartment.gallery[2]} />
                    <img className="image4 images" src={apartment.gallery[3]} />
                    <img className="image5 images" src={apartment.gallery[4]} />
                  </div>
                </div>
                <div className="apartment-information">
                  <div>
                    <h2>Details</h2>
                    <hr />
                    {/* <p>{apartment._id}</p>
                    <p>{apartment.description}</p> */}
                    <div className="availability-section">
                      <h4>Availability:</h4>
                      <p>{apartment.availableDates.availableStartDate}</p>-
                      <p>{apartment.availableDates.availableEndDate}</p>
                    </div>
                    <hr />
                    <h2 className="bookings-title">
                      Bookings
                      <span className="booking-amount">
                        ({getRenters(apartment._id).length})
                      </span>
                    </h2>
                    <div className="bookings-section">
                      {/* <h2>Bookings</h2> */}
                      {getRenters(apartment._id).map((booking) => {
                        return (
                          <div className="booking-container">
                            <div>
                              <img
                                className="booking-image"
                                src={booking.apartmentId.gallery[0]}
                              />
                            </div>
                            <div className="booking-information">
                              <div className="wrap">
                                <h6
                                  style={{
                                    fontWeight: 100,
                                    opacity: 0.8,
                                    fontSize: "10px",
                                  }}
                                >
                                  Renter:{" "}
                                </h6>
                                <div className="renter-container">
                                  <i className="fas fa-user-circle"></i>
                                  <p className="inline username-renter">
                                    {booking.userId.fullName}
                                  </p>
                                </div>
                              </div>
                              <div className="wrap">
                                <h6
                                  style={{
                                    fontWeight: 100,
                                    opacity: 0.8,
                                    fontSize: "10px",
                                  }}
                                >
                                  Dates:{" "}
                                </h6>
                                <div className="dates-container">
                                  <h6>
                                    {booking.startDate} - {booking.endDate}
                                  </h6>
                                </div>
                              </div>
                              <div className="wrap">
                                <h6>
                                  {booking.apartmentId.city},{" "}
                                  {booking.apartmentId.region}
                                </h6>
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
