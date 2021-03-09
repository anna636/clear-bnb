import '../css/Register.css'

export default function Register() {
  return (
    <div className="register">
      <p className="registerText">Register new user</p>
      <div>
        <label>Full name</label>
        <input placeholder="  Type your full name..."></input>
      </div>
      <div>
        <label>Email</label>
        <input className="emailInput" placeholder="  Type your email..."></input>
      </div>
      <div>
        <label>Password</label>
        <input placeholder="  Type your password..."></input>
      </div>
      <div className="register_button">
        <button>Register</button>
      </div>
    </div>
  );
}
