import React from 'react';
import InternalLink from '../routing/InternalLink';
import { FlexAcross, FlexHalfColumn } from '../blocks/Flex';
import Section from '../blocks/Section';
import Logo from '../blocks/Logo';

const Navigation = (props) => {
  const HomeButton = ({ onClick }) => (
    <a href="/" onClick={(event) => {
      event.preventDefault();
      onClick();
    }}>
      <Logo />
    </a>
  );

  return (
    <Section>
      <FlexAcross>
        <FlexHalfColumn>
          <InternalLink>
            <HomeButton />
          </InternalLink>
        </FlexHalfColumn>
        <FlexHalfColumn>

        </FlexHalfColumn>
      </FlexAcross>
    </Section>
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
      />
    );
  }
}

export default NavigationContainer;
