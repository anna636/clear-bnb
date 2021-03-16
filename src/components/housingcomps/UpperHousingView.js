import '../../css/UpperHousingView.css'
import {HousingContext} from '../../contexts/HousingContextProvider'
import {useContext, useState} from 'react'

export default function UpperHousingView() {
  const [showRegionInput, setRegionDisplay] = useState(false);
  const [showCityInput, setCityDisplay] = useState(false);
  const [showPriceInput, setPriceDisplay] = useState(false);
  const [showTypeInput, setTypeDisplay] = useState(false);
  const {apartments} = useContext(HousingContext);
  let highestPrice = highestPriced();
  let lowestPrice = lowestPriced();

  function highestPriced() {
    let res = apartments.map(apartment => apartment.pricePerDay);
    return (Math.max(...res));
  };

  function lowestPriced() {
    let res = apartments.map(apartment => apartment.pricePerDay);
    return (Math.min(...res));
  };

  /* Subcomponents
     Region input
     City input
     Price input
     Type input
  */

  const regionInput = (
    <div className="filterButtonsDiv">
      <input className="regionInput" placeholder="Search region..."></input>
    </div>
  );
  
  const cityInput = (
    <div className="filterButtonsDiv">
      <input className="cityInput" placeholder="Search city..."></input>
    </div>
  );

  const priceInput = (
    <div className="filterButtonsDiv">
      <input className="priceInput" type="range" min={lowestPrice} max={highestPrice}></input>
    </div>
  );

  const typeInput = (
    <div className="filterButtonsDiv">
      <input className="typeInput" placeholder="Search type..."></input>
    </div>
  );
  
  return (
    <div className="upper-housing-container">
      <div>
        <p className="upper-housing-view-amount">{apartments.length} boenden</p>
        <h1 className="upper-housing-view-title">Housings</h1>
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
        <button
          onClick={() => {setTypeDisplay(!showTypeInput)}} 
          className="upper-housing-view-btn">
          Type
        </button>
        {showRegionInput && regionInput}
        {showCityInput && cityInput}
        {showPriceInput && priceInput}
        {showTypeInput && typeInput}
      </div>
    </div>
  )
}
