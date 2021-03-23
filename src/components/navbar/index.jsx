import React, { useContext, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components'
import { Logo } from '../logo'
import { Accessibility } from './accessibility';
import { NavLinks } from './navLinks';
import { DeviceSize } from '../responsive'
import { MobileNavLinks } from './mobileNavLinks';
import { UserContext } from '../../contexts/UserContextProvider'
import { Logout } from './logout';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

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

const DropDownWrapper = styled.span`
list-style: none;
display: flex;
justify-content: center;
align-items: center;
padding: 0;
margin: 0;
width: 100%;

a {
display: flex;
justify-content: center;
align-items: center;
padding: 0;
margin: 0;
}
`


export function NavBar() {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })
  const { getCurrentUser, getBeautifulFirstName, logout } = useContext(UserContext)

  const logoutHandler = () => {
    logout()
  };

  useEffect(() => {
    getCurrentUser()
  }, []);

  return <NavbarContainer>
    <LeftSection>
      <Logo />
    </LeftSection>

    <MiddleSection>
      {!isMobile && <NavLinks />}
    </MiddleSection>

    <RightSection>
      {!isMobile && !getCurrentUser() && <Accessibility />}
      {!isMobile && getCurrentUser() &&

        <DropDownWrapper>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Welcome back, {getBeautifulFirstName()}!<i className="far fa-user-circle p-1"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
                </DropdownItem>
              <DropdownItem>
                Option 2
                </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={logoutHandler}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </DropDownWrapper>}

      {isMobile && <MobileNavLinks />}

    </RightSection>
  </NavbarContainer>
}
