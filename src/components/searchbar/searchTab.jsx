import { useContext, useState, useRef, useEffect } from "react";
import styled from 'styled-components';
import { ApartmentContext } from "../../contexts/ApartmentContextProvider";
import { UserContext } from "../../contexts/UserContextProvider";
import { BookingContext } from "../../contexts/BookingContextProvider";
import MyCalendar from "../MyCalendar";

// Prop to MyCalendar component with location from search bar
let locationProp = ""
// Fetches all locations on component mount
let allLocations = []

export function SearchTab() {
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



  function hideCalendar() {
    setShowCalendar(false)
    setShowDynamicSearch(false)
  }

  const SearchbarContainer = styled.div`
  display: flex;
  width: 40rem;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 999px;
  background-color: white;
  border-bottom: 1px solid rgba(83, 83, 83, 0.5);

  form {
  display: flex;
  width: 100%;
  }

  `

  const InputField = styled.input`
  display: flex;
  border: none;
  outline: none;
  width: 100%;
  padding-left: 10px;
  font-size: 15px;
  font-family: 'Poppins' sans-serif;
  `

  const DynamicSearch = styled.div`
  background-color: yellow;
  width: 300px;
  max-width: 50%;
  font-family: 'Poppins' sans-serif;
  position: fixed;
  top: 120px;
  border-radius: 9px;
  text-align: center;
  `

  const DynamicSearchValue = styled.div`
  margin: 10px;

  &:hover {
  opacity: 0.5;
  cursor: pointer;
  }

  &::last-child {
  margin-bottom: 20px;
  }
  `

  const CalenderComponent = styled.div`
  position: fixed;
  top: 120px;
  text-align: center;
  background-color: white;

  span {
  float: right;
  padding: 2vh;
  cursor: pointer;
  }

  p {
  font-size:30px;
  font-weight: bold;
  padding:2vh;
  }

  `

  return <>
    <SearchbarContainer>
      <form onSubmit={searchLocation}>
        <InputField
          ref={location}
          required
          type="text"
          placeholder="Enter a location..."
          onChange={(e) => { setSearchTerm(e.target.value) }}
        />
      </form>
      <i className="fas fa-search"></i>
    </SearchbarContainer>

    <DynamicSearch>
      {allLocations.filter((location) => {
        if (searchTerm === "") {
          return
        }
        else if (location.toLowerCase().includes(searchTerm.toLowerCase())) {
          return location
        }
      }).map((location, key) => (showDynamicSearch &&
        <DynamicSearchValue key={key} onClick={(e) => searchSuggestedLocation(e, location)}>
          <p>{location}</p>
        </DynamicSearchValue>
      ))}
    </DynamicSearch>

    <>
      {showCalendar && (
        <CalenderComponent>
          <span onClick={hideCalendar}>X</span>
          <p>Select dates</p>

          <MyCalendar userSearch={locationProp} />
        </CalenderComponent>
      )}
    </>


  </>
}
