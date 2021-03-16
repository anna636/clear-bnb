import '../../css/HomesHomepageDisplay.css'
import homes from './homestest.json'
import {useContext} from 'react'
import {HousingContext} from '../../contexts/HousingContextProvider'

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
        {/* <h6>{home.rating}</h6> */}
        <h6>{home.ownerId.fullName}</h6>
        <i className="fas fa-user-circle"></i>
        {/* <h4>{home.type}</h4> */}
        <h4>{home.city}</h4>
        <h5>{home.pricePerDay}</h5>
      </div>
    </div>
  );

  return (
    <div className="homes-display">
      <h1>Discover apartments</h1>
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
