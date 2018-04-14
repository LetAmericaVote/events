import styled from 'styled-components';
import logo from '../assets/icons/logo.svg';
import search from '../assets/icons/search.svg';
import gps from '../assets/icons/gps.svg';

export const Logo = styled.div`
  ${props => props.theme.reset}

  width: 60px;
  height: 37px;

  background-image: url(${logo});
  background-size: 100% 100%;
`;

export const SearchIcon = styled.div`
  ${props => props.theme.reset}

  background-image: url(${search});
  background-size: 100% 100%;
`;

export const GpsIcon = styled.div`
  ${props => props.theme.reset}

  background-image: url(${gps});
  background-size: 100% 100%;
`;
