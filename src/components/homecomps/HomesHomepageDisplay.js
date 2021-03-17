import '../../css/HomesHomepageDisplay.css'
import homes from './homestest.json'
import {useContext} from 'react'
import {HousingContext} from '../../contexts/HousingContextProvider'
import {Link} from 'react-router-dom'

export default function HomesHomepageDisplay() {
  const {apartments} = useContext(HousingContext);

  const card = home => (
    <div className="home-comp-wrapper" key={Math.random()}>
      <div className="home-comp-img">
        <img src={home.gallery[0]}
          alt=""
          className="home-list-img"
        />
      </div>
      <div className="home-attr">
        <div className="housing-location-div">
          <h2>{home.city}</h2>
          <h4 className="region"><i class="fas fa-map-marker-alt"></i>{home.region}</h4>
        </div>
        <div className="renter-div">
          <h5>{home.ownerId.fullName}</h5>
          <i className="fas fa-user-circle"></i>
        </div>
      </div>
      <div className="housing-price-div">
        <p className="price-title inline">Price/night: </p>
        <h6 className="inline">{home.pricePerDay} €</h6>
      </div>
    </div>
  );

  return (
    <div className="homes-display">
      <div className="homes-top-container">
        <h1>Discover apartments</h1>
        <Link to="/housing-listing">
          <i className="far fa-arrow-alt-circle-right"></i>
        </Link>
      </div>
      <div className="home-elements">
        {apartments.map((home, i) => {
          while(i < 8) {
            return card(home);  
          }
        })}
      </div>

    </div>
  )
}
