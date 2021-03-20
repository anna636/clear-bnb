import React from 'react'
import styled from 'styled-components'
import ClearbnbLogoImg from '../../imgs/logo_clearbnb.jpg'

const LogoWrapper = styled.div`
display: flex;
align-items: center;
`

const LogoImg = styled.div`
height: 100%;
width: 100%;

 img {
  height: 2.5em;
 }

 a{
  text-decoration: none;
 }
 `;

export function Logo() {
  return <LogoWrapper>
    <LogoImg>
      <a href="/">
        <img src={ClearbnbLogoImg} alt="ClearBNB" />
        </a>
    </LogoImg>
  </LogoWrapper>
}
