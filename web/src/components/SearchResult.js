import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import InternalLink from '../routing/InternalLink';
import { makeEventRoute } from '../routing/routes';
import EventTimePlace from './EventTimePlace';
import Byline from './Byline';
import Spacer from '../blocks/Spacer';
import ResponsiveImage, { Image } from '../blocks/ResponsiveImage';
import {
  Header,
  UnstyledAnchor,
  Paragraph,
} from '../blocks/Type';
import {
  FlexResponsiveHalfColumn,
  FlexResponsiveRow,
  FlexDown,
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

  ${props => props.theme.bg.paper}

  ${props => props.reduced ? '' : props.theme.defaultBorderStyle}
  ${props => props.theme.borderRadius}

  ${props => props.theme.baseMarginBottom}

  ${props => props.reduced ? '' : props.theme.tablet`
    flex-direction: row;
  `}
`;

const ResultPhotoContainer = styled.div`
  ${props => props.theme.reset}
  ${props => props.reduced ? '' : props.theme.basePadding}
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

const ReducedInformationContainer = styled.div`
  ${props => props.theme.reset}

  ${props => props.theme.tinyPadding}

  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const SearchAnchor = styled(UnstyledAnchor)`
  width: 100%;
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
    reduced,
  } = props;

  if (! eventExists) {
    return null;
  }

  const route = makeEventRoute(slug);
  const ContainerType = reduced ? ReducedInformationContainer : ResultInformationContainer;
  const ImageType = reduced ? Image : ResponsiveImage;

  const InnerSearchResult = ({ onClick }) => (
    <SearchAnchor href={route} onClick={(event) => {
      event.preventDefault();
      onClick();
    }}>
      <ResultContainer reduced={reduced}>
        <ResultPhotoContainer reduced={reduced}>
          <ImageType src={headerPhoto} width="128px" height="128px" />
        </ResultPhotoContainer>
        <ContainerType>
          <Header>{title}</Header>
          {reduced ? null : <Paragraph>{description}</Paragraph>}
          {reduced ? (
            <FlexDown>
              <EventTimePlace eventId={eventId} warnIfEventOver />
              {hostUserId ? (
                <FlexDown>
                  <Spacer />
                  <Byline userId={hostUserId} tagline="Is hosting this house party" />
                </FlexDown>
              ) : null}
            </FlexDown>
          ) : (
            <FlexResponsiveRow>
              <FlexResponsiveHalfColumn useMargin>
                <EventTimePlace eventId={eventId} warnIfEventOver />
              </FlexResponsiveHalfColumn>
              <FlexResponsiveHalfColumn>
                {hostUserId ? (
                  <Byline userId={hostUserId} tagline="Is hosting this house party" />
                ) : null}
              </FlexResponsiveHalfColumn>
            </FlexResponsiveRow>
          )}
        </ContainerType>
      </ResultContainer>
    </SearchAnchor>
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
