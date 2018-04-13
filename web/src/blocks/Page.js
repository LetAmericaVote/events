import styled from 'styled-components';

const Page = styled.main`
  ${props => props.theme.reset}
  ${props => props.theme.bg.paperColor}

  width: 100%;
  height: 100%;
`;

export default Page;
