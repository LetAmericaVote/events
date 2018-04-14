import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import {
  setSearchMode,
  setSearchIsPending,
  storeGeoLocation,
  fetchEventByGeoLocation,
} from '../actions';
import { FlexAcrossAlignCenter } from '../blocks/Flex';
import { SecondaryCallToAction } from '../blocks/Button';
import { GpsIcon } from '../blocks/Icons';

const SizedGpsIcon = styled(GpsIcon)`
  display: inline-block;
  ${props => props.theme.tinyMarginHorizontal}
`;

const GpsCopy = styled.p`
  ${props => props.theme.reset}
  ${props => props.theme.tinyPaddingVertical}
  ${props => props.theme.tinyMarginRight}

  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
`;

const LocationContainer = styled(SecondaryCallToAction)`
  padding: 0;
`;

const GeoLocationButton = (props) => {
  const {
    copy,
    setSearchMode,
    setSearchIsPending,
    storeGeoLocation,
    fetchEventByGeoLocation,
  } = props;

  if (! ("geolocation" in navigator)) {
    return null;
  }

  const onClick = () => {
    setSearchMode('geo');
    setSearchIsPending(true);

    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      const { longitude, latitude } = coords;

      setSearchIsPending(false);
      storeGeoLocation(longitude, latitude);

      // TODO: Pagination
      fetchEventByGeoLocation(longitude, latitude, 50000);
    }, null, { enableHighAccuracy: false });
  }

  return (
    <LocationContainer onClick={onClick}>
      <FlexAcrossAlignCenter>
        <SizedGpsIcon />
        <GpsCopy>{copy}</GpsCopy>
      </FlexAcrossAlignCenter>
    </LocationContainer>
  );
};

GeoLocationButton.actionCreators = {
  setSearchMode,
  setSearchIsPending,
  storeGeoLocation,
  fetchEventByGeoLocation,
};

export default Rivet(GeoLocationButton);
