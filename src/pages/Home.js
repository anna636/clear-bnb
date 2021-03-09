import Banner from '../components/homecomps/Banner'
import CategoryCards from '../components/homecomps/CategoryCards'
import HomesHomepageDisplay from '../components/homecomps/HomesHomepageDisplay'
import LocationCards from '../components/homecomps/LocationsCards'
import '../css/Home.css'



export default function Home() {
  return (
    <div className="home">
      <Banner />
      <LocationCards />
      <div className="break"></div>
      <CategoryCards />
      <div className="break"></div>
      <HomesHomepageDisplay />
      <div className="break lastbreak"></div>
    </div>
  );
}