import React, { useState } from 'react'
import styled from 'styled-components'
import { Accessibility } from './accessibility';
import { MenuToggle } from './menuToggle';

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
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
`;

export function MobileNavLinks(props) { 
  const [isOpen, setOpen] = useState(false);

  return (
    <NavLinksContainer>
    <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
    {isOpen && (<LinksWrapper>
      <LinkItem><Link href="/">Home</Link></LinkItem>
      <LinkItem><Link href="/housing-listing">Apartments</Link></LinkItem>
      <LinkItem><Link href="/all-destinations">Destinations</Link></LinkItem>
        <LinkItem><Link href="#">Get started</Link></LinkItem>
          <Accessibility />
      </LinksWrapper>)}
      
    </NavLinksContainer>
  )
}
