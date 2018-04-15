import styled from 'styled-components';

const Punch = styled.div`
  ${props => props.theme.reset}

  width: 100%;
  ${props => props.theme.basePadding}

  ${props => props.theme.borderRadius}
  
  background: #ff4c7a;
  background: linear-gradient(to right, ${props => props.theme.action}, #ff4c7a);

  text-align: center;
`;

export default Punch;
