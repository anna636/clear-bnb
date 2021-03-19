import "../css/Nav.css";
import LoginModal from './LoginModal'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { useContext, useState, useRef, useEffect } from "react";
import MyCalendar from "./MyCalendar";
import { ApartmentContext } from "../contexts/ApartmentContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { BookingContext } from "../contexts/BookingContextProvider";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

// Prop to MyCalendar component with location from search bar
let locationProp = ""
// Fetches all locations on component mount
let allLocations = []


export default function NavBar() {
  const { addCalendarDates } = useContext(BookingContext);
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

  function navHome() {
    setSearchTerm("")
    setShowDynamicSearch(true)
    setShowCalendar(false)
    addCalendarDates([])
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  return (
    //   <div className="nav">
    //     <Link to="/" onClick={navHome}>
    //       <img
    //         className="nav-logo"
    //         src="https://i.imgur.com/XsXTFPI.png"
    //         alt=""
    //       />
    //     </Link>
    //     <div className="nav-center">
    //       <div className="nav-center-options">
    //         <Link to="/housing-listing">
    //           <h3>Apartments</h3>
    //         </Link>
    //         <Link to="/all-destinations">
    //           <h3>Destinations</h3>
    //         </Link>
    //         <h3>Get started</h3>
    //       </div>

    //       <div className="nav-center-searchbar">
    //         <form onSubmit={searchLocation}>
    //           <input
    //             ref={location}
    //             required
    //             type="text"
    //             placeholder="Enter a location..."
    //             onChange={(e) => { setSearchTerm(e.target.value) }}
    //           />
    //         </form>
    //         <i className="fas fa-search"></i>
    //       </div>
    //       <div className="dynamic-search">
    //         {allLocations.filter((location) => {
    //           if (searchTerm === "") {
    //             return
    //           }
    //           else if (location.toLowerCase().includes(searchTerm.toLowerCase())) {
    //             return location
    //           }
    //         }).map((location, key) => (showDynamicSearch &&
    //           <div className="dynamic-search-value" key={key} onClick={(e) => searchSuggestedLocation(e, location)}>
    //             <p>{location}</p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //     <div className="nav-right">

    //       <div>
    //         {getCurrentUser() &&
    //           <>
    //             <h5>Welcome, {getCurrentUser().fullName}</h5>
    //           </>
    //         }
    //       </div>

    //       {/* <p>Logga in</p> */}
    //       <div className="flex-container">
    //         <button className="login-btn"
    //           onClick={() => {
    //             setLoginDisplay(!loginDisplay)
    //           }}>
    //           <div className="login-btn-icons-container">
    //             <i className="fas fa-bars"></i>
    //             <i className="far fa-user-circle"></i>
    //           </div>
    //         </button>
    //       </div>
    //       {loginDisplay && <LoginModal />}
    //     </div>

    //     <>
    //       {showCalendar && (
    //         <div className="calendar-component">
    //           <div className="mySpan"><span onClick={hideCalendar}>X</span></div>
    //           <p className="selectDates">Select dates</p>

    //           <MyCalendar userSearch={locationProp} />
    //         </div>
    //       )}
    //     </>
    //   </div>
    // );

    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              className="nav-logo"
              src="https://i.imgur.com/XsXTFPI.png"
              alt=""
            />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/housing-listing">Apartments</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/all-destinations">Destinations</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Get Started</a>
              </li>

            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>


  ); // end of return
}
