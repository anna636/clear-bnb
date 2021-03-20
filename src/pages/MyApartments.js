import "../css/MyApartments.css";
import { ApartmentContext } from "../contexts/ApartmentContextProvider";
import { BookingContext } from "../contexts/BookingContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

import { useContext, useState } from "react";

export default function MyApartments() {
  const { apartments, setCurrentApartmentId, deleteApartment } = useContext(
    ApartmentContext
  );
  const { currentUser } = useContext(UserContext);

  //For modal
  const [show, setShow] = useState(false);
  const [apartmentId, setApartmentId] = useState("");


  const handleClose = () => setShow(false);

  const handleShow = function (id) {
    setApartmentId(id)
    setCurrentApartmentId(id)
    setShow(true)
  }

  const removeApartment = ()=> {
    deleteApartment(apartmentId);
    handleClose()
  }

  const myApartments = apartments.filter(function (apartment) {
    return apartment.ownerId._id === currentUser._id;
  });

  const history = useHistory();
  const { id } = useParams();

  return (
    <>
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
        <div className="apartmentsWrapper">
          <h1 className="apartmentsHeader">Apartments for rent</h1>

          <div className="apartmentsComp">
            <Modal
              show={show}
              onHide={handleClose}
              animation={false}
              className="custom-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Are you sure you want to delete this apartment?
                </Modal.Title>
              </Modal.Header>

              <Modal.Footer>
                <Button
                  variant="dark"
                  className="custom-btn"
                  onClick={removeApartment}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>

            {myApartments.map((apartment) => (
              <div className="apartmentItem">
                <div className="deleteApartment">
                  <span
                    onClick={() => {
                      handleShow(apartment._id);
                    }}
                  >
                    x
                  </span>
                </div>

                <div
                  className="apartmentImgAndInfo"
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
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
