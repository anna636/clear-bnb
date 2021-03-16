import '../../css/LocationCards.css'

export default function LocationCards() {
  let locations = [{ place: 'Malmö', url: 'https://www.ktchnrebel.com/wp-content/uploads/2019/03/malm%C3%B6_schweden_for_KTCHNrebel_-copyright_Fotolia_Charlotte-2.jpg' },
  { place: 'Paris', url: 'https://luxebeatmag.com/wp-content/uploads/2018/02/Tour-Eiffel-illuminee-depuis-Champs-de-Mars-%C2%A9-E.Li_.jpeg' },
  { place: 'New York', url: 'https://www.nyhabitat.com/blog/wp-content/uploads/2019/09/NYC-fall-season-event-guide-2019-Chelsea-autumn-sunset.jpg' },
  { place: 'Moskva', url: 'https://www.planete-energies.com/sites/default/files/thumbnails/image/moscou.jpg' },
  { place: 'Stockholm', url: 'https://passport-cdn.kiwicollection.com/blog/drive/uploads/2018/04/Stockholm_feature.jpg' },
  { place: 'Lund', url: 'https://i1.wp.com/www.mymorningtravelguide.com/wp-content/uploads/2016/11/NIK_9178-2.jpg?fit=4297%2C2846' }];

  let card = location => (
    <div className="card" key={location.place}>
      <img src={location.url}
        alt=""
        className="location-img"
      />
      <h3 className="card-title">{location.place}</h3>
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