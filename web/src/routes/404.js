import React from 'react';
import Rivet from '../hoc/Rivet';
import Section from '../blocks/Section';
import HouseParty from '../blocks/HouseParty';
import InternalLink from '../routing/InternalLink';
import { SEARCH_ROUTE } from '../routing/routes';
import {
  selectLastRouteVisited,
} from '../selectors';
import {
  HeroBold,
  Paragraph,
  StyledAnchor,
} from '../blocks/Type';
import {
  _404_HERO,
  _404_COPY,
  _404_BACK,
  _404_FIND_HOUSE_PARTY,
} from '../copy';

const _404 = (props) => (
  <Section>
    <HeroBold centered>{_404_HERO}</HeroBold>
    <Paragraph centered>{_404_COPY}</Paragraph>
    {props.lastRouteVisited ? (
      <InternalLink to={props.lastRouteVisited}>
        <StyledAnchor centered>{_404_BACK}</StyledAnchor>
      </InternalLink>
    ) : (
      <InternalLink to={SEARCH_ROUTE}>
        <StyledAnchor centered>{_404_FIND_HOUSE_PARTY}</StyledAnchor>
      </InternalLink>
    )}
    <HouseParty />
  </Section>
);

_404.mapStateToProps = (state) => ({
  lastRouteVisited: selectLastRouteVisited(state),
});

export default Rivet(_404);
