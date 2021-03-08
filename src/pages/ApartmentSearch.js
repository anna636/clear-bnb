import { useParams } from 'react-router-dom'
import { useState } from 'react';
import ApartmentList from "../components/ApartmentList";
import homes from '../components/homecomps/homestest.json';

// Take in all apartments data and filter it as a prop to ApartmentList

export default function ApartmentSearch() {
  const { city } = useParams()
  const [apartments, setApartments] = useState([homes])  // To be changed to data from backend


  return (
    <div className="apartment-search">
      <ApartmentList apartments={apartments.filter((apartment) => apartment.city === city)} />
    </div>
  )
}