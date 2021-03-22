import '../css/Login.css'
import { UserContext } from '../contexts/UserContextProvider'
import { useContext, useState, useEffect } from "react";

export default function Login() {

  const { login, getCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showLoginSuccess, setShowLoginSuccess] = useState(false)

  useEffect(() => {
    getCurrentUser()
  }, []);

  function tempShowLoginSuccess() {
    setShowLoginSuccess(true)
    
    setTimeout(() => { setShowLoginSuccess(false) }, 2000)
   }

  function logIn() {
    let user = {
      email: email,
      password: password
    }
    login(user)
    tempShowLoginSuccess()
  }

  return (
    <div className="login-container">
      <> { getCurrentUser() && showLoginSuccess &&
        <div className="login-success"  >
        <p>Welcome back, {getCurrentUser().fullName}!</p>
        </div>
      }</>
      <div className="upper-login-wrap">
        <h3>Logga in</h3>
      </div>
      <div>
        <div className="input-login-div-wrap">
          <div className="input-login-div line">
            <input
              type="text"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-login-div">
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="login-btn-wrap">
          <button className="login"
            onClick={logIn}>Log in</button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

/*

[login]
  [upperdiv]
    [h3]
  [upperdiv]
  [middlediv]
    [div]
      [input]
      [input]
    [div]
    [div]
      [button]
    [div]
    [div]
      [hr eller hr]
    [div]
    [div]
      [div]
        [button]
      [div]
      [div]
        [button]
      [div]
      [div]
        [button]
      [div]
    [div]
  [middlediv]
  [lowerdiv]
    [button]
  [lowerdiv]
[login]

*/
