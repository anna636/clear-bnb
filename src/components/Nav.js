import '../css/Nav.css';

export default function Nav() {
  return (
    <div className="nav">
      <div className="nav-logo">
        <img
          src="https://i.imgur.com/XsXTFPI.png"
          alt=""
        />
      </div>
      <div className="nav-center">
        <div className="nav-center-options">
          <h3>Boenden</h3>
          <h3>Destinationer</h3>
          <h3>Kom igång</h3>
        </div>
        <div className="nav-center-searchbar">
          <input type="text" placeholder="Start your search" />
          <i className="fas fa-search"></i>
        </div>
      </div>
      <div className="nav-right">
        <p>Logga in</p>
        <i className="far fa-user-circle"></i>
      </div>
    </div>
  )
}
