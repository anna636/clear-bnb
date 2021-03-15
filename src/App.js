// import and rename to Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Nav from './components/Nav'
import ApartmentSearch from './pages/ApartmentSearch';
import Home from './pages/Home.js'
import PlusMinusGuests from './pages/PlusMinusGuests.js'
import Footer from './components/Footer'
import ApartmentContextProvider from './contexts/ApartmentContextProvider';
import BookingContextProvider from './contexts/BookingContextProvider';
import UserContextProvider from "./contexts/UserContextProvider";

function App() {

  const page404 = () => (
    <h1>Page not found: { window.location.pathname}</h1>
  )

  return (
    <div className="App">
      <BookingContextProvider>
        <ApartmentContextProvider>
          <UserContextProvider>
            <Router>
              <header>
                <Nav />
              </header>
              <main>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/search/:city" component={ApartmentSearch} />
                  <Route exact path="/plusminus/:id" component={PlusMinusGuests} />
                  <Route path="*" component={page404} />
                </Switch>
              </main>

              <footer>
                <Footer />
              </footer>
            </Router>
          </UserContextProvider>
        </ApartmentContextProvider>
      </BookingContextProvider>
    </div>
  );
}

export default App;
