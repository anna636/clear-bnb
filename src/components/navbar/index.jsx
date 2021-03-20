import React from 'react'
import styled from 'styled-components'
import {Logo} from '../logo'
import { Accessibility } from './accessibility';
import { NavLinks } from './navLinks';

const NavbarContainer = styled.div`
width: 100%;
height: 60px;
box-shadow: 0 1 3px rgba(15, 15, 15);
display: flex;
align-items: center;
padding: 0 1em;
background-color: #f7f7f7;
`;

const LeftSection = styled.div`
display: flex;
`

const MiddleSection = styled.div`
display: flex;
flex: 2;
height: 100%;
justify-content: center;
align-items: center;

`

const RightSection = styled.div`
display: flex;
`


export function NavBar(props) {
  return <NavbarContainer>
    <LeftSection>
      <Logo />
    </LeftSection>

    <MiddleSection>
      <NavLinks/>
    </MiddleSection>

    <RightSection>
      <Accessibility/>

    </RightSection>
  </NavbarContainer>
}
