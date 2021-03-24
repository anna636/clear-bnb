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

export function CreateNewApartment() {
  const { amenities } = useContext(AmenitiesContext)
  const [title, setTitle] = useState("");


  return (
    <div className="container">
      <Form>
        <ListingDiv>
          <h1>List new Apartment</h1>
          <AptWrap><input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title:" /></AptWrap>
          <AptWrap><input placeholder="Description:" /></AptWrap>
          <AptWrap><input placeholder="Region:" /></AptWrap>
          <AptWrap><input placeholder="City:" /></AptWrap>
          <AptWrap><input placeholder="Max Guests:" /></AptWrap>
          <AptWrap><input placeholder="Price/Night:" /></AptWrap>
        </ListingDiv>

        <div className="container">
          <h5>Amenities: </h5>
          <div className="row">

            {amenities.map(amenitie => {
              return <div className="col-sm-2" key={amenitie._id}>
                <label className="checkboxContainer" >
                  <i className={amenitie.icon} ></i> {amenitie.name}
                  <input type="checkbox" />
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
