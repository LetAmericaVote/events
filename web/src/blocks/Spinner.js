import React from 'react';
import styled, { keyframes } from 'styled-components';
import colors from '../theme/colors';

// TODO: Finish this later
// http://tobiasahlin.com/blog/curved-path-animations-in-css/

const xAlpha = keyframes`
  50% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateX(50px);
  }
`;

const xBravo = keyframes`
  50% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateX(-25px);
  }
`;

const yAlpha = keyframes`
  50% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateY(25px);
  }
`;

const yBravo = keyframes`
  50% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateY(-50px);
  }
`;

const Dot = styled.div`
  animation: ${props => props.xAxis} 2.5s infinite cubic-bezier(0.02, 0.01, 0.21, 1);

  &:after {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.color};
    animation: ${props => props.yAxis} 2.5s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
  }
`;

const SpinnerContainer = styled.div`
  ${props => props.theme.reset};
  width: 100%;
`;

const Spinner = (props) => {
  return (
    <SpinnerContainer>
      <Dot color={colors.action} xAxis={xAlpha} yAxis={yAlpha} />
      <Dot color={colors.primary} xAxis={xBravo} yAxis={yAlpha} />
      <Dot color={colors.secondary} xAxis={xAlpha} yAxis={yBravo} />
    </SpinnerContainer>
  );
};

const FloatingSpinnerContainer = styled.div`
  ${props => props.theme.reset}

  position: absolute;
  top: calc(50%);
  left: calc(50%);
`;

export const FloatingSpinner = (props) => (
  <FloatingSpinnerContainer>
    <Spinner />
  </FloatingSpinnerContainer>
);

export default Spinner;
