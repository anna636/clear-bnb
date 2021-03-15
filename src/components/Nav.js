import "../css/Nav.css";
import LoginModal from './LoginModal'
import { useContext, useState, useRef } from "react";
import MyCalendar from "./MyCalendar";
import { ApartmentContext } from "../contexts/ApartmentContextProvider";

export default function Nav() {
  const { apartments } = useContext(ApartmentContext);

  const [showCalendar, setShowCalendar] = useState(false);
  const [loginDisplay, setLoginDisplay] = useState(false);
  const location = useRef();

  const allLocations = getAllLocations()  // change so it only updates on component start

  const [searchTerm, setSearchTerm] = useState("")

  const searchLocation = async (e) => {
    e.preventDefault();
    checkLocation() && setShowCalendar(true);
  };

  // Get the names of all cities and regions
  function getAllLocations() {
    let locationsArray = []
    for (const apartment of apartments) {
      if (!locationsArray.includes(apartment.city)) {
        locationsArray.push(apartment.city)
      }
      if (apartment.city !== apartment.region && !locationsArray.includes(apartment.region)) {
        locationsArray.push(apartment.region)
      }
    }
    console.log(...locationsArray)

    return locationsArray
  }


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
              onChange={(e) => { setSearchTerm(e.target.value) }}
            />
          </form>
          <i className="fas fa-search"></i>
        </div>

        <div className="dynamic-search">
          {allLocations.filter((val) => {
            if (searchTerm === "") {
              return
            }
            else if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }
          }).map((val, key) => (
            <div className="dynamic-search-value" key={key}>
              <p>{val}</p>
            </div>
          ))}
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
