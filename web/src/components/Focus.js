import React from 'react';
import styled from 'styled-components';
import {
  FlexDown,
} from '../blocks/Flex';
import {
  HeroInverted,
  HeroBoldInverted,
} from '../blocks/Type';

const FocusContainer = styled.div`
  ${props => props.theme.reset}

  ${props => props.theme.basePadding}

  background-size: cover;
  background-position: center;
  background-image: url(${props => props.src});
`;

const FocusInnerContainer = styled.div`
  ${props => props.theme.reset}

  ${props => props.theme.basePadding}

  ${props => props.theme.defaultBorderStyle}
`;

const Focus = (props) => {
  const {
    src,
    headerCopy,
    callToActionCopy,
  } = props;

  return (
    <FocusContainer src={src}>
      <FocusInnerContainer>
        <HeroInverted centered>{headerCopy}</HeroInverted>
        <HeroBoldInverted centered>{callToActionCopy}</HeroBoldInverted>
      </FocusInnerContainer>
    </FocusContainer>
  );
};

export default Focus;
