import "../css/RegisterAndLogin.css";
import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { useHistory } from "react-router-dom";

export default function Register() {
  const history = useHistory();

  const { addUser } = useContext(UserContext); //Using context to add user
 

  //Using state variables to make reactivve inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 


  async function registerNewUser(e) {
    e.preventDefault();
    //If some input is empty register won't happen
    if (fullName === "" || email === "" || password === "") {
     
      console.log("no right data");

      setFullName("");
      setEmail("");
      setPassword("");

      return;
    }

 
    setFullName("");
    setEmail("");
    setPassword("");

    //Making new user document and posting it
    const newUser = {
      fullName: fullName,
      email: email,
      password: password,
    };

    await addUser(newUser);
    // history.push(); 
  }


 

  return (
    <div className="register">
      <p className="registerText">
        Register new user <span>✖</span>
      </p>
      <div>
        <label>Full name</label>
        <input
          key="1"
          type="text"
          required
          placeholder="  Type your full name..."
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          key="2"
          type="text"
          required
          className="emailInput"
          placeholder="  Type your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          key="3"
          type="text"
          required
          placeholder="  Type your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className="register_button">
        <button onClick={registerNewUser}>Register</button>
      </div>

      <div></div>
    </div>
  );
}
