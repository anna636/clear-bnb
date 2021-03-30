import "../css/Destinations.css";
import { useParams, useHistory } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import LocationCards from "../components/homecomps/LocationsCards";
import { ApartmentContext } from '../contexts/ApartmentContextProvider'

export default function AllDestinations() {
  const { apartments } = useContext(ApartmentContext)
  const history = useHistory();

  function getAllLocations() {
    let locationsArray = []
    for (const apartment of apartments) {
      if (!locationsArray.includes(apartment.city)) {
        locationsArray.push(apartment.city)
      }
    }
    return locationsArray;
  }

  useEffect(() => {
    getAllLocations()
  }, []);

  function search(place) {
    history.push("/search/" + place)
    window.scroll(0, 0);
  }

  let card = location => (
    <div className="destinationsCard" key={location}>
      <p className="locationAllDestinations" onClick={() => search(location.toLowerCase())}>{location}</p>
    </div>
  );

  return (
    <>
      <div className="popularDestinations">
        <LocationCards />
      </div>

      <div className="allDestinations">
        <h3>All destinations:</h3>
        <div className="allDestWrapper">
          {getAllLocations() &&
            <>
              {getAllLocations().map(location => {
                return card(location);
              })}
            </>
          }
        </div>
      </div>
    </>

  )
}
