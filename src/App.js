import './App.css';
import Nav from './components/Nav'
import Home from './pages/Home.js'
import PlusMinusGuests from './pages/PlusMinusGuests.js'
import Footer from './components/Footer'

import ApartmentContextProvider from './contexts/ApartmentContextProvider'

// Libs
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const page404 = () => (
  <h1>Page not found: {window.location.pathname}</h1>
)

function App() {
  return (
    <div className="App">
      <ApartmentContextProvider>
        <Router>
          <header>
            <Nav />
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/plusminus/:id" component={PlusMinusGuests} />
              <Route path="*" component={page404} />
            </Switch>
          </main>

          <footer>
            <Footer />
          </footer>
        </Router>
      </ApartmentContextProvider>
    </div>
  );
}

export default App;
