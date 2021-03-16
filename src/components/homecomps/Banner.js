import '../../css/Banner.css'

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner-info">
        <h2 className="banner-info-title">Book or rent out!</h2>
        <h4 className="banner-info-text">
          Do not let the search for housing stop you from traveling and
          exploring your destinations.
          <br />
          Plan a different trip with our help.
        </h4>
        <button className="banner-info-btn">Discover apartments</button>
      </div>
    </div>
  );
}