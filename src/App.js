// Components
import TopNav from './components/TopNav'

// Pages
import Home from './pages/Home'

// Libs
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const page404 = () => (
  <h1>Page not found: {window.location.pathname}</h1>
)

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-Header">
          <TopNav />
        </header>

        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="*" component={page404} />
          </Switch>
        </main>

        <footer>&copy; Copyright Group 3 2021 </footer>
      </Router>
    </div>
  );
}

export default App;
