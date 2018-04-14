import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import { setSearchMode } from '../actions';
import AlgoliaSearch from '../hoc/AlgoliaSearch';
import { FlexAcross } from '../blocks/Flex';
import {
  TextInput,
  TextInputContainer,
} from '../blocks/Input';
import { SearchIcon } from '../blocks/Icons';

const SizedSearchIcon = styled(SearchIcon)`
  align-self: center;
  ${props => props.theme.tinyMarginLeft}
`;

const SearchInput = styled(TextInput)`
  padding-left: ${props => props.theme.baseSpacing / 2}px;
`;

const SearchBar = (props) => {
  const { queryValue, onType, setSearchMode } = props;
  
  const onChange = (event) => {
    setSearchMode('query');
    onType(event.target.value);
  };

  return (
    <TextInputContainer>
      <FlexAcross>
        <SizedSearchIcon />
        <SearchInput type="text" value={queryValue} onChange={onChange} placeholder="Search..." />
      </FlexAcross>
    </TextInputContainer>
  );
}

SearchBar.actionCreators = {
  setSearchMode,
};

export default AlgoliaSearch(Rivet(SearchBar));
