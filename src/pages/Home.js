import Banner from '../components/homecomps/Banner'
import CategoryCards from '../components/homecomps/CategoryCards'
import HomesHomepageDisplay from '../components/homecomps/HomesHomepageDisplay'
import LocationCards from '../components/homecomps/LocationsCards'



export default function Home() {
  return (
    <div className="home">
      <Banner />
      <LocationCards />
      <div className="homepage-vertical-line" style={verticalLine}/>
      <CategoryCards />
      <div className="homepage-vertical-line" style={verticalLine}/>
      <HomesHomepageDisplay />
      <div className="homepage-vertical-line" style={verticalLine}/>
    </div>
  );
}

const verticalLine = {
  width: '90%',
  height: '1px',
  margin: '50px auto',
  background: 'rgba(0, 0, 0, 0.1)'
}
