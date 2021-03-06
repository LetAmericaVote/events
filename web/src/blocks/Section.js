import styled from 'styled-components';

const Section = styled.section`
  ${props => props.theme.reset}

  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  ${props => props.theme.basePadding}
`;

export default Section;
