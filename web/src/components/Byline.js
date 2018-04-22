import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import {
  PlaceholderRect,
  PlaceholderRectContainer,
  PlaceholderCircle,
} from '../blocks/Placeholder';
import {
  FlexAcross,
  FlexDown,
} from '../blocks/Flex';
import {
  selectUserExists,
  selectUserFullName,
  selectUserProfilePhoto,
} from '../selectors';
import { Detail } from '../blocks/Type';

const ProfilePhoto = styled.div`
  ${props => props.theme.reset}

  width: 36px;
  height: 36px;

  background-size: cover;
  background-image: url(${props => props.src});

  ${props => props.theme.tinyMarginRight}

  border-radius: 50%;
  ${props => props.theme.defaultBorderStyle}
`;

const Byline = (props) => {
  const {
    exists,
    fullName,
    profilePhoto,
    tagline,
  } = props;

  if (! exists) {
    return (
      <PlaceholderRectContainer height="80px">
        <FlexAcross fill>
          <PlaceholderCircle width="36px" height="30px" />
          <FlexDown fill>
            <PlaceholderRect width="64px" darken indent bottomSpacing />
            <PlaceholderRect width="75px" indent bottomSpacing />
          </FlexDown>
        </FlexAcross>
      </PlaceholderRectContainer>
    );
  }

  return (
    <FlexAcross>
      <ProfilePhoto src={profilePhoto} />
      <FlexDown>
        <Detail enlarge boldend>{fullName}</Detail>
        {tagline ? <Detail>{tagline}</Detail> : null}
      </FlexDown>
    </FlexAcross>
  );
};

Byline.mapStateToProps = (state, ownProps) => ({
  exists: selectUserExists(ownProps.userId, state),
  fullName: selectUserExists(ownProps.userId, state) ?
    selectUserFullName(ownProps.userId, state) : null,
  profilePhoto: selectUserExists(ownProps.userId, state) ?
    selectUserProfilePhoto(ownProps.userId, state) : null,
});

export default Rivet(Byline);
