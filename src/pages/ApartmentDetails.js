import { useParams, useHistory } from 'react-router-dom'
import { useContext, useState } from 'react'
//import homes from '../components/homecomps/homestest.json';
import { ApartmentContext } from '../contexts/ApartmentContextProvider'
import '../css/DetailPage.css'
import Carousel from "react-bootstrap/Carousel";

export default function ApartmentDetails(props) {

  
  
    const { id } = useParams();
    const { apartments } = useContext(ApartmentContext)
    const history=useHistory()


    let apartment = apartments.find(el => el._id === id)
    
    function goToCheckIn() {
      history.push("/checkin/" + apartment._id);
    }

  return (
    <>
      {Boolean(apartments && apartment) && (
        <>
          {" "}
          <div className="Details">
            <h2>{apartment.city} </h2>
            <p> {apartment.region}</p>

            <div className="gallery">
              <Carousel fade>
                {apartment.gallery.map((picture) => (
                  <Carousel.Item interval={500}>
                    <img src={picture} className="Detail-img" />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <h3 className="description-text">{apartment.description}</h3>
            <p>Property has a capacity of: {apartment.maxGuests} guests</p>
            <p>Price: {apartment.pricePerDay}kr / 24 hours</p>
            <p>The landlord's name: {apartment.ownerId.fullName}</p>
            <div align="right" className="btn-div-details">
              <button className="next-btn-details" onClick={goToCheckIn}>
                Next
              </button>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
}   