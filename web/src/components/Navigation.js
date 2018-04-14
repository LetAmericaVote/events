import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import { selectIsAuthenticated } from '../selectors';
import InternalLink from '../routing/InternalLink';
import { FlexAcross, FlexHalfColumn } from '../blocks/Flex';
import Section from '../blocks/Section';
import Logo from '../blocks/Logo';
import { SEARCH_ROUTE, PROFILE_ROUTE } from '../routing/routes';
import {
  CallToActionButton,
  SecondaryCallToAction,
} from '../blocks/Button';

const hamburgerHeight = '36px';

const Hamburger = styled.div`
  display: block;
  width: ${hamburgerHeight};
  height: 24px;
  position: relative;

  ${props => props.theme.desktopSmall`
    display: none;
  `}
`;

const layerHeight = '2px';

const HamburgerLayer = styled.span`
  width: 100%;
  height: 2px;
  border-radius: ${layerHeight};
  display: block;
  ${props => props.theme.bg.primary}
  position: absolute;
  left: 0;
`;

const TopLayer = styled(HamburgerLayer)`
  top: 0;
  ${props => props.isOpen ? `
    transform: translateY(10px) rotateZ(45deg);
  ` : ''}
`;

const MiddleLayer = styled(HamburgerLayer)`
  top: calc(50% - ${layerHeight});
  ${props => props.isOpen ? 'display: none;' : ''}
`;

const BottomLayer = styled(HamburgerLayer)`
  bottom: 0;
  ${props => props.isOpen ? `
    transform: translateY(-12px) rotateZ(-45deg);
  ` : ''}
`;

const TabColumn = styled(FlexHalfColumn)`
  align-items: center;
  justify-content: flex-end;
`;

const TabRow = styled(FlexAcross)`
  display: none;

  ${props => props.theme.desktopSmall`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  `}
`;

const NavigationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${props => props.theme.bg.primary}
`;

const ModalNavSection = styled.div`
  ${props => props.theme.bg.paper}
`;

const NavLink = styled.a`
  font-size: ${props => props.theme.regularFontSize};
  font-family: ${props => props.theme.regularFontFamily};
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  ${props => props.theme.fg.primary}
`;

const ModalNavLink = styled(NavLink)`
  ${props => props.theme.fg.paper}
  font-size: ${props => props.theme.largeFontSize};
  font-family: ${props => props.theme.heavyFontFamily};
`;

const ModalNavLinks = styled(Section)`
  height: calc(100% - 85px);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Navigation = (props) => {
  const {
    toggleMenu,
    isMenuOpen,
    isAuthenticated,
  } = props;

  const HomeButton = ({ onClick }) => (
    <a href="/" onClick={(event) => {
      event.preventDefault();
      onClick();

      if (isMenuOpen) {
        toggleMenu();
      }
    }}>
      <Logo />
    </a>
  );

  const NavigationMenu = () => (
    <Section>
      <FlexAcross>
        <FlexHalfColumn>
          <InternalLink to="/">
            <HomeButton />
          </InternalLink>
        </FlexHalfColumn>
        <TabColumn>
          <Hamburger onClick={toggleMenu}>
            <TopLayer isOpen={isMenuOpen} />
            <MiddleLayer isOpen={isMenuOpen} />
            <BottomLayer isOpen={isMenuOpen} />
          </Hamburger>
          <TabRow>
            <InternalLink to={SEARCH_ROUTE}>
              <CallToActionButton>Find A House Party</CallToActionButton>
            </InternalLink>
            <NavLink href="https://google.com">Host</NavLink>
            <InternalLink to={PROFILE_ROUTE}>
              <NavLink>{isAuthenticated ? "Profile" : "Log in"}</NavLink>
            </InternalLink>
          </TabRow>
        </TabColumn>
      </FlexAcross>
    </Section>
  );

  if (isMenuOpen) {
    return (
      <NavigationModal>
        <ModalNavSection>
          <NavigationMenu />
        </ModalNavSection>
        <ModalNavLinks>
          <InternalLink to={SEARCH_ROUTE} postRoute={toggleMenu}>
            <SecondaryCallToAction>Find A House Party</SecondaryCallToAction>
          </InternalLink>
          <ModalNavLink href="https://google.com">Host</ModalNavLink>
          <InternalLink to={PROFILE_ROUTE} postRoute={toggleMenu}>
            <ModalNavLink>{isAuthenticated ? "Profile" : "Log in"}</ModalNavLink>
          </InternalLink>
        </ModalNavLinks>
      </NavigationModal>
    );
  }

  return (
    <NavigationMenu />
  );
};

class NavigationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      isMenuOpen: ! this.state.isMenuOpen,
    });
  }

  render() {
    return (
      <Navigation
        isMenuOpen={this.state.isMenuOpen}
        toggleMenu={this.toggleMenu}
        isAuthenticated={this.props.isAuthenticated}
      />
    );
  }
}

NavigationContainer.mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state),
});

export default Rivet(NavigationContainer);
