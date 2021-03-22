import React from 'react'
import styled from 'styled-components'

import { SearchTab } from './searchTab'

const SearchbarContainer = styled.div`
width: 100%;
height: 60px;
display: flex;
justify-content: center;
align-items: center;
background-color: #f7f7f7;
`;




export function SearchBar(props) {
  return <SearchbarContainer>
    <SearchTab></SearchTab>
  </SearchbarContainer>
}
