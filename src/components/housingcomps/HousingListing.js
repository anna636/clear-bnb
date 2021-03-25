import {ApartmentContext} from '../../contexts/ApartmentContextProvider'
import { useContext } from 'react'
import '../../css/HousingListing.css'

export default function HousingListing({ filterValue }) {
  const { apartments } = useContext(ApartmentContext)
  

  function truncate(str, length = 200) {
    if(typeof(str) === 'string') {
      let trimmed = str.length > length ? str.substring(0, length - 3) + '...' : str;
      return trimmed;
    }
    
    return '';
  };

  // subcomponent
  const housingObj = housing => (
    <div key={housing._id} className="housing-object">
      <div className="housing-img-container">
        <img className="housing-img" 
             src={housing.gallery[1]} 
             alt=""
        />
      </div>
      <div className="housing-info">
        <div className="housing-info-upper">
          <div>
            <h2><i className="fas fa-map-pin"></i> {housing.city}</h2>
            <h4>{housing.region}</h4>
          </div>
          <div className="renter">
            <h6>{housing.ownerId.fullName}</h6>
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
        <div className="amenities">
              {housing.amenities.map(amenitie => {
                return <h6><i className={amenitie.icon}></i> {amenitie.name}</h6>
              })}
            </div>
        <div className="housing-info-bottom">
          <h6>Max guests: {housing.maxGuests}</h6>
          <div className="housing-description">
            <p>{truncate(housing.description)}</p>
          </div>
          <h5 className="housing-price">Price: {housing.pricePerDay}SEK</h5>
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
