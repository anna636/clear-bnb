// import and rename to Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Housing from './pages/Housing.js'
import Nav from "./components/Nav";
import ApartmentSearch from "./pages/ApartmentSearch";
import Home from "./pages/Home.js";
import PlusMinusGuests from "./pages/PlusMinusGuests.js";
import Footer from "./components/Footer";
import ApartmentDetails from "./pages/ApartmentDetails.js";
import ApartmentContextProvider from "./contexts/ApartmentContextProvider";
import BookingContextProvider from "./contexts/BookingContextProvider";
import Checkin from "./pages/Checkin";
import UserContextProvider from "./contexts/UserContextProvider";
import Confirmation from "./pages/Confirmation.js";
import AllDestinations from "./pages/AllDestinations.js";
import HousingContextProvider from './contexts/HousingContextProvider' //Use apartment context instead
import MyBookings from './pages/MyBookings.js'

function App() {
  const page404 = () => <h1>Page not found: {window.location.pathname}</h1>;

  return (
    <div className="App">
      <BookingContextProvider>
        <HousingContextProvider>
          <ApartmentContextProvider>
            <UserContextProvider>
              <Router>
                <header>
                  <Nav />
                </header>
                <main>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                      exact
                      path="/search/:city"
                      component={ApartmentSearch}
                    />
                    <Route
                      exact
                      path="/plusminus/:id"
                      component={PlusMinusGuests}
                    />
                    <Route
                      exact
                      path="/details/:id"
                      component={ApartmentDetails}
                    />
                    <Route exact path="/checkin/:id" component={Checkin} />

                    <Route
                      exact
                      path="/confirmation/:id"
                      component={Confirmation}
                    />

                    <Route
                      exact
                      path="/my-bookings/:id"
                      component={MyBookings}
                    />

                    <Route exact path="/housing-listing" component={Housing} />
                    <Route exact path="/all-destinations" component={AllDestinations} />

                    <Route path="*" component={page404} />
                  </Switch>
                </main>

                <footer>
                  <Footer />
                </footer>
              </Router>
            </UserContextProvider>
          </ApartmentContextProvider>
        </HousingContextProvider>
      </BookingContextProvider>
    </div>
  );
}

export default App;
