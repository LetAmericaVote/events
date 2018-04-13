import React from 'react';
import Rivet from '../hoc/Rivet';
import Section from '../blocks/Section';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import {
  selectSearchResultsOrder,
  selectSearchQueryValue,
  selectIsSearchPending,
} from '../selectors';

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
      <h1>Search for a voting rights house party near you</h1>
      <SearchBar />
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
