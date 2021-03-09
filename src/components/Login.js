import "../css/RegisterAndLogin.css";
import Register from "./Register";
import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { useHistory } from "react-router-dom";

export default function Login() {
  //Using state to make reactive inputs
  //Not connected to backend yet
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setActive] = useState("true");
  const [missingData, setMissingData] = useState("false"); //Doesn't work?

  //Register modul dyker upp försvinner login modul
  const handleToggle = () => {
    setActive(!isActive);
  };

  const toggleMissingData = () => {
    setMissingData(!missingData);
  };

  function login() {
    if (email === "" || password === "") {
      toggleMissingData();
      console.log(missingData);
      setEmail("");
      setPassword("");
      return;
    }
    console.log(email, password);
    console.log(missingData);
    setEmail("");
    setPassword("");
  }

  return (
    <div className="modules">
      <div className={isActive ? "dissappear" : ""}>
        <Register />
      </div>

      <div className={isActive ? "login" : "login dissappear"}>
        <div>
          <label>Email</label>
          <input
            className="emailInput"
            type="text"
            required
            placeholder="  Type your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            required
            placeholder="  Type your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div className="loginButton">
          <button onClick={login}>Log in</button>
        </div>
        <p className={missingData ? "hidden" : "warning"}>
          Please fill all the fields above
        </p>
        <span className="loginSpan">Or</span>
        <div className="registerButton">
          <button onClick={handleToggle}>Register new user</button>
        </div>
      </div>
    </div>
  );
}
