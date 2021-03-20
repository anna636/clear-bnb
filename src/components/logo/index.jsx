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
  height: 50px;
 }
 `
 
export function Logo() {
  return <LogoWrapper>
    <LogoImg>
      <img src={ClearbnbLogoImg} alt="ClearBNB"/>
    </LogoImg>
  </LogoWrapper>
}
