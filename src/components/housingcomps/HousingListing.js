import {HousingContext} from '../../contexts/HousingContextProvider'
import { useContext } from 'react'
import '../../css/HousingListing.css'

export default function HousingListing() {
  const {apartments} = useContext(HousingContext);
  // subcomponent
  const housingObj = housing => (
    <div className="housing-object">
      <div className="housing-img-container">
        <img className="housing-img" 
             src={housing.gallery[1]} 
             alt=""
        />
      </div>
      <div className="housing-info">
        <div className="housing-info-upper">
          <div>
            <h2>{housing.city}</h2>
            <h4>{housing.region}</h4>
          </div>
          <div>
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
        <div className="housing-info-bottom">
          <h6>Max guests: {housing.maxGuests}</h6>
          <div className="housing-description">
            <p>{housing.description}</p>
          </div>
          <h5>Price: {housing.pricePerDay}SEK</h5>
        </div>
      </div>
    </div>
  );

  return (
    <div className="housing-listing-container">
      {apartments.map(housing => {
        return housingObj(housing);
      })}
    </div>
  )
}
