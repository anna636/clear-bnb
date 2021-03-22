import '../css/ApartmentListing.css'

export default function ApartmentListing(){


    return(
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
                <div class="checkboxes-div">
                <div class="ameneties-div"><p>Amenities:</p></div>
                    <div class ="checkbox-wrapper">
                    <label class="container">
                        <input type="checkbox" />
                        <span class="checkmark">Bathtub</span>
                    </label>
                    </div>
                    <div class ="checkbox-wrapper">
                    <label class="container">
                        <input type="checkbox" />
                        <span class="checkmark">Wifi</span>
                    </label>
                    </div>
                    <div class ="checkbox-wrapper">
                    <label class="container">
                        <input type="checkbox" />
                        <span class="checkmark">Dedicated Workspace</span>
                    </label>
                    </div>
                    <div class ="checkbox-wrapper">
                    <label class="container">
                        <input type="checkbox" />
                        <span class="checkmark">Essentials</span>
                    </label>
                    </div>
                    <div class ="checkbox-wrapper">
                    <label class="container">
                        <input type="checkbox" />
                        <span class="checkmark">Private Entrance</span>
                    </label>
                    </div>
                    <div class ="checkbox-wrapper">
                    <label class="container">
                        <input type="checkbox" />
                        <span class="checkmark">Breakfast</span>
                    </label>
                    </div>
                    <div class ="checkbox-wrapper">
                    <label class="container">
                        <input type="checkbox" />
                        <span class="checkmark">TV</span>
                    </label>
                    </div>
                    <div class ="checkbox-wrapper">
                    <label class="container">
                        <input type="checkbox" />
                        <span class="checkmark">Air Conditioning</span>
                    </label>
                    </div>
                    <div class ="checkbox-wrapper">
                    <label class="container">
                        <input type="checkbox" />
                        <span class="checkmark">Smoke Alarm</span>
                    </label>
                    </div>
                    <div class ="checkbox-wrapper">
                    <label class="container">
                        <input type="checkbox" />
                        <span class="checkmark">Kitchen</span>
                    </label>
                    </div>
                    <div class ="checkbox-wrapper">
                    <label class="container">
                        <input type="checkbox" />
                        <span class="checkmark">CCTV</span>
                    </label>
                    </div>
                 
                </div>

            </form>
        </div>
    )
}