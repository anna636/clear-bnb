import '../css/Housing.css'
import UpperHousingViews from '../components/housingcomps/UpperHousingView'
import HousingListing from '../components/housingcomps/HousingListing'

export default function Housing() {
  return (
    <div className="housing-page">
      <UpperHousingViews />
      <div className="vertical-line"></div>
      <HousingListing />
    </div>
  )
}
