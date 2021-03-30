import React from 'react'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContextProvider'
import '../../css/LoginRegister.css'
import styled from 'styled-components'


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

export function LoginModal(props) {
  const {
    modal, toggle
  } = props;

  const { login, whoAmI } = useContext(UserContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)

  async function logIn(e) {
    e.preventDefault()
    let user = {
      email: email,
      password: password
    }
    const response = await login(user)
    if (response.error) {
      setErrorMessage(true);
    } else if (response.success) {
      setErrorMessage(false)
      setSuccessMsg(true)

      var delayInMilliseconds = 1000; //1 second

      setTimeout(function () {
        whoAmI()
        toggle()
      }, delayInMilliseconds);

    }
  }



  return (
    <Modal isOpen={modal} toggle={toggle}>
      <div className="modal-header">
        <h5 className="modal-title">Log in</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={toggle}
        ></button>
      </div>
      <ModalBody>
        <div className="input-login-div-wrap">
          <div className="input-login-div line">
            <input
              className="myModalInput"
              type="text"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-login-div">
            <input
              className="myModalInput"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <ErrorMessage>Bad credentials</ErrorMessage>}
          {successMsg && <SuccessMessage>Login successfull</SuccessMessage>}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={(e) => logIn(e)}>Login</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}
