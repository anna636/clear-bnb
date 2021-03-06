import '../../css/UpperHousingView.css'
import { ApartmentContext } from '../../contexts/ApartmentContextProvider'
import {useContext, useState, useRef} from 'react'

export default function UpperHousingView(props) {
  const [showRegionInput, setRegionDisplay] = useState(false);
  const [showPriceInput, setPriceDisplay] = useState(false);
  const {apartments} = useContext(ApartmentContext);
  let highestPrice = highestPriced();
  let lowestPrice = lowestPriced();
  const searchInput = useRef();

  const [price, setPrice] = useState("1500")

  function highestPriced() {
    let res = apartments.map(apartment => apartment.pricePerDay);
    return (Math.max(...res));
  };

  function lowestPriced() {
    let res = apartments.map(apartment => apartment.pricePerDay);
    return (Math.min(...res));
  };

  function displayNumberEmit(event) {
    
    try {
      setPrice(event.target.value)
      props.emittedPrice(parseInt(event.target.value))

      if (searchInput) {
        props.emittedCityRegion(searchInput.current.value)
      }
    } catch (e) {}
  }

  const emitCityRegion = (e) => {
    e.preventDefault();
    props.emittedCityRegion(searchInput.current.value)

    if (price) {
      props.emittedPrice(parseInt(price))
    }
  }


  const regionInput = (
    <div className="filterButtonsDiv">
      <form onSubmit={ emitCityRegion }>
        <input className="regionInput"
          placeholder="Search city or region..."
          ref={ searchInput }
      >
        </input>
      </form>
    </div>
  );

  const priceInput = (
    <div className="filterButtonsDiv">
        <input className="priceInput"
          type="range"
          min={lowestPrice}
          max={highestPrice}
          defaultValue={price}
          onChange={ displayNumberEmit }
      ></input>
        <label> {price}€</label>
    </div>
  );

  
  return (
    <div className="upper-housing-container">
      <div>
        <h1 className="upper-housing-view-title">All Apartments</h1>
      </div>
      <div>
        <button
          onClick={() => {setRegionDisplay(!showRegionInput)}}
          className="upper-housing-view-btn">
          City | Region
        </button>
        <button
          onClick={() => {setPriceDisplay(!showPriceInput)}} 
          className="upper-housing-view-btn">
          Price
        </button>
        {showRegionInput && regionInput}
        {showPriceInput && priceInput}
      </div>
    </div>
  )
}
