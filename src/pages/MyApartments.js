import "../css/MyApartments.css";
import { ApartmentContext } from "../contexts/ApartmentContextProvider";
import { BookingContext } from "../contexts/BookingContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useContext, useEffect, useState } from "react";

export default function MyApartments() {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const { apartments, fetchApartments } = useContext(ApartmentContext);
  const { currentUser } = useContext(UserContext);
  const { bookings } = useContext(BookingContext);

  const myApartments = apartments.filter(function (apartment) {
    return apartment.ownerId._id === currentUser._id;
  });

  useEffect(() => {
    fetchApartments();
  }, []);

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

  const rentersAmount = bookings.filter((booking) => {
    return booking.apartmentId.ownerId === currentUser._id;
  });


  function deleteApartment(e) {
    e.preventDefault()
    console.log('clicked');
    handleClose()

    
  }
  

  const history = useHistory();
  const { id } = useParams();

  return (
    <>
      {
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              Are you sure you want to delete this apartment?
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="dark" onClick={deleteApartment}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      }
      {apartments && !myApartments.length && (
        <div className="noApartmentsFound">
          <h1>You do not have any apartment for rent</h1>
          <p>Would you like to post a new apartment?</p>
          <button
            className="rentOutApartmentButton"
            onClick={() => history.push("/rest/postNewApartment")}
          >
            Yes let's begin!
          </button>
        </div>
      )}
      {Boolean(apartments && currentUser && myApartments.length) && (
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
                <div className="apartment-top-container">
                  <h1>
                    {apartment.city} - {apartment.region}
                  </h1>
                  <div className="options-btns">
                    <div className="deleteApartment">
                      <label>
                        <i
                          class="fas fa-trash-alt myTrash"
                          onClick={handleShow}
                        ></i>
                      </label>
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
                                  <i class="fas fa-user-circle"></i>
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
