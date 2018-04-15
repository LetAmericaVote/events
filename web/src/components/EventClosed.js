import React from 'react';
import Rivet from '../hoc/Rivet';
import Punch from '../blocks/Punch';
import { FlexAcrossJustifyCenter } from '../blocks/Flex';
import { SecondaryCallToAction } from '../blocks/Button';
import InternalLink from '../routing/InternalLink';
import { InvertedSectionHeader } from '../blocks/Type';
import { SEARCH_ROUTE } from '../routing/routes';
import {
  CLOSED_EVENT_HEADER
} from '../copy';

const EventClosed = (props) => {
  return (
    <Punch>
      <InvertedSectionHeader>
        {CLOSED_EVENT_HEADER}
      </InvertedSectionHeader>
      <FlexAcrossJustifyCenter>
        <InternalLink to={SEARCH_ROUTE}>
          <SecondaryCallToAction>Find A House Party</SecondaryCallToAction>
        </InternalLink>
      </FlexAcrossJustifyCenter>
    </Punch>
  );
};

export default Rivet(EventClosed);
