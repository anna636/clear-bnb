import '../../css/UpperHousingView.css'
import { ApartmentContext } from '../../contexts/ApartmentContextProvider'
import {useContext, useState, useRef} from 'react'

export default function UpperHousingView(props) {
  const [showRegionInput, setRegionDisplay] = useState(false);
  const [showCityInput, setCityDisplay] = useState(false);
  const [showPriceInput, setPriceDisplay] = useState(false);
  const {apartments} = useContext(ApartmentContext);
  let highestPrice = highestPriced();
  let lowestPrice = lowestPriced();
  const searchInput = useRef();

  function highestPriced() {
    let res = apartments.map(apartment => apartment.pricePerDay);
    return (Math.max(...res));
  };

  function lowestPriced() {
    let res = apartments.map(apartment => apartment.pricePerDay);
    return (Math.min(...res));
  };

  const emit = (e) => {
    e.preventDefault();
    props.emittedFilter(searchInput.current.value)
  }

  const regionInput = (
    <div className="filterButtonsDiv">
      <form onSubmit={ emit }>
        <input className="regionInput"
          placeholder="Search region..."
          ref={ searchInput }
      >
        </input>
      </form>
    </div>
  );
  
  const cityInput = (
    <div className="filterButtonsDiv">
      <form onSubmit={emit}>
      <input className="cityInput"
        placeholder="Search city..."
        ref={searchInput}
        ></input>
      </form>
    </div>
  );

  const priceInput = (
    <div className="filterButtonsDiv">
      <input className="priceInput" type="range" min={lowestPrice} max={highestPrice}></input>
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
          Region
        </button>
        <button
          onClick={() => {setCityDisplay(!showCityInput)}}
          className="upper-housing-view-btn">
          City
        </button>
        <button
          onClick={() => {setPriceDisplay(!showPriceInput)}} 
          className="upper-housing-view-btn">
          Price
        </button>
        {showRegionInput && regionInput}
        {showCityInput && cityInput}
        {showPriceInput && priceInput}
      </div>
    </div>
  )
}
