import "../css/Register.css";
import { UserContext } from "../contexts/UserContextProvider";
import { useContext, useState } from "react";

export default function Register() {
  const { addUser, login } = useContext(UserContext)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function createNewUser(e) {
    e.preventDefault();

    if (confirmPassword !== password) {
      alert("Password is not matching");
    } else {
      let newUser = {
        fullName: fullName,
        email: email,
        password: password,
      };
      console.log(newUser);
      addUser(newUser)
     window.location.reload();

    }
  }

  return (
    <div className="register">
      <div className="upper-register">
        {/* <button className="close-register-btn">+</button> */}
        <h3>Register new user</h3>
      </div>
      <div className="register-details">
        <form>
          <div className="name-username">
            <div className="input-wrap-div line">
              <input
                type="text"
                required
                placeholder="Full name:"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className="epost-input-wrap">
            <input
              required
              placeholder="Email:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="epost-input-wrap">
            <input
              required
              placeholder="Password:"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="epost-input-wrap">
            <input
              required
              placeholder="Confirm password:"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="submit-btn-register-wrap">
            <button className="register-btn" onClick={createNewUser}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
