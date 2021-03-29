import React, { useState, useContext, useEffect } from 'react'
import { LoginModal } from '../modals/loginModal'
import { RegisterModal } from '../modals/registerModal'
import styled from 'styled-components'
import { UserContext } from '../../contexts/UserContextProvider'



const AccessibilityContainer = styled.div`
display: flex;
margin-left: 10px;
`;

const LogoutButton = styled.button`
border: 0;
outline: 0;
padding: 8px 1em;
color: #fff;
font-size: 13px;
font-weight: 500;
border-radius: 20px;
background-color: #414141;
box-shadow: 0 1 3px rgba(15, 15, 15);

background-image: linear-gradient(to right, transparent 0%, #b10000 100%);
cursor: pointer;
transition: all 240ms ease-in-out;

&:hover {
  background-color: #b10000;
}

&:not(:last-of-type){
  margin-right: 6px;
}
`

export function Logout() {

  const { getCurrentUser, logout } = useContext(UserContext)

  const logoutHandler = () => {
   
    logout()
   

  };

  useEffect(() => {
    getCurrentUser()
  }, []);

  const [registerModal, setRegisterModal] = useState(false);

  // const toggleRegister = () => setRegisterModal(!registerModal);

  return <AccessibilityContainer>
    <LogoutButton onClick={logoutHandler}>Logout</LogoutButton>
  </AccessibilityContainer>
}
