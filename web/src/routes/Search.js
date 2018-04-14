import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import Section from '../blocks/Section';
import { SectionHeader } from '../blocks/Type';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import GeoLocationButton from '../components/GeoLocationButton';
import {
  selectSearchResultsOrder,
  selectSearchQueryValue,
  selectIsSearchPending,
} from '../selectors';

const SearchRow = styled.div`
  ${props => props.theme.reset}

  display: flex;
  flex-direction: column;

  ${props => props.theme.tablet`
    flex-direction: row;
    justify-content: space-between;
    ${props => props.theme.baseMarginBottom}
  `}
`;

const SearchColumn = styled.div`
  ${props => props.theme.reset}

  flex: 0 0 100%;
  ${props => props.theme.baseMarginBottom}

  ${props => props.theme.tablet`
    margin-bottom: 0;
    flex: 0 0 calc(50% - ${props => props.theme.baseSpacing}px);
  `}
`;

const Search = (props) => {
  const {
    searchResultOrder,
    searchResultQuery,
    isSearchPending,
  } = props;

  const noResults = searchResultOrder &&
    ! searchResultOrder.length &&
    searchResultQuery &&
    searchResultQuery.length &&
    ! isSearchPending;

  return (
    <Section>
      <SectionHeader>Search for a voting rights house party near you</SectionHeader>
      <SearchRow>
        <SearchColumn>
          <SearchBar />
        </SearchColumn>
        <SearchColumn>
          <GeoLocationButton copy="Find nearby events" />
        </SearchColumn>
      </SearchRow>
      {searchResultOrder.map(eventId => (
        <SearchResult eventId={eventId} key={eventId} />
      ))}
      {noResults ? <p>No results</p> : null}
    </Section>
  );
}

Search.mapStateToProps = (state) => ({
  isSearchPending: selectIsSearchPending(state),
  searchResultOrder: selectSearchResultsOrder(state),
  searchResultQuery: selectSearchQueryValue(state),
});

export default Rivet(Search);
