import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import AlgoliaSearch from '../hoc/AlgoliaSearch';
import { FlexAcross } from '../blocks/Flex';
import { SearchIcon } from '../blocks/Icons';
import { SEARCH_ROUTE } from '../routing/routes';
import {
  setSearchMode,
  setPathname,
} from '../actions';
import {
  TextInput,
  TextInputContainer,
} from '../blocks/Input';
import {
  selectLocationState,
  selectRoutingPathname,
} from '../selectors';

const SizedSearchIcon = styled(SearchIcon)`
  align-self: center;
  ${props => props.theme.tinyMarginLeft}
`;

const SearchInput = styled(TextInput)`
  padding-left: ${props => props.theme.baseSpacing / 2}px;
`;

const SearchBar = (props) => {
  const {
    queryValue,
    onType,
    setSearchMode,
    placeholderState,
    setPathname,
    isSearchPage,
  } = props;

  const onChange = (event) => {
    setSearchMode('query');
    onType(event.target.value);
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter' && ! isSearchPage) {
      setPathname(SEARCH_ROUTE)
    }
  };

  const placeholder = !!placeholderState ? `Try "${placeholderState}"` : "Search by state, city, event or host name";

  return (
    <TextInputContainer>
      <FlexAcross fill>
        <SizedSearchIcon />
        <SearchInput
          type="text"
          value={queryValue}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          indent
        />
      </FlexAcross>
    </TextInputContainer>
  );
}

SearchBar.mapStateToProps = (state) => ({
  placeholderState: selectLocationState(state),
  isSearchPage: selectRoutingPathname(state) === SEARCH_ROUTE,
});

SearchBar.actionCreators = {
  setSearchMode, setPathname,
};

export default AlgoliaSearch(Rivet(SearchBar));
