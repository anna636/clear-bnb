import '../css/Nav.css';

export default function Nav() {
  return (
    <div className="nav">
      <img className="nav-logo"
           /* src="https://cdn.discordapp.com/attachments/815586944222363684/818141369045745706/logo_clearbnb01.jpg" */
           src="https://i.imgur.com/XsXTFPI.png"
           alt=""
      />
      <div className="nav-center">
        <div className="nav-center-options">
          <h3>Boenden</h3>
          <h3>Destinationer</h3>
          <h3>Kom igång</h3>
        </div>
        <div className="nav-center-searchbar">
          <input type="text"/>
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
