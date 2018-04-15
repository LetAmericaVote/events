import React from 'react';
import styled from 'styled-components';
import leftPart from '../assets/loader/left.svg';
import rightPart from '../assets/loader/right.svg';
import middlePart from '../assets/loader/middle.svg';

// TODO: Finish this later
// http://tobiasahlin.com/blog/curved-path-animations-in-css/

const SpinnerPartContainer = styled.div`
  ${props => props.theme.reset}
  height: 37.15px;
  position: absolute;
  top: 0;
`;

const SpinnerPart = styled.div`
  ${props => props.theme.reset}
  background-size: 100% 100%;
  background-image: url(${props => props.src});
  height: 100%;
`;

const LeftContainer = styled(SpinnerPartContainer)`
  left: 0;
`;

const LeftPart = styled(SpinnerPart)`
  width: 32.65px;
`;

const MiddlePartContainer = styled(SpinnerPartContainer)`
  left: 16.35px;
`;

const MiddlePart = styled(SpinnerPart)`
  width: 27.75px;
`;

const RightPartContainer = styled(SpinnerPartContainer)`
  left: 24px
`;

const RightPart = styled(SpinnerPart)`
  width: 35.9px;
`;

const SpinnerContainer = styled.div`
  ${props => props.theme.reset};

  width: 100%;
  height: 100%;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = () => (
  <SpinnerContainer>
    <LeftContainer>
      <LeftPart src={leftPart} />
    </LeftContainer>
    <MiddlePartContainer>
      <MiddlePart src={middlePart} />
    </MiddlePartContainer>
    <RightPartContainer>
      <RightPart src={rightPart} />
    </RightPartContainer>
  </SpinnerContainer>
);

export default Spinner;
