import './App.css';
import Nav from './components/Nav'
import Home from './pages/Home.js'
import Housing from './pages/Housing.js'
import Footer from './components/Footer'
import HousingContextProvider from './contexts/HousingContextProvider'

// Libs
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const page404 = () => (
  <h1>Page not found: {window.location.pathname}</h1>
)

function App() {
  return (
    <div className="App">
      <HousingContextProvider>
        <Router>
          <header>
            <Nav />
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/housing-listing" component={Housing} />
              <Route path="*" component={page404} />
            </Switch>
          </main>

          <footer>
            <Footer />
          </footer>
        </Router>
      </HousingContextProvider>
    </div>
  );
}

export default App;
