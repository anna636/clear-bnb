import { Link } from 'react-router-dom'
import styled from 'styled-components'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContextProvider'

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

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

const LinkItem = styled.li`
  width: 100%;
  color: #222;
  font-weight: 500;
  font-size: 16px;
  display: flex;

  &:hover{
    color: #eee;
  }

a {
  text-decoration: none;
  color: inherit;
  font-size: inherit;
}
`;

export function Dropdown() {
  const { getCurrentUser, getBeautifulFirstName, logout } = useContext(UserContext)

  const logoutHandler = () => {
    logout()
  };

  return (
    <DropDownWrapper>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Welcome back, {getBeautifulFirstName()}!<i className="far fa-user-circle p-1"></i>
        </DropdownToggle>

        <DropdownMenu right>
          <DropdownItem>
            <LinkItem><Link to="/apartment-listing">Rent out</Link></LinkItem>
          </DropdownItem>
        
          <DropdownItem>
            <LinkItem><Link to={"/my-bookings/" + getCurrentUser()._id}>My bookings</Link></LinkItem>
          </DropdownItem>

          <DropdownItem>
            <LinkItem><Link to={"/my-apartments/" + getCurrentUser()._id}>My apartments</Link></LinkItem>
          </DropdownItem>

          <DropdownItem divider />
          <DropdownItem onClick={logoutHandler}>
            Logout
              </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </DropDownWrapper>
  )
}
