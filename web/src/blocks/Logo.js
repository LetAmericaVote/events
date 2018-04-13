import styled from 'styled-components';
import logo from '../assets/logo.svg';

const Logo = styled.div`
  ${props => props.theme.reset}

  display: block;
  width: 60px;
  height: 37px;

  background-image: url(${logo});
  background-size: 100% 100%;
`;

export default Logo;
