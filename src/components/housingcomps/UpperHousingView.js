import '../../css/UpperHousingView.css'
import {HousingContext} from '../../contexts/HousingContextProvider'
import { useContext } from 'react'

export default function UpperHousingView(props) {
  const {apartments} = useContext(HousingContext);

  return (
    <div className="upper-housing-container">
      <div>
        <p className="upper-housing-view-amount">{apartments.length} boenden</p>
        <h1 className="upper-housing-view-title">Housings</h1>
      </div>
      <div>
        <button className="upper-housing-view-btn">Region</button>
        <button className="upper-housing-view-btn">City</button>
        <button className="upper-housing-view-btn">Price</button>
        <button className="upper-housing-view-btn">Type</button>
      </div>
    </div>
  )
}
