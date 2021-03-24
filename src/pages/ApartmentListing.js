import { useContext } from 'react'
import { AmenitiesContext } from '../contexts/AmenitiesContextProvider'
import '../css/ApartmentListing.css'
import UploadImages from '../components/apartmentListing/UploadImages.js'


export default function ApartmentListing() {
    const { amenities } = useContext(AmenitiesContext)

    console.log(amenities)

    return (
        <div className="container">
            <form>
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
                            return <div className="col-sm-2">
                                <label className="checkboxContainer">
                                    <i className={amenitie.icon}></i> {amenitie.name}
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        })}
                    </div>
                </div>
                <UploadImages />
                <div className="publishButton-container">
                    <button className="publishButton">Publish</button>
                </div>
            </form>
        </div>
    )
}