import './App.css';
import Nav from './components/Nav'
import Home from './pages/Home.js'
import Footer from './components/Footer'
import HouseDetails from './pages/HouseDetails.js'

function App() {
  return (
    <div className="App">
      <Nav />
      <Home />
      <HouseDetails/>
      <Footer />
    </div>
  );
}

export default App;
