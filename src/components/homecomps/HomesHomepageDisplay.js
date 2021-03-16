import '../../css/HomesHomepageDisplay.css'
import homes from './homestest.json'

export default function HomesHomepageDisplay() {
  const card = home => (
    <div className="home-comp-wrapper" key={Math.random()}>
      <div className="home-comp-img">
        <img src={home.img}
          alt=""
          className="home-list-img"
        />
      </div>
      <div className="home-attr">
        <h6>{home.rating}</h6>
        <h6>{home.owner}</h6>
        <i className="fas fa-user-circle"></i>

        <h4>{home.type}</h4>
        <h4> · </h4>
        <h4>{home.city}</h4>
        <h6>{home.subs}</h6>
        <h5>{home.price}</h5>
      </div>
    </div>
  );

  return (
    <div className="homes-display">
      <h1>Discover apartments</h1>
      <div className="home-elements">
        {homes.map(home => {
          return card(home);
        })}
      </div>

    </div>
  )
}
