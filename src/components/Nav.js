import "../css/Nav.css";
import LoginModal from './LoginModal'
import { useContext, useState, useRef, useEffect } from "react";
import MyCalendar from "./MyCalendar";
import { ApartmentContext } from "../contexts/ApartmentContextProvider";
import { UserContext } from "../contexts/UserContextProvider";

// Prop to MyCalendar component with location from search bar
let locationProp = ""
// Fetches all locations on component mount
let allLocations = []


export default function Nav() {
  const { apartments } = useContext(ApartmentContext);
  const { getCurrentUser } = useContext(UserContext)

  const [showCalendar, setShowCalendar] = useState(false);
  const [loginDisplay, setLoginDisplay] = useState(false);
  const [showDynamicSearch, setShowDynamicSearch] = useState(true);
  const location = useRef();
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getAllLocations()
  }, [apartments]);

  useEffect(() => {
    getCurrentUser()
  }, []);

  const searchLocation = async (e) => {
    e.preventDefault();
    locationProp = location.current.value.toLowerCase();
    if (checkLocation(locationProp)) {
      setShowCalendar(true);
      setShowDynamicSearch(false);
    }
  };

  const searchSuggestedLocation = async (e, loc) => {
    locationProp = loc.toLowerCase()
    e.preventDefault();
    setShowDynamicSearch(false);
    setShowCalendar(true);
  };

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

    allLocations = locationsArray
  }

  function checkLocation(location) {
    let tempBool = false;
    for (const apartment of apartments) {
      if (
        apartment.city.toLowerCase() === location ||
        apartment.region.toLowerCase() === location
      ) {
        tempBool = true;
        break;
      }
    }
    return tempBool;
  }

  function hideCalendar() {
    setShowCalendar(false)
    setShowDynamicSearch(false)
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
          {allLocations.filter((location) => {
            if (searchTerm === "") {
              return
            }
            else if (location.toLowerCase().includes(searchTerm.toLowerCase())) {
              return location
            }
          }).map((location, key) => (showDynamicSearch &&
            <div className="dynamic-search-value" key={key} onClick={(e) => searchSuggestedLocation(e, location)}>
              <p>{location}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="nav-right">

        <div>
          {getCurrentUser() &&
            <>
              <h5>Welcome, {getCurrentUser().fullName}</h5>
            </>
          }
        </div>

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

            <MyCalendar userSearch={locationProp} />
          </div>
        )}
      </>
    </div>
  );
}
