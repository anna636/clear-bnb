import { Link, useHistory } from 'react-router-dom'
import SearchBar from './SearchBar'

export default function TopNav() {

  return (
    <>
      <div className="logo">
        Logo
      </div>

      <div className="menu">
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </div>

      <SearchBar />


      <div className="loginRegister">
        login/logout/register
      </div>
    </>
  )
}