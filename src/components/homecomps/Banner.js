import '../../css/Banner.css'
import { Link } from 'react-router-dom'

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner-info">
        <h2 className="banner-info-title">Book or rent out!</h2>
        <p>
          Don't let the search for accommodation stop you from traveling and
          exploring new destinations.
          <br />
          Plan an exceptional trip with our help.
        </p>
        <Link to="/housing-listing">
          <button className="banner-info-btn">Discover apartments</button>
        </Link>
      </div>
    </div>
  );
}