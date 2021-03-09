import "../css/Register.css";
import React, { useState } from "react";

export default function Register() {
 const addUser = async (user) => {
   let res = await fetch("/rest/users", {
     method: "POST",
     headers: { "content-type": "application/json" },
     body: JSON.stringify(user),
   });

   res = await res.json();
   user.id = res.id;

   console.log(res);
 };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dataIsMissing, setDataIsMissing] = useState(false);
  const toggle = React.useCallback(() => setDataIsMissing(true));

  function registerNewUser(e) {
    e.preventDefault();
    if (fullName === "" || email === "" || password === "") {
      toggle();
      console.log(dataIsMissing);
      console.log("no right data");

      setFullName("");
      setEmail("");
      setPassword("");

      return;
    }

    setFullName("");
    setEmail("");
    setPassword("");

    const newUser = {
      fullName: fullName,
      email: email,
      password: password,
    };

    console.log(newUser);

    addUser(newUser)
  }

  return (
    <div className="register">
      <p className="registerText">Register new user</p>
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
    </div>
  );
}
