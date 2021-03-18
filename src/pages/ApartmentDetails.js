import { useParams, useHistory } from 'react-router-dom'
import { useContext } from 'react'
//import homes from '../components/homecomps/homestest.json';
import { ApartmentContext } from '../contexts/ApartmentContextProvider'
import '../css/DetailPage.css'
import DetailsCalendar from '../components/DetailsCalendar'
import { BookingContext } from "../contexts/BookingContextProvider";

export default function ApartmentDetails(props) {
  const history = useHistory()
  const { id } = useParams();
  const { apartments } = useContext(ApartmentContext)
  const { calendarDates } = useContext(BookingContext)
  


  let apartment = apartments.find(el => el._id === id)

  function goToCheckIn() {
    history.push("/checkin/" + apartment._id);
  }

  return (
    <>{apartments.length &&
      <div className="Details">
        <h2>{apartment.city} </h2>
        <p> {apartment.region}</p>
        <img src={apartment.gallery[0]} className="Detail-img" />
        <h3 className="description-text">{apartment.description}</h3>
        <div className="details-icons">
          {apartment.amenities.map((amenity) => (
            <div className="amenities" key={amenity._id} style={{ fontSize: "15px" }, { color: "black" }}>
              <i className={amenity.icon} /> <span>{amenity.name} </span>
            </div>
          ))}
        </div>
        <p>Property has a capacity of: {apartment.maxGuests} guests</p>
        <p>Price: {apartment.pricePerDay}kr / 24 hours</p>
        <p>The landlord's name: {apartment.ownerId.fullName}</p>
        <div className="details-calendar">
          <DetailsCalendar apartmentId={apartment._id} />
      </div>
      <> { (calendarDates.length > 0) &&
        <>
        <div align="right" className="btn-div-details">
          <button className="next-btn-details" onClick={goToCheckIn}>Next</button>
        </div>
      </>
      }</>
      </div>
    }</>
  )
}