import "../css/Nav.css";
import LoginModal from './LoginModal'
import { useContext, useState, useRef } from "react";
import MyCalendar from "./MyCalendar";
import { ApartmentContext } from "../contexts/ApartmentContextProvider";
import { UserContext } from "../contexts/UserContextProvider";

export default function Nav() {
  const { apartments } = useContext(ApartmentContext);
  const { user } = useContext(UserContext)
  console.log(user, 'what is here')

  const [showCalendar, setShowCalendar] = useState(false);
  const [loginDisplay, setLoginDisplay] = useState(false);
  const location = useRef();

  const searchLocation = async (e) => {
    e.preventDefault();
    checkLocation() && setShowCalendar(true);
  };

  function checkLocation() {
    let tempBool = false;
    for (const apartment of apartments) {
      if (
        apartment.city.toLowerCase() === location.current.value.toLowerCase() ||
        apartment.region.toLowerCase() === location.current.value.toLowerCase()
      ) {
        tempBool = true;
        break;
      }
    }
    return tempBool;
  }

  function hideCalendar() {
    setShowCalendar(false)
  }

  return (
    <div className="nav">
      <img
        className="nav-logo"
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
            <input
              ref={location}
              required
              type="text"
              placeholder="Enter a location..."
            />
          </form>
          <i className="fas fa-search"></i>
        </div>
      </div>

      <div className="nav-right">

        <div>
          {user &&
            <h5>Welcome, {user.fullName}</h5>
          }
        </div>

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
      <>
        {showCalendar && (
          <div className="calendar-component">
            <div className="mySpan"><span onClick={hideCalendar}>X</span></div>
            <p className="selectDates">Select dates</p>

            <MyCalendar userSearch={location.current.value.toLowerCase()} />
          </div>
        )}
      </>
    </div>
  );
}
