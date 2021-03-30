import styled from 'styled-components'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContextProvider'
import '../../css/Modals.css'

const ErrorMessage = styled.span`
  display: flex;
  justify-content: center;
  background: red;
  color: white;
  `

const SuccessMessage = styled.span`
  display: flex;
  justify-content: center;
  background: green;
  color: white;
`

export function RegisterModal(props) {
  const {
    modal, toggle
  } = props;

  const { registerUser } = useContext(UserContext)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setpasswordError] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)

  async function createNewUser(e) {
    e.preventDefault();
    if (password === '' || confirmPassword !== password) {
      setpasswordError(true);
    } else { setpasswordError(false) }
    let newUser = {
      fullName: fullName,
      email: email,
      password: password,
    };
    let response = await registerUser(newUser)
    if (response === 'error!') {
      setErrorMsg(true)
    } else if (response.success) {
      setErrorMsg(false)
      setSuccessMsg(true)

      var delayInMilliseconds = 1000; //1 second

      setTimeout(function () {
        toggle()
        setSuccessMsg(false)
        setFullName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      }, delayInMilliseconds);
    }
  }

  const formValidator = () => {
    if (password === '' || email === '' || fullName === '' || confirmPassword === '') {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <div className="modal-header">
        <h5 className="modal-title">Register a new user</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={toggle}
        ></button>
      </div>
      <ModalBody>
        <div className="register-details">
          <form>
            <div className="name-username">
              <div className="input-wrap-div line">
                <input
                  className="myModalInput"
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
                className="myModalInput"
                placeholder="Email:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="epost-input-wrap">
              <input
                required
                placeholder="Password:"
                className="myModalInput"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="epost-input-wrap">
              <input
                required
                className="myModalInput"
                type="password"
                placeholder="Confirm password:"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </form>
          {passwordError && <ErrorMessage>Please enter correct password</ErrorMessage>}
          {errorMsg && <ErrorMessage>Choose another email.</ErrorMessage>}
          {successMsg && <SuccessMessage>Successfully registered a new user!</SuccessMessage>}
        </div>
      </ModalBody>
      <ModalFooter>
        <button onClick={(e) => createNewUser(e)} disabled={formValidator()} className="registerButton">Register</button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}