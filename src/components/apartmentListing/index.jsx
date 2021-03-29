import { useContext, useState } from "react";
import { AmenitiesContext } from "../../contexts/AmenitiesContextProvider";
import "../../css/ApartmentListing.css";
import "../../css/Calendar.css";
import Calendar from "react-calendar"; // npm i react-calendar
import styled from "styled-components";
import { UploadImages } from "./uploadImages";
import { ApartmentContext } from "../../contexts/ApartmentContextProvider";
import { UserContext } from "../../contexts/UserContextProvider";
import { useHistory } from "react-router-dom";

const moment = require("moment"); // npm i moment

const Form = styled.form`
  margin: 10px auto;
  text-align: center;
  padding: 10px;
`;

const ListingDiv = styled.div`
  margin: 0 auto;
  max-width: 60%;
`;

const AptWrap = styled.div`
  margin: 25px auto;
  width: 100%;
  height: 10%;
  border: 1px solid lightgray;
  border-radius: 8px;

  input {
    width: 100%;
    margin: 5px auto;
    outline: none;
    border: none;
    padding: px;
  }
`;
const initialValues = {
  ownerId: "",
  title: "",
  pricePerDay: "",
  city: "",
  region: "",
  description: "",
  maxGuests: "",
  amenities: [],
  bookedDates: [],
};

export function CreateNewApartment() {
  const { amenities } = useContext(AmenitiesContext);
  const [values, setValues] = useState(initialValues);
  const { createApartment } = useContext(ApartmentContext);
  const [amenitiesState, setAmenites] = useState([]);
  const [inputFields, setInputFields] = useState([""]);
  const [dates, setDates] = useState();
  const { getCurrentUser } = useContext(UserContext);
  const history = useHistory();

  const onChange = (newDate) => {
    setDates(newDate);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleAmenities = (e) => {
    const { name, value } = e.target;
    let array = values.amenities;
    setAmenites({
      [name]: value,
    });
    if (e.target.checked) {
      array.push(value);
    } else {
      for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] == e.target.value) {
          array.splice(i, 1);
        }
      }
    }
  };

  const handleSubmit = () => {
    const notEmptyStrings = [];
    inputFields.forEach((item) => {
      if (!notEmptyStrings.includes(item) && item !== "") {
        notEmptyStrings.push(item);
      }
      return notEmptyStrings;
    });
    return notEmptyStrings;
  };

  const formValidator = (e) => {
    if (
      values.title === "" ||
      values.description === "" ||
      values.region === "" ||
      values.city === "" ||
      values.maxGuests > 15 ||
      values.maxGuests < 1 ||
      values.pricePerDay < 1 ||
      values.pricePerDay > 1000 ||
      !dates ||
      //values.amenities.length === 0 ||
      (inputFields[0] === "" && inputFields.length === 1) ||
      inputFields.length === 0
    ) {
      return true;
    } else return false;
  };

  function createAndPublish(e) {
    e.preventDefault();
    handleSubmit();
    const dateStart = moment(dates[0]).format("YYYY-MM-DD");
    const dateEnd = moment(dates[1]).format("YYYY-MM-DD");

    values.availableDates = {
      availableStartDate: dateStart,
      availableEndDate: dateEnd,
    };
    values.ownerId = getCurrentUser()._id;
    values.gallery = handleSubmit();

    console.log(values, "new apartment ");
    createApartment(values);
    history.push("/my-apartments/" + getCurrentUser()._id);
  }

  return (
    <div className="container">
      <Form>
        <ListingDiv>
          <h1>List new Apartment</h1>
          <AptWrap>
            <input
              value={values.title}
              onChange={handleInputChange}
              name="title"
              label="Title"
              placeholder="Title:"
            />
          </AptWrap>
          <AptWrap>
            <input
              value={values.description}
              onChange={handleInputChange}
              name="description"
              label="Description"
              placeholder="Description:"
            />
          </AptWrap>
          <AptWrap>
            <input
              value={values.region}
              onChange={handleInputChange}
              name="region"
              label="Region"
              placeholder="Region:"
            />
          </AptWrap>
          <AptWrap>
            <input
              value={values.City}
              onChange={handleInputChange}
              name="city"
              label="City"
              placeholder="City:"
            />
          </AptWrap>
          <AptWrap>
            <input
              value={values.maxGuests}
              onChange={handleInputChange}
              type="number"
              name="maxGuests"
              label="MaxGuests"
              placeholder="Max Guests:"
            />
          </AptWrap>
          <AptWrap>
            <input
              value={values.pricePerDay}
              onChange={handleInputChange}
              name="pricePerDay"
              type="number"
              label="PricePerDay"
              placeholder="Price/Day:"
            />
          </AptWrap>
        </ListingDiv>

        <div className="amenities-wrapper">
          <h5>Amenities: </h5>
          <div className="amenities-container">
            {amenities.map((amenitie) => {
              return (
                <div className="form-check amenities-element" key={amenitie._id}>
                  <label className="checkboxContainer">
                    <input
                      value={amenitie._id}
                      onChange={handleAmenities}
                      name="amenities"
                      label="Amenities"
                      type="checkbox"
                      className="form-check-input"
                    />
                    <span> {amenitie.name} <i className={amenitie.icon}></i></span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="listing-calendar">
          <Calendar
            minDate={new Date()}
            onChange={onChange}
            value={dates}
            selectRange={true}
          />
        </div>

        <UploadImages
          handleSubmit={handleSubmit}
          inputFields={inputFields}
          setInputFields={setInputFields}
        />

        <button
          className="publishButton"
          disabled={formValidator()}
          onClick={(e) => createAndPublish(e)}
        >
          Publish
        </button>
      </Form>
    </div>
  );
}
