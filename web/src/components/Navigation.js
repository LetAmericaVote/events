import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import { selectIsAuthenticated } from '../selectors';
import { Logo } from '../blocks/Icons';
import Section from '../blocks/Section';
import InternalLink from '../routing/InternalLink';
import { CallToActionButton } from '../blocks/Button';
import {
  FlexAcross,
  FlexAcrossSpaceBetween,
} from '../blocks/Flex';
import {
  SEARCH_ROUTE,
  PROFILE_ROUTE,
  HOME_ROUTE,
} from '../routing/routes';

const Navigation = (props) => {
  const { isAuthenticated } = props;

  const HomeButton = ({ onClick }) => (
    <a href="/" onClick={(event) => {
      event.preventDefault();
      onClick();
    }}>
      <Logo />
    </a>
  );

  const FindButton = styled(CallToActionButton)`
    display: none;

    ${props => props.theme.mobileLarge`
      display: block;
    `}
  `;

  const NavLink = styled.a`
    font-size: ${props => props.theme.regularFontSize};
    font-family: ${props => props.theme.regularFontFamily};
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    align-self: center;

    ${props => props.theme.baseMarginLeft}
    ${props => props.theme.fg.primary}
  `;

  const NavRow = styled(FlexAcrossSpaceBetween)`
    align-items: center;
  `;

  return (
    <Section>
      <NavRow>
        <InternalLink to={HOME_ROUTE}>
          <HomeButton />
        </InternalLink>
        <FlexAcross>
          <InternalLink to={SEARCH_ROUTE}>
            <FindButton>Find A House Party</FindButton>
          </InternalLink>
          <InternalLink to={PROFILE_ROUTE}>
            <NavLink>
              {isAuthenticated ? "Profile" : "Log in"}
            </NavLink>
          </InternalLink>
        </FlexAcross>
      </NavRow>
    </Section>
  )
}

Navigation.mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state),
});

export default Rivet(Navigation);
