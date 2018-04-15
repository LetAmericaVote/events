import React from 'react';
import Byline from '../components/Byline';
import EventTimePlace from '../components/EventTimePlace';
import Signup from '../components/Signup';
import EventClosed from '../components/EventClosed';
import Rivet from '../hoc/Rivet';
import Section from '../blocks/Section';
import Spacer from '../blocks/Spacer';
import {
  FlexResponsiveThirdColumn,
  FlexResponsiveTwoThirdsColumn,
  FlexResponsiveRow,
  FlexDown,
} from '../blocks/Flex';
import {
  Header,
  Paragraph,
} from '../blocks/Type';
import { Image } from '../blocks/ResponsiveImage';
import {
  selectEventIdBySlug,
  selectEventTitle,
  selectEventDescription,
  selectEventHeaderPhoto,
  selectEventSlug,
  selectEventExists,
  selectEventHostUserId,
  selectIsAuthenticatedUserSignedUpForEvent,
  selectEventIsOpen,
} from '../selectors';
import { fetchEventBySlug } from '../actions';


const Event = (props) => {
  const {
    eventId,
    eventExists,
    title,
    description,
    headerPhoto,
    hostUserId,
    isSignedUp,
    isEventOpen,
  } = props;

  if (! eventExists) {
    // TODO: Return block version
    return null;
  }

  const ActiveComponent = (() => {
    if (isSignedUp) {
      return null;
    } else if (! isEventOpen) {
      return EventClosed;
    } else {
      return Signup;
    }
  })();

  return (
    <Section>
      <FlexResponsiveRow>
        <FlexResponsiveThirdColumn useMargin>
          <FlexDown fill>
            <Image src={headerPhoto} />
            <Spacer />
            <EventTimePlace eventId={eventId} />
            <Spacer />
            <Byline userId={hostUserId} tagline="Is hosting this house party" />
          </FlexDown>
        </FlexResponsiveThirdColumn>
        <FlexResponsiveTwoThirdsColumn>
          <FlexDown fill>
            <Header>{title}</Header>
            <Paragraph>{description}</Paragraph>
            <ActiveComponent eventId={eventId} />
          </FlexDown>
        </FlexResponsiveTwoThirdsColumn>
      </FlexResponsiveRow>
    </Section>
  );
}

Event.mapStateToProps = (state, ownProps) => ({
  eventExists: selectEventExists(ownProps.eventId, state),
  title: selectEventTitle(ownProps.eventId, state),
  description: selectEventDescription(ownProps.eventId, state),
  slug: selectEventSlug(ownProps.eventId, state),
  headerPhoto: selectEventHeaderPhoto(ownProps.eventId, state),
  hostUserId: selectEventHostUserId(ownProps.eventId, state),
  isSignedUp: selectIsAuthenticatedUserSignedUpForEvent(ownProps.eventId, state),
  isEventOpen: selectEventIsOpen(ownProps.eventId, state),
});

const EventWrapper = (props) => {
  const {
    eventId,
    eventSlug,
    fetchEventBySlug,
  } = props;

  const WrappedEvent = Rivet(Event);

  if (! eventId) {
    fetchEventBySlug(eventSlug);
  }

  return (
    <WrappedEvent {...props} />
  );
};

EventWrapper.mapStateToProps = (state, ownProps) => ({
  eventId: selectEventIdBySlug(ownProps.eventSlug, state),
});

EventWrapper.actionCreators = {
  fetchEventBySlug,
};

export default Rivet(EventWrapper);
