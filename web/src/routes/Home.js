import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import Section from '../blocks/Section';
import EventMap from '../components/EventMap';
import SearchBar from '../components/SearchBar';
import Spacer from '../blocks/Spacer';
import InternalLink from '../routing/InternalLink';
import {
  SEARCH_ROUTE,
} from '../routing/routes';
import {
  CallToActionButton,
} from '../blocks/Button';
import {
  Hero,
  HeroHighlight,
  HeroBold,
  SectionHeader,
  Paragraph,
} from '../blocks/Type';
import {
  FlexDown,
  FlexResponsiveRow,
  FlexResponsiveHalfColumn,
} from '../blocks/Flex';
import {
  HOME_HERO,
  HOME_HEADER,
  HOME_SUB_1,
  HOME_SUB_2,
} from '../copy';

const SearchBarContainer = styled.div`
  ${props => props.theme.reset}

  flex-grow: 1;

  ${props => props.theme.baseMarginBottom}

  ${props => props.theme.tablet`
    margin-bottom: 0;

    ${props => props.theme.baseMarginRight}
  `}
`;

const Home = (props) => {
  return (
      <Section>
        <FlexDown>
          <Hero>Are you tired of <HeroHighlight>Republicans</HeroHighlight> taking away your <HeroHighlight>right to vote?</HeroHighlight></Hero>
          <HeroBold>Join the party.</HeroBold>
          <Paragraph centered>Find a voting rights house party near you and stand up for voting rights.</Paragraph>
          <FlexResponsiveRow>
            <SearchBarContainer>
              <SearchBar />
            </SearchBarContainer>
            <InternalLink to={SEARCH_ROUTE}>
              <CallToActionButton centered>Search For House Party</CallToActionButton>
            </InternalLink>
          </FlexResponsiveRow>
          <Spacer large />
          <Spacer large />
          <FlexResponsiveRow>
            <FlexResponsiveHalfColumn>
              <FlexDown>
                <SectionHeader>We're throwing parties across the nation</SectionHeader>
                <Paragraph>{HOME_SUB_1}</Paragraph>
                <Paragraph>{HOME_SUB_2}</Paragraph>
              </FlexDown>
            </FlexResponsiveHalfColumn>
            <FlexResponsiveHalfColumn>
              <EventMap />
            </FlexResponsiveHalfColumn>
          </FlexResponsiveRow>
        </FlexDown>
      </Section>
  );
}

export default Rivet(Home);
