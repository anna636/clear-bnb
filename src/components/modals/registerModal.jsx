import styled from 'styled-components'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContextProvider'

export function RegisterModal(props) {
  const {
    modal, toggle
  } = props;

  const { registerUser } = useContext(UserContext)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function createNewUser(e) {
    e.preventDefault();

    if (confirmPassword !== password) {
      alert("Password is not matching");
    } else {
      let newUser = {
        fullName: fullName,
        email: email,
        password: password,
      };
      let response = await registerUser(newUser)
      console.log(response)
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
        </div>

      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={createNewUser}>Register</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}
