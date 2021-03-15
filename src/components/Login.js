import '../css/Login.css'

export default function Login() {
  return (
    <div className="login-container">
      <div className="upper-login-wrap">
        <h3>Logga in</h3>
      </div>
      <div>
        <div className="input-login-div-wrap">
          <div className="input-login-div line">
            <input type="text" placeholder="Användarnamn"/>
          </div>
          <div className="input-login-div">
            <input type="password" placeholder="Lösenord"/>
          </div>
        </div>
        <div className="login-btn-wrap">
          <button className="login">Logga in</button>
        </div>
        <div className="other-login-options-wrap">
          <div className="breakline"></div>
          <p>eller</p>
          <div className="breakline"></div>
        </div>
        <div className="login-options-wrapper">
          <div className="login-option-div">
            <button className="login-option-btn">Logga in med användarnamn</button>
          </div>
          <div className="login-option-div">
            <button className="login-option-btn">Logga in med email</button>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
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
