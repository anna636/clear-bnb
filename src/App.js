// import and rename to Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Nav from './components/Nav'
import ApartmentSearch from './pages/ApartmentSearch';
import Home from './pages/Home.js'
import PlusMinusGuests from './pages/PlusMinusGuests.js'
import Footer from './components/Footer'
import ApartmentDetails from './pages/ApartmentDetails.js'
import ApartmentContextProvider from './contexts/ApartmentContextProvider';
import BookingContextProvider from './contexts/BookingContextProvider';

function App() {

  const page404 = () => (
    <h1>Page not found: { window.location.pathname}</h1>
  )

  return (
    <div className="App">
      <BookingContextProvider>
        <ApartmentContextProvider>
          <Router>
            <header>
              <Nav />
            </header>
            <main>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/search/:city" component={ApartmentSearch} />
                  <Route exact path="/plusminus/:id" component={PlusMinusGuests} />
                  <Route exact path="/details/:id" component={ApartmentDetails} />
                <Route path="*" component={page404} />
              </Switch>
            </main>

            <footer>
              <Footer />
            </footer>
          </Router>
        </ApartmentContextProvider>
      </BookingContextProvider>
    </div>
  );
}

export default App;
