import '../../css/LocationCards.css'

export default function LocationCards() {
  let locations = ['Malmö', 'Stockholm', 'Kristianstad', 'Växjö', 'Jönköping', 'Lund'];

  let card = location => (
    <div className="card" key={Math.random()}>
      <img src="https://i.imgur.com/yEpIfji.jpg"
        alt=""
        className="location-img"
      />
      <h3 className="card-title">{location}</h3>
    </div>
  );

  return (
    <div className="locations">
      <h1>Popular destinations</h1>
      <div className="location-cards">
        {locations.map(location => {
          return card(location);
        })}
      </div>
    </div>
  )
}