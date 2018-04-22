import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import Section from '../blocks/Section';
import { FloatingSpinner } from '../blocks/Spinner';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import GeoLocationButton from '../components/GeoLocationButton';
import CommunitySignup from '../components/CommunitySignup';
import HouseParty from '../blocks/HouseParty';
import {
  FlexDown,
} from '../blocks/Flex';
import {
  SectionHeader,
  Hero,
} from '../blocks/Type';
import {
  selectSearchResultsOrder,
  selectSearchQueryValue,
  selectIsSearchPending,
  selectIsSearchModeQuery,
  selectEventsSortedByDistance,
  selectIsAuthenticated,
} from '../selectors';
import {
  SEARCH_HEADER,
  SEARCH_GEO_CTA,
  SEARCH_MISSING,
  SEARCH_GEO_MISSING,
  SEARCH_JOIN_COMMUNITY,
} from '../copy';

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
    isQuery,
    nearbyEvents,
    isAuthenticated,
  } = props;

  const noQueryResults = searchResultOrder &&
    ! searchResultOrder.length &&
    searchResultQuery &&
    searchResultQuery.length &&
    ! isSearchPending;

  const noGeoResults = nearbyEvents &&
    ! nearbyEvents.length &&
    ! isSearchPending;

  const noResults = isQuery ? noQueryResults : noGeoResults;

  const results = isQuery ?
    searchResultOrder : nearbyEvents.map(event => event.id);

  return (
    <Section>
      <SectionHeader>{SEARCH_HEADER}</SectionHeader>
      <SearchRow>
        <SearchColumn>
          <SearchBar />
        </SearchColumn>
        <SearchColumn>
          <GeoLocationButton copy={SEARCH_GEO_CTA} />
        </SearchColumn>
      </SearchRow>
      {isSearchPending ? <FloatingSpinner /> : null}
      {results.map(eventId => (
        <SearchResult eventId={eventId} key={eventId} />
      ))}
      {! results.length && ! noResults && (! searchResultQuery || ! searchResultQuery.length) ? (
        <HouseParty />
      ) : null}
      {noResults ? (
        <FlexDown>
          {isQuery ? (
            <Hero centered>{SEARCH_MISSING} "{searchResultQuery}".</Hero>
          ) : (
            <Hero centered>{SEARCH_GEO_MISSING}</Hero>
          )}
          {isAuthenticated ? (
            <HouseParty />
          ) : (
            <FlexDown>
              <SectionHeader centered>{SEARCH_JOIN_COMMUNITY}</SectionHeader>
              <CommunitySignup />
            </FlexDown>
          )}
        </FlexDown>
      ) : null}
    </Section>
  );
}

Search.mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state),
  isSearchPending: selectIsSearchPending(state),
  searchResultOrder: selectSearchResultsOrder(state),
  searchResultQuery: selectSearchQueryValue(state),
  isQuery: selectIsSearchModeQuery(state),
  nearbyEvents: selectEventsSortedByDistance(state),
});

export default Rivet(Search);
