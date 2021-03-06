import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import Punch from '../blocks/Punch';
import Spacer from '../blocks/Spacer';
import {
  FlexDown,
  FlexAcross,
} from '../blocks/Flex';
import {
  CalendarIcon,
  HouseIcon,
} from '../blocks/Icons';
import {
  Detail,
  InvertedParagraph,
} from '../blocks/Type';
import {
  selectEventCity,
  selectEventState,
  selectEventZipcode,
  selectEventDateTime,
  selectEventStreetAddress,
  selectEventExists,
} from '../selectors';
import {
  CLOSED_EVENT_HEADER
} from '../copy';

const DetailEnd = styled(Detail)`
  align-self: flex-end;
`;

const Warning = styled(InvertedParagraph)`
  margin-bottom: 0;
`;

const EventTimePlace = (props) => {
  const {
    exists,
    city,
    state,
    zipcode,
    dateTime,
    streetAddress,
    warnIfEventOver,
  } = props;

  if (! exists) {
    return null;
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
      {warnIfEventOver && new Date(dateTime).getTime() < Date.now() ? (
        <FlexDown>
          <Spacer />
          <Punch>
            <Warning>{CLOSED_EVENT_HEADER}</Warning>
          </Punch>
        </FlexDown>
      ) : null}
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
