import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import InternalLink from '../routing/InternalLink';
import { makeEventRoute } from '../routing/routes';
import EventTimePlace from './EventTimePlace';
import Byline from './Byline';
import {
  Header,
  UnstyledAnchor,
  Paragraph,
} from '../blocks/Type';
import {
  FlexResponsiveHalfColumn,
  FlexResponsiveRow,
} from '../blocks/Flex';
import {
  selectEventTitle,
  selectEventDescription,
  selectEventHeaderPhoto,
  selectEventSlug,
  selectEventExists,
  selectEventHostUserId,
} from '../selectors';

const ResultContainer = styled.article`
  ${props => props.theme.reset}

  display: flex;
  flex-direction: column;
  width: 100%;

  ${props => props.theme.defaultBorderStyle}
  ${props => props.theme.borderRadius}

  ${props => props.theme.baseMarginBottom}

  ${props => props.theme.tablet`
    flex-direction: row;
  `}
`;

const ResultPhotoContainer = styled.div`
  ${props => props.theme.reset}
  ${props => props.theme.basePadding}
`;

const ResultPhoto = styled.div`
  ${props => props.theme.reset}

  width: 100%;
  padding-top: 100%;

  background-size: cover;
  background-image: url(${props => props.src});

  ${props => props.theme.tablet`
    padding-top: 0;
    width: 128px;
    height: 128px;
  `}
`;

const ResultInformationContainer = styled.div`
  ${props => props.theme.reset}

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${props => props.theme.basePadding}
  padding-top: 0;

  ${props => props.theme.tablet`
    ${props => props.theme.basePadding}
    padding-left: 0;
  `}
`;

const SearchResult = (props) => {
  const {
    eventId,
    eventExists,
    title,
    description,
    slug,
    headerPhoto,
    hostUserId,
  } = props;

  if (! eventExists) {
    // TODO: Return placeholder event result
    return null;
  }

  const route = makeEventRoute(slug);

  const InnerSearchResult = ({ onClick }) => (
    <UnstyledAnchor href={route} onClick={(event) => {
      event.preventDefault();
      onClick();
    }}>
      <ResultContainer>
        <ResultPhotoContainer>
          <ResultPhoto src={headerPhoto} />
        </ResultPhotoContainer>
        <ResultInformationContainer>
          <Header>{title}</Header>
          <Paragraph>{description}</Paragraph>
          <FlexResponsiveRow>
            <FlexResponsiveHalfColumn useMargin>
              <EventTimePlace eventId={eventId} />
            </FlexResponsiveHalfColumn>
            <FlexResponsiveHalfColumn>
              {hostUserId ? (
                <Byline userId={hostUserId} tagline="Is Hosting This Event" />
              ) : null}
            </FlexResponsiveHalfColumn>
          </FlexResponsiveRow>
        </ResultInformationContainer>
      </ResultContainer>
    </UnstyledAnchor>
  );

  return (
    <InternalLink to={route}>
      <InnerSearchResult />
    </InternalLink>
  );
};

SearchResult.mapStateToProps = (state, ownProps) => ({
  eventExists: selectEventExists(ownProps.eventId, state),
  title: selectEventTitle(ownProps.eventId, state),
  description: selectEventDescription(ownProps.eventId, state),
  slug: selectEventSlug(ownProps.eventId, state),
  headerPhoto: selectEventHeaderPhoto(ownProps.eventId, state),
  hostUserId: selectEventHostUserId(ownProps.eventId, state),
});

export default Rivet(SearchResult);
