import '../css/LoginModal.css'
import Login from './Login'
import Register from './Register'
import { useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContextProvider'

export default function LoginModal() {
  const [login, setLogin] = useState(false);
  const history = useHistory();
  const [register, setRegister] = useState(false);
  const { getCurrentUser, logout } = useContext(UserContext)

  const logoutHandler = () => {
    logout()
  };

  useEffect(() => {
    getCurrentUser()
  }, []);

  return (
    <div className="login-modal">
      {register && (
        <div className="registerWrapper">
          <span onClick={() => setRegister(false)}>x</span>
          <Register />
        </div>
      )}

      {login && (
        <div className="loginWrapper">
          <span onClick={() => setLogin(false)}>x</span>
          <Login />
        </div>
      )}
      {!getCurrentUser() && (
        <>
          <div
            className="login-popup-div"
            onClick={() => 
              login===false ? setRegister(true): ""
            }
          >
            <p className="login-popup-content bli-medlem">Register</p>
          </div>
          <div
            className="login-popup-div"
            onClick={() => 
              register===false ? setLogin(true):""
            }
          >
            <p className="login-popup-content logga-in">Login</p>
          </div>
        </>
      )}

      {getCurrentUser() && (
        <>
          <div className="login-popup-div">
            <p className="login-popup-content bli-värd-boende">Rent out</p>
            <p className="login-popup-content bli-värd-boende" onClick={()=> history.push("/my-apartments/" + getCurrentUser()._id)}>My apartments</p>
            <p onClick={()=> history.push("/my-bookings/" + getCurrentUser()._id)}>My bookings</p>
            <p
              className="login-popup-content bli-värd-boende"
              onClick={logoutHandler}
            >
              logout
            </p>
          </div>
        </>
      )}
    </div>
  );
}