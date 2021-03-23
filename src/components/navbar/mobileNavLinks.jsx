import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Accessibility } from './accessibility';
import { MenuToggle } from './menuToggle';
import { UserContext } from '../../contexts/UserContextProvider'
import { Logout } from './logout';


const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.ul`
  display: flex;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 200;
`;

const LinkItem = styled.li`
  width: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  margin-bottom: 10px;

  &:hover{
    color: #eee;
  }

a {
  text-decoration: none;
  color: inherit;
  font-size: inherit;
}
`;

const WelcomeMessage = styled.p`
  padding: 10px;
  color: #222;
  font-weight: 500;
  font-size: 18px;
`

export function MobileNavLinks() {
  const [isOpen, setOpen] = useState(false);
  const { getCurrentUser, getBeautifulFirstName } = useContext(UserContext)


  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (<LinksWrapper>
        {getCurrentUser() && <WelcomeMessage>Welcome back, {getBeautifulFirstName()}!</WelcomeMessage>}
        <LinkItem><Link to="/">Home</Link></LinkItem>
        <LinkItem><Link to="/housing-listing">Apartments</Link></LinkItem>
        <LinkItem><Link to="/all-destinations">Destinations</Link></LinkItem>
        <LinkItem><Link to="#">Get started</Link></LinkItem>
        {!getCurrentUser() && <Accessibility />}
        <hr />
        {getCurrentUser() && <Logout></Logout>}
      </LinksWrapper>)}

    </NavLinksContainer>
  )
}
