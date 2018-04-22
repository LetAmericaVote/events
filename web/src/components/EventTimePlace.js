import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import {
  PlaceholderRect,
  PlaceholderRectContainer,
} from '../blocks/Placeholder';
import {
  FlexDown,
  FlexAcross,
} from '../blocks/Flex';
import {
  CalendarIcon,
  HouseIcon,
} from '../blocks/Icons';
import { Detail } from '../blocks/Type';
import {
  selectEventCity,
  selectEventState,
  selectEventZipcode,
  selectEventDateTime,
  selectEventStreetAddress,
  selectEventExists,
} from '../selectors';

const DetailEnd = styled(Detail)`
  align-self: flex-end;
`;

const EventTimePlace = (props) => {
  const {
    exists,
    city,
    state,
    zipcode,
    dateTime,
    streetAddress,
  } = props;

  if (! exists) {
    return (
      <PlaceholderRectContainer height="120px">
        <FlexDown fill>
          <PlaceholderRect width="44px" bottomSpacing />
          <PlaceholderRect width="64px" bottomSpacing />
        </FlexDown>
      </PlaceholderRectContainer>
    );
  }

  const formattedTime = dateTime ? (
    new Date(dateTime).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      hour12: true,
    })
  ) : '';

  return (
    <FlexDown>
      <FlexAcross useMargin>
        <CalendarIcon />
        <DetailEnd indent>{formattedTime}</DetailEnd>
      </FlexAcross>
      <FlexAcross>
        <HouseIcon />
        <DetailEnd indent>{streetAddress} {city}, {state} {zipcode}</DetailEnd>
      </FlexAcross>
    </FlexDown>
  );
};

EventTimePlace.mapStateToProps = (state, ownProps) => ({
  exists: selectEventExists(ownProps.eventId, state),
  streetAddress: selectEventStreetAddress(ownProps.eventId, state),
  city: selectEventCity(ownProps.eventId, state),
  state: selectEventState(ownProps.eventId, state),
  zipcode: selectEventZipcode(ownProps.eventId, state),
  dateTime: selectEventDateTime(ownProps.eventId, state),
});

export default Rivet(EventTimePlace);
