import React from 'react'
import styled from 'styled-components'

const AccessibilityContainer = styled.div`
display: flex;
margin-left: 10px;
`;

const RegisterButton = styled.button`
border: 0;
outline: 0;
padding: 8px 1em;
color: #fff;
font-size: 13px;
font-weight: 500;
border-radius: 20px;
background-color: #6adf76;
background-image: linear-gradient(to right, transparent 0%, #00c9ff 100%);
cursor: pointer;
transition: all 240ms ease-in-out;

&:hover {
  background-color: #00c9ff;
}

&:not(:last-of-type){
  margin-right: 6px;
}
`

const LoginButton = styled.button`
border: 0;
outline: 0;
padding: 8px 1em;
color: #222;
font-size: 13px;
font-weight: 500;
border-radius: 20px;
background-color: transparent;
border: 1px solid #00c9ff;
cursor: pointer;
transition: all 240ms ease-in-out;

&:hover {
  color: #fff;
  background-color: #00c9ff;
}

&:not(:last-of-type){
  margin-right: 6px;
}
`

export function Accessibility(props) {
  return <AccessibilityContainer>
    <RegisterButton>Register</RegisterButton>
    <LoginButton>Login</LoginButton>
  </AccessibilityContainer>
}
