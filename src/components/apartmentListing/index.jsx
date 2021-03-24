import { useContext } from 'react'
import { AmenitiesContext } from '../../contexts/AmenitiesContextProvider'
import '../../css/ApartmentListing.css'
import { UploadImages } from './uploadImages'
import { MyCalendar } from './calendar'
import styled from 'styled-components'


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

const Form = styled.form`
margin: 10px auto;
text-align: center;
padding: 10px;
`

export function CreateNewApartment() {
  const { amenities } = useContext(AmenitiesContext)

  return (
    <div className="container">
      <Form>
        <div className="listing-div">
          <h1>List new Apartment</h1>
          <div className="apartment-input-wrap"><input placeholder="Title:" /></div>
          <div className="apartment-input-wrap"><input placeholder="Description:" /></div>
          <div className="apartment-input-wrap"><input placeholder="Region:" /></div>
          <div className="apartment-input-wrap"><input placeholder="City:" /></div>
          <div className="apartment-input-wrap"><input placeholder="Max Guests:" /></div>
          <div className="apartment-input-wrap"><input placeholder="Price/Night:" /></div>
        </div>
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
