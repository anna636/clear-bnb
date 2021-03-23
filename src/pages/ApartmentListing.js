import { useContext } from 'react'
import { AmenitiesContext } from '../contexts/AmenitiesContextProvider'
import '../css/ApartmentListing.css'


export default function ApartmentListing() {
    const { amenities } = useContext(AmenitiesContext)

    console.log(amenities)

    return (
        <div>
            <form>
                <div class="listing-div">
                    <h3>List new Apartment</h3>
                    <div class="apartment-input-wrap"><input placeholder="Title:" /></div>
                    <div class="apartment-input-wrap"><input placeholder="Description:" /></div>
                    <div class="apartment-input-wrap"><input placeholder="Region:" /></div>
                    <div class="apartment-input-wrap"><input placeholder="City:" /></div>
                    <div class="apartment-input-wrap"><input placeholder="Max Guests:" /></div>
                    <div class="apartment-input-wrap"><input placeholder="Price/Night:" /></div>
                </div>
                <div className="amenities">
                    <h5>Amenities: </h5>
                    {amenities.map(amenitie => {
                        return <div class="checkbox-wrapper">
                            <label class="checkboxContainer">
                            <i className={amenitie.icon}></i> {amenitie.name}
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    })}
                </div>
            </form>
        </div>
    )
}