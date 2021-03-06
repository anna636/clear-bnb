import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

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
`;

const LinkItem = styled.li`
display: flex;
height: 100%;
padding: 0 1.1em;
color: #222;
font-weight: 500;
font-size: 14px;
align-items: center;
justify-content: center;
border-top: 2px solid transparent;
transition: all 220ms ease-in-out;

&:hover {
  border-top: 2px solid #7f8c8d;
}

a {
  text-decoration: none;
  color: inherit;
  font-size: inherit;
}
`;

export function NavLinks() {
  return <NavLinksContainer>
    <LinksWrapper>
      <LinkItem><Link to="/">Home</Link></LinkItem>
      <LinkItem><Link to="/housing-listing">Apartments</Link></LinkItem>
      <LinkItem><Link to="/all-destinations">Destinations</Link></LinkItem>
      <LinkItem><Link to="/getstarted">Get started</Link></LinkItem>
    </LinksWrapper>
  </NavLinksContainer>
}
