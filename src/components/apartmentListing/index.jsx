import { useContext, useState } from 'react'
import { AmenitiesContext } from '../../contexts/AmenitiesContextProvider'
import '../../css/ApartmentListing.css'
import "../../css/Calendar.css";
import Calendar from "react-calendar"; // npm i react-calendar
import styled from 'styled-components'
import { UploadImages } from './uploadImages'
import { ApartmentContext } from '../../contexts/ApartmentContextProvider';
import { UserContext } from '../../contexts/UserContextProvider'

const moment = require("moment"); // npm i moment

const Form = styled.form`
margin: 10px auto;
text-align: center;
padding: 10px;
`

const PublishButton = styled.button`
background-color: #2e2b31;
border-radius: 10px;
border: 4px double #cccccc;
color: #eeeeee;
text-align: center;
font-size: 28px;
padding: 20px;
width: 200px;
-webkit-transition: all 0.4s;
-moz-transition: all 0.4s;
-o-transition: all 0.4s;
transition: all 0.4s;
cursor: pointer;
margin: 5px;
justify-content: center;
&:hover {
background-color: rgb(90, 90, 90);
}
`

const ListingDiv = styled.div`
margin-left: 10px;
width: 50%;
`

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
`
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
  const { amenities } = useContext(AmenitiesContext)
  const [values, setValues] = useState(initialValues);
  const { createApartment } = useContext(ApartmentContext)
  const [amenitiesState, setAmenites] = useState([]);
  const [inputFields, setInputFields] = useState([''])
  const [dates, setDates] = useState();
  const { getCurrentUser } = useContext(UserContext)


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
      [name]: value
    })
    if (e.target.checked) {
      array.push(value)
    }
    else {
      for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] == e.target.value) {
          array.splice(i, 1)
        }
      }
    }
  };

  const handleSubmit = () => {
    const notEmptyStrings = []
    inputFields.forEach(item => {
      if (!notEmptyStrings.includes(item) && item !== '') {
        notEmptyStrings.push(item)
      }
      return notEmptyStrings;
    })
    return notEmptyStrings;
  }

  const formValidator = (e) => {
    if (
      values.title === '' ||
      values.description === '' ||
      values.region === '' ||
      values.city === '' ||
      (values.maxGuests > 15 || values.maxGuests < 1) ||
      (values.pricePerDay < 1 || values.pricePerDay > 1000) ||
      !dates ||
      (inputFields[0] === '' && inputFields.length === 1) ||
      values.amenities.length === 0
    ) {
      return true;
    } else return false;
  }

  function createAndPublish(e) {
    e.preventDefault();
    const dateStart = moment(dates[0]).format("YYYY-MM-DD")
    const dateEnd = moment(dates[1]).format("YYYY-MM-DD")

    values.availableDates = { availableStartDate: dateStart, availableEndDate: dateEnd }
    values.ownerId = getCurrentUser()._id;
    values.gallery = handleSubmit();

    console.log(values, 'new apartment ')
    // createApartment(values);
  }

  return (
    <div className="container">
      <Form>
        <ListingDiv>
          <h1>List new Apartment</h1>
          <AptWrap><input
            value={values.title}
            onChange={handleInputChange}
            name="title"
            label="Title"
            placeholder="Title:" /></AptWrap>
          <AptWrap><input
            value={values.description}
            onChange={handleInputChange}
            name="description"
            label="Description"
            placeholder="Description:" /></AptWrap>
          <AptWrap><input
            value={values.region}
            onChange={handleInputChange}
            name="region"
            label="Region"
            placeholder="Region:" /></AptWrap>
          <AptWrap><input
            value={values.City}
            onChange={handleInputChange}
            name="city"
            label="City"
            placeholder="City:" /></AptWrap>
          <AptWrap><input
            value={values.maxGuests}
            onChange={handleInputChange}
            type="number"
            name="maxGuests"
            label="MaxGuests"
            placeholder="Max Guests:" /></AptWrap>
          <AptWrap><input
            value={values.pricePerDay}
            onChange={handleInputChange}
            name="pricePerDay"
            type="number"
            label="PricePerDay"
            placeholder="Price/Day:" /></AptWrap>
        </ListingDiv>

        <div className="container">
          <h5>Amenities: </h5>
          <div className="row">

            {amenities.map(amenitie => {
              return <div className="col-sm-2" key={amenitie._id}>
                <label className="checkboxContainer" >
                  <i className={amenitie.icon} ></i> {amenitie.name}
                  <input
                    value={amenitie._id}
                    onChange={handleAmenities}
                    name="amenities"
                    label="Amenities"
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            })}
          </div>
        </div>

        <Calendar
          minDate={new Date()}
          onChange={onChange}
          value={dates}
          selectRange={true}
        />

        <UploadImages handleSubmit={handleSubmit} inputFields={inputFields} setInputFields={setInputFields} />

        <button disabled={formValidator()} onClick={(e) => {
          handleSubmit();
          createAndPublish(e);
        }}>Publish</button>
      </Form>
    </div>
  )
}
