import '../css/LoginModal.css'
import Login from './Login'
import Register from './Register'
import {useState} from 'react'

export default function LoginModal() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  return (
    <div className="login-modal">
      <div className="login-popup-div"
           onClick={() => {
             setRegister(!register);
           }}      
      >
        <p className="login-popup-content bli-medlem">Bli medlem</p>
      </div>
      <div className="login-popup-div"
           onClick={() => {
             setLogin(!login);
           }}
      >
        <p className="login-popup-content logga-in">Logga in</p>
      </div>
      <hr className="login-popup-hr"/>
      <div className="login-popup-div">
        <p className="login-popup-content bli-värd-boende">Bli värd för ditt boende</p>
      </div>
      <div className="login-popup-div">
        <p className="login-popup-content bli-värd-upplevelse">Bli värd för en upplevelse</p>
      </div>
      <div className="login-popup-div">
        <p className="login-popup-content hjälp">Hjälp</p>
      </div>
      {register && <Register />}
      {login && <Login />}
    </div>
  )
}