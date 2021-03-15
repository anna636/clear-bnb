import { useParams } from 'react-router-dom'
import { useContext } from 'react'
//import homes from '../components/homecomps/homestest.json';
import { ApartmentContext } from '../contexts/ApartmentContextProvider'
import '../css/DetailPage.css'

export default function ApartmentDetails(props) {
    const { id } = useParams();
    const { apartments } = useContext(ApartmentContext)

    let apartment = apartments.find(el => el._id === id )
    return(
        <div className="Details">
        <h2>{apartment.city} </h2>
        <p> {apartment.region}</p>
        <img src ={apartment.gallery[0]} className="Detail-img" />
        <h3 className="description-text">{apartment.description}</h3>
        <p>Property has a capacity of: {apartment.maxGuests} guests</p>
        <p>Price: {apartment.pricePerDay}kr / 24 hours</p>
        <p>The landlord's name: {apartment.ownerId.fullName}</p>
        <div align="right" className="btn-div-details">
        <button className="next-btn-details">Next</button>
        </div>
        </div>
    )
}   