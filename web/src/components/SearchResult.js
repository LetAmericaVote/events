import React from 'react';
import Rivet from '../hoc/Rivet';
import InternalLink from '../routing/InternalLink';
import { makeEventRoute } from '../routing/routes';
import {
  selectEventTitle,
  selectEventDescription,
  selectEventCity,
  selectEventState,
  selectEventZipcode,
  selectEventHeaderPhoto,
  selectEventSlug,
  selectEventExists,
} from '../selectors';

const SearchResult = (props) => {
  const {
    eventExists,
    title,
    description,
    city,
    state,
    zipcode,
    slug,
    headerPhoto,
  } = props;

  if (! eventExists) {
    // TODO: Return placeholder event result
    return null;
  }

  const InnerSearchResult = ({ onClick }) => (
    <a href={makeEventRoute(slug)} onClick={onClick}>
      <div>
        <img src={headerPhoto} width="200px" alt="Event" />
        <h1>{title}</h1>
        <p>{description}</p>
        <span>{city}, {state} {zipcode}</span>
      </div>
    </a>
  );

  return (
    <InternalLink>
      <InnerSearchResult />
    </InternalLink>
  );
};

SearchResult.mapStateToProps = (state, ownProps) => ({
  eventExists: selectEventExists(ownProps.eventId, state),
  title: selectEventTitle(ownProps.eventId, state),
  description: selectEventDescription(ownProps.eventId, state),
  city: selectEventCity(ownProps.eventId, state),
  state: selectEventState(ownProps.eventId, state),
  zipcode: selectEventZipcode(ownProps.eventId, state),
  slug: selectEventSlug(ownProps.eventId, state),
  headerPhoto: selectEventHeaderPhoto(ownProps.eventId, state),
});

export default Rivet(SearchResult);
