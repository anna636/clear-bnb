import { useParams } from 'react-router-dom'
import { useState } from 'react';
import ApartmentList from "../components/ApartmentList";
import homes from '../components/homecomps/homestest.json';

// Take in all apartments data and filter it as a prop to ApartmentList

export default function ApartmentSearch() {
  const { city } = useParams()  // Gets city from url
  const [apartments, setApartments] = useState([homes])  // To be changed to data from backend (with context?)

  

  return (
    <div className="apartment-search">
      <h1>{capitalFirstLetter(city)}</h1>
      <ApartmentList apartments={homes.filter((apartment) => apartment.city.toLowerCase() === city)} />
    </div>
  )
}

function capitalFirstLetter(string) { 
  return string.charAt(0).toUpperCase() + string.slice(1);
}