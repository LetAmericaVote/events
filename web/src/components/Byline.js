import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import avatar from '../assets/icons/avatar.svg';
import {
  Logo,
  HouseIcon,
} from '../blocks/Icons';
import {
  FlexAcross,
  FlexDown,
} from '../blocks/Flex';
import {
  selectUserExists,
  selectUserFullName,
  selectUserProfilePhoto,
  selectUserRole,
  selectIsUserFlagged,
  selectAuthenticatedUserRole,
  selectEventHostUserId,
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

const HostIcon = styled(HouseIcon)`
  width: 16px;
  height: 16px;
`;

const AdminIcon = styled(Logo)`
  width: 20px;
  height: 12.3px;
`;

const Byline = (props) => {
  const {
    exists,
    fullName,
    profilePhoto,
    tagline,
    role,
    authenticatedRole,
    isFlagged,
    isHostUser,
  } = props;

  if (! exists) {
    return null;
  }

  const hideDetails = isFlagged && authenticatedRole !== 'admin';

  const displayName = hideDetails ? 'Account suspended' : fullName;
  const displayPhoto = hideDetails ? avatar : (profilePhoto || avatar);

  const hasRoleIcon = role === 'admin' || isHostUser;
  const RoleIcon = () => {
    if (role === 'admin') {
      return <AdminIcon />
    }

    if (isHostUser) {
      return <HostIcon />
    }

    // TODO: Exclamation point for banned users w/ authenticatedRole === 'admin'

    return null;
  }

  return (
    <FlexAcross>
      <div>
        <ProfilePhoto src={displayPhoto} />
      </div>
      <FlexDown>
        <FlexAcross>
          <RoleIcon />
          <Detail enlarge boldend indent={hasRoleIcon}>{displayName}</Detail>
        </FlexAcross>
        {tagline ? <Detail>{tagline}</Detail> : null}
      </FlexDown>
    </FlexAcross>
  );
};

Byline.mapStateToProps = (state, ownProps) => ({
  exists: selectUserExists(ownProps.userId, state),
  role: selectUserRole(ownProps.userId, state),
  authenticatedRole: selectAuthenticatedUserRole(state),
  isFlagged: selectIsUserFlagged(ownProps.userId, state),
  isHostUser: ownProps.eventId ?
    selectEventHostUserId(ownProps.eventId, state) === ownProps.userId : false,
  fullName: selectUserExists(ownProps.userId, state) ?
    selectUserFullName(ownProps.userId, state) : null,
  profilePhoto: selectUserExists(ownProps.userId, state) ?
    selectUserProfilePhoto(ownProps.userId, state) : null,
});

export default Rivet(Byline);
