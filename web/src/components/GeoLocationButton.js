import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import { FlexAcrossAlignCenter } from '../blocks/Flex';
import { SecondaryCallToAction } from '../blocks/Button';
import { GpsIcon } from '../blocks/Icons';

const SizedGpsIcon = styled(GpsIcon)`
  width: 32px;
  height: 32px;
  display: inline-block;
  ${props => props.theme.tinyMarginHorizontal}
`;

const GpsCopy = styled.p`
  ${props => props.theme.reset}
  ${props => props.theme.tinyPaddingVertical}
  ${props => props.theme.tinyMarginRight}
`;

const LocationContainer = styled(SecondaryCallToAction)`
  padding: 0;
`;

const GeoLocationButton = (props) => {
  const { copy } = props;

  return (
    <LocationContainer>
      <FlexAcrossAlignCenter>
        <SizedGpsIcon />
        <GpsCopy>{copy}</GpsCopy>
      </FlexAcrossAlignCenter>
    </LocationContainer>
  );
};

export default Rivet(GeoLocationButton);
