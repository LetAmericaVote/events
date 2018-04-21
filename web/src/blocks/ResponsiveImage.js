import styled from 'styled-components';

export const Image = styled.div`
  ${props => props.theme.reset}

  width: 100%;
  padding-top: 100%;

  background-size: cover;
  background-position: center;
  background-image: url(${props => props.src});
`;

const ResponsiveImage = styled(Image)`
  ${props => props.theme.tablet`
    padding-top: 0;
    width: ${props => props.width};
    height: ${props => props.height};
  `}
`;

export default ResponsiveImage;
