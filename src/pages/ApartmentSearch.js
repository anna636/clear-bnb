import { useParams } from 'react-router-dom'
import { useContext } from 'react'
// import { useState } from 'react';
import ApartmentList from "../components/ApartmentList";
// import homes from '../components/homecomps/homestest.json';
import { ApartmentContext } from '../contexts/ApartmentContextProvider'


export default function ApartmentSearch() {
  const { city } = useParams()  // Gets city from url

  const { apartments } = useContext(ApartmentContext)

  const apartment = apartments.find(a => a.city === city)[0]

  // const [apartments, setApartments] = useState([homes])  // To be changed to data from backend (with context?)

  

  return (
    <div className="apartment-search">
      <h1>{capitalFirstLetter(city)}</h1>
      <div className="apartment-list">
        <h3>{ apartment.description }</h3>
        {/* {apartments.map((apartment) => (
          <div className="apartment-preview" key={apartment.id}>
            <img src={apartment.img} alt="" />
            <h3>{apartment.type}</h3>
            <p>{apartment.description}</p>
          </div>
        ))} */}
      </div>
      {/* <ApartmentList apartments={apartments.filter((apartment) => apartment.city.toLowerCase() === city)} /> */}
    </div>
  )
}

function capitalFirstLetter(string) { 
  return string.charAt(0).toUpperCase() + string.slice(1);
}