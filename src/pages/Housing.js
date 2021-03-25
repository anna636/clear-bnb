import '../css/Housing.css'
import UpperHousingViews from '../components/housingcomps/UpperHousingView'
import HousingListing from '../components/housingcomps/HousingListing'
import React, { useState } from "react";

export default function Housing() {
  const [filterToUse, setFilterToUse] = useState('')
  
  const setFilterFromChild = (filter) => {
    console.log('From parent: ', filter)
    setFilterToUse(filter)
  }

  return (
    <div className="housing-page">
      <UpperHousingViews emittedFilter={ setFilterFromChild }/>
      <div className="vertical-line"></div>
      <HousingListing filterValue={ filterToUse }/>
    </div>
  )
}
