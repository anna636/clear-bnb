import '../css/Nav.css';
import { useRef } from 'react'
import { useHistory } from 'react-router-dom'

export default function Nav() {

  const history = useHistory()

  const location = useRef()

  const searchLocation = async e => {
    e.preventDefault()


    console.log(location.current.value)  // Get what you type in search

    history.push('/search/' + location.current.value)
  }


  return (
    <div className="nav">
      <img className="nav-logo"
        src="https://cdn.discordapp.com/attachments/815586944222363684/818141369045745706/logo_clearbnb01.jpg"
        alt=""
      />
      <div className="nav-center">
        <div className="nav-center-options">
          <h3>Boenden</h3>
          <h3>Destinationer</h3>
          <h3>Kom igång</h3>
        </div>
        <div className="nav-center-searchbar">
          <form onSubmit={searchLocation}>
            <input ref={location} required type="text" placeholder="Enter a location..." />
          </form>
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
