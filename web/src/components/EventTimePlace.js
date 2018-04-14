import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
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
} from '../selectors';

const DetailEnd = styled(Detail)`
  align-self: flex-end;
`;

const EventTimePlace = (props) => {
  const {
    city,
    state,
    zipcode,
    dateTime,
  } = props;

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
        <DetailEnd indent>{city}, {state} {zipcode}</DetailEnd>
      </FlexAcross>
    </FlexDown>
  );
};

EventTimePlace.mapStateToProps = (state, ownProps) => ({
  city: selectEventCity(ownProps.eventId, state),
  state: selectEventState(ownProps.eventId, state),
  zipcode: selectEventZipcode(ownProps.eventId, state),
  dateTime: selectEventDateTime(ownProps.eventId, state),
});

export default Rivet(EventTimePlace);
