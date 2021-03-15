import '../css/Register.css'

export default function Register() {
  return (
    <div className="register">
      <div className="upper-register">
        {/* <button className="close-register-btn">+</button> */}
        <h3>Registrera dig</h3>
      </div>
      <div className="register-details">
        <form>
          <div className="name-username">
            <div className="input-wrap-div line">
              <input type="text" placeholder="Fullständigt namn:" />
            </div>
            <div className="input-wrap-div">
              <input type="text" placeholder="Användarnamn:" />
            </div>
          </div>
          
          <div className="birthday-input-wrap">
            <input placeholder="Födelsedatum: mm/dd/åå" />
          </div>

          <div className="epost-input-wrap">
            <input placeholder="Epost:" />
          </div>

          <div className="submit-btn-register-wrap">
            <button className="register-btn">Bekräfta</button>
          </div>
        </form>
      </div>
    </div>
  )
}
