import React from 'react'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContextProvider'
import '../../css/LoginRegister.css'

export function LoginModal(props) {
  const {
    modal, toggle
  } = props;

  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function logIn() {
    let user = {
      email: email,
      password: password
    }
    login(user)
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
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={logIn}>Login</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}
