import React from 'react';
import Helmet from 'react-helmet';
import Byline from '../components/Byline';
import EventTimePlace from '../components/EventTimePlace';
import Signup from '../components/Signup';
import EventClosed from '../components/EventClosed';
import Community from '../components/Community';
import Rivet from '../hoc/Rivet';
import Section from '../blocks/Section';
import Spacer from '../blocks/Spacer';
import { FloatingSpinner } from '../blocks/Spinner';
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
    return (
      <FloatingSpinner />
    );
  }

  const ActiveComponent = (() => {
    if (isSignedUp) {
      return Community;
    } else if (! isEventOpen) {
      return EventClosed;
    } else {
      return Signup;
    }
  })();

  return (
    <Section>
      <Helmet>
        <title>{title} | Let America Vote, Voting Rights House Party</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={headerPhoto} />
      </Helmet>
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
  eventId: selectEventIdBySlug(ownProps.eventSlug, state),
  eventExists: selectEventExists(
    selectEventIdBySlug(ownProps.eventSlug, state), state),
  title: selectEventTitle(
    selectEventIdBySlug(ownProps.eventSlug, state), state),
  description: selectEventDescription(
    selectEventIdBySlug(ownProps.eventSlug, state), state),
  slug: selectEventSlug(
    selectEventIdBySlug(ownProps.eventSlug, state), state),
  headerPhoto: selectEventHeaderPhoto(
    selectEventIdBySlug(ownProps.eventSlug, state), state),
  hostUserId: selectEventHostUserId(
    selectEventIdBySlug(ownProps.eventSlug, state), state),
  isSignedUp: selectIsAuthenticatedUserSignedUpForEvent(
    selectEventIdBySlug(ownProps.eventSlug, state), state),
  isEventOpen: selectEventIsOpen(
    selectEventIdBySlug(ownProps.eventSlug, state), state),
});

export default Rivet(Event);
