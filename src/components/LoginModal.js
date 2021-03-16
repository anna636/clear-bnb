import '../css/LoginModal.css'
import Login from './Login'
import Register from './Register'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContextProvider'

export default function LoginModal() {
  const [login, setLogin] = useState(false);
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
      { !getCurrentUser() &&
        <>
          <div className="login-popup-div"
            onClick={() => {
              setRegister(!register);
            }}
          >
            <p className="login-popup-content bli-medlem">Register</p>
          </div>
          <div className="login-popup-div"
            onClick={() => {
              setLogin(!login);
            }}
          >
            <p className="login-popup-content logga-in">Login</p>
          </div>
        </>
      }

      {getCurrentUser() &&
        <>
          <div className="login-popup-div">
            <p className="login-popup-content bli-värd-boende">Rent out</p>
            <p className="login-popup-content bli-värd-boende">My pages</p>
            <p className="login-popup-content bli-värd-boende" onClick={logoutHandler}>logout</p>
          </div>
        </>
      }
      {register && <Register />}
      {login && <Login />}

    </div>
  );
}
