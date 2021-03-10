import '../css/Nav.css';
import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import MyCalendar from './MyCalendar';

export default function Nav() {

  // Dont show calendar if location doesnt exist!! TO DO

  const [showCalendar, setShowCalendar] = useState(false)
  const location = useRef()

  const searchLocation = async e => {
    e.preventDefault()
    setShowCalendar(true)

  }


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
          <form onSubmit={searchLocation}>
            <input ref={location} required type="text" placeholder="Enter a location..." />
          </form>
          <i className="fas fa-search"></i>
        </div>
        <div className="calendar-component">
          {showCalendar && <MyCalendar userSearch={location.current.value.toLowerCase()} />}
        </div>
      </div>
      <div className="nav-right">
        <p>Logga in</p>
        <i className="far fa-user-circle"></i>
      </div>
    </div>
  )
}
