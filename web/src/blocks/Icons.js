import styled from 'styled-components';
import logo from '../assets/icons/logo.svg';
import googleLogo from '../assets/icons/g-logo.png';
import search from '../assets/icons/search.svg';
import gps from '../assets/icons/gps.svg';
import calendar from '../assets/icons/calendar.svg';
import house from '../assets/icons/house.svg';

export const Logo = styled.div`
  ${props => props.theme.reset}

  width: 60px;
  height: 37px;

  background-image: url(${logo});
  background-size: 100% 100%;
`;

const BaseIcon = styled.div`
  ${props => props.theme.reset}

  width: 32px;
  height: 32px;

  background-size: 100% 100%;
`;

export const SearchIcon = styled(BaseIcon)`
  background-image: url(${search});
`;

export const GpsIcon = styled(BaseIcon)`
  background-image: url(${gps});
`;

export const CalendarIcon = styled(BaseIcon)`
  background-image: url(${calendar});
`;

export const HouseIcon = styled(BaseIcon)`
  background-image: url(${house});
`;

export const GoogleIcon = styled.div`
  ${props => props.theme.reset}

  width: 20px;
  height: 20px;

  ${props => props.theme.smallMarginRight}

  background-image: url(${googleLogo});
  background-size: 100% 100%;
`;
