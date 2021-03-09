// import and rename to Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Nav from './components/Nav'
import ApartmentSearch from './pages/ApartmentSearch';
import Home from './pages/Home.js'
import Footer from './components/Footer'
import HouseDetails from './pages/HouseDetails.js'
import ApartmentContextProvider from './contexts/ApartmentContextProvider';

function App() {

  const page404 = () => (
    <h1>Page not found: { window.location.pathname}</h1>
  )

  return (
    <div className="App">
      <Nav />
      <Home />
      <HouseDetails/>
      <Footer />
      <ApartmentContextProvider>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search/:city" component={ApartmentSearch} />
          <Route path="*" component={page404} />
        </Switch>
        </Router>
      </ApartmentContextProvider>
    </div>
  );
}

export default App;
