import Banner from "../components/homecomps/Banner";
import HomesHomepageDisplay from "../components/homecomps/HomesHomepageDisplay";
import LocationCards from "../components/homecomps/LocationsCards";

export default function Home() {
  return (
    <div className="home">
      <Banner />
      <LocationCards />
      <HomesHomepageDisplay />
    </div>
  );
}
