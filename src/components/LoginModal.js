import '../css/LoginModal.css'

export default function LoginModal(props) {

  return (
    <div className="login-modal">
      <div className="login-popup-div">
        <p className="login-popup-content bli-medlem">Bli medlem</p>
      </div>
      <div className="login-popup-div">
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
    </div>
  )
}