import '../../css/HomesHomepageDisplay.css'
import homes from './homestest.json'

export default function HomesHomepageDisplay() {
  const card = home => (
    <div className="home-comp">
      {/* <img src={home.img}
           alt=""
           className="home-list-img"
      />
      <div className="home-attr">
        <h2>{home.region}</h2>
        <h3>{home.city}</h3>
        <h6>{home.subs}</h6>
        <p>{home.description}</p>
        <h5>{home.price}</h5>
        <h6>{home.rating}</h6>
      </div> */}
      <img src={home.img}
        alt=""
        className="home-list-img"
      />
      <div className="home-attr">
        <h6>{home.rating}</h6>
        <div className="renter">
          <h6>{home.owner}</h6>
          <i className="fas fa-user-circle"></i>
        </div>
        <div className="home-display-cards-info">
          <h4 className="inline">{home.type}</h4>
          <h4 className="inline"> · </h4>
          <h4 className="inline">{home.city}</h4>
          <h6>{home.subs}</h6>
          <h5>{home.price}</h5>
        </div>
      </div>
    </div>
  );

  return (
    <div className="homes-display">
      <div className="homes-display-top">
        <h1>Utforska boenden</h1>
        {/* <i class="fas fa-angle-right"></i> */}
        <i className="far fa-arrow-alt-circle-right"></i>
      </div>
      <div className="homes-display-container">
        {homes.map(home => {
          return card(home);
        })}
      </div>
    </div>
  )
}
