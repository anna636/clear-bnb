import { useContext, useState } from 'react'
import { AmenitiesContext } from '../../contexts/AmenitiesContextProvider'
import '../../css/ApartmentListing.css'
import { UploadImages } from './uploadImages'
import { MyCalendar } from './calendar'
import styled from 'styled-components'


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
  gallery: "",
  amenities: "",
  availableDates: "",
  bookedDates: ""
};

export function CreateNewApartment() {
  const { amenities } = useContext(AmenitiesContext)
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


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
          name="maxGuests"
          label="MaxGuests"
          placeholder="Max Guests:" /></AptWrap>
          <AptWrap><input
          value={values.pricePerDay}
          onChange={handleInputChange}
          name="pricePerDay"
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
                  value={values.amenities}
                  onChange={handleInputChange}
                  name="amenities"
                  label="Amenities"
                  type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
            })}
          </div>
        </div>

        <MyCalendar />
        <UploadImages />


        <PublishButton>Publish</PublishButton>
      </Form>
    </div>
  )
}
