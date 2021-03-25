import { ApartmentContext } from '../../contexts/ApartmentContextProvider'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import '../../css/HousingListing.css'

export default function HousingListing({ filterValue, priceFilter }) {
  const { apartments } = useContext(ApartmentContext)
  const history = useHistory();

  function truncate(str, length = 200) {
    if (typeof (str) === 'string') {
      let trimmed = str.length > length ? str.substring(0, length - 3) + '...' : str;
      return trimmed;
    }

    return '';
  };

  const filterApartments = () => {
    console.log('filterValue: ', filterValue)
    console.log('priceValue:', priceFilter)

    if (filterValue && priceFilter) {
      return apartments.filter((a) => (a.region.toLowerCase() === filterValue || a.city.toLowerCase() === filterValue)
        && a.pricePerDay < priceFilter)
    }
    else if (filterValue) {
      return apartments.filter((a) => a.region.toLowerCase() === filterValue || a.city.toLowerCase() === filterValue)
    }
    else if (priceFilter) {
      return apartments.filter((a) => a.pricePerDay < priceFilter)
    }
    else { return apartments }
   }


  // subcomponent
  const housingObj = housing => (
    <div key={housing._id}
      className="housing-object"
      onClick={() => history.push('/details/' + housing._id)} >
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
          <h5 className="housing-price">Price: {housing.pricePerDay}€</h5>
        </div>
      </div>
    </div>
  );

  return (
    <div className="housing-listing-container">
      {filterApartments().map(housing => {
        return housingObj(housing);
      })}
    </div>
  )
}
