import {useState} from 'react'
import '../css/Nav.css';
import LoginModal from './LoginModal'

export default function Nav() {
  const [loginDisplay, setLoginDisplay] = useState(false);
  
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
        {/* <p>Logga in</p> */}
        <div className="flex-container">
          <button className="login-btn"
                  onClick={() => {
                    setLoginDisplay(!loginDisplay)
                  }}>
            <div className="login-btn-icons-container">
              <i className="fas fa-bars"></i>
              <i className="far fa-user-circle"></i>
            </div>
          </button>
        </div>
        {loginDisplay && <LoginModal />}
      </div>
    </div>
  )
}
