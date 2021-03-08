import './App.css';
import Nav from './components/Nav'
import Home from './pages/Home.js'
import Footer from './components/Footer'

// Libs
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const page404 = () => (
  <h1>Page not found: {window.location.pathname}</h1>
)

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />

        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="*" component={page404} />
          </Switch>
        </main>

        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
