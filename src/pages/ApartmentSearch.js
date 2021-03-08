import ApartmentList from "../components/ApartmentList";
import homes from '../components/homecomps/homestest.json';
import { useState } from 'react';

// Take in all apartments data and filter it as a prop to ApartmentList

export default function ApartmentSearch() {
  const [apartments, setApartments] = useState([homes])


  return (
    <div className="apartment-search">
      <ApartmentList apartments={apartments.filter((apartment) => apartment.city === "Skivarp")} />
    </div>
  )
}