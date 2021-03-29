import '../css/Housing.css'
import UpperHousingViews from '../components/housingcomps/UpperHousingView'
import HousingListing from '../components/housingcomps/HousingListing'
import React, { useState, useEffect, useContext} from "react";
import { ApartmentContext } from "../contexts/ApartmentContextProvider";

export default function Housing() {
  const [filterToUse, setFilterToUse] = useState('')
  const [priceFilter, setPriceFilter] = useState('')

  const { fetchApartments } = useContext(ApartmentContext);
  
  
  useEffect(() => {
   
      fetchApartments()
    
  }, []);
  
  const setFilterFromChild = (filter) => {
    setFilterToUse(filter.toLowerCase())
  }

  const setPriceFilterFromChild = (price) => {
    setPriceFilter(price)
  }


  return (
    <div className="housing-page">
      <UpperHousingViews emittedCityRegion={setFilterFromChild} emittedPrice={ setPriceFilterFromChild }/>
      <div className="vertical-line"></div>
      <HousingListing filterValue={filterToUse} priceFilter={ priceFilter }/>
    </div>
  )
}
