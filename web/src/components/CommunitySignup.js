import React from 'react';
import Punch from '../blocks/Punch';
import SignupButton from '../components/SignupButton';
import {
  InvertedSectionHeader,
  InvertedParagraph,
} from '../blocks/Type';
import {
  FlexAcrossJustifyCenter,
} from '../blocks/Flex';
import {
  HOME_COMMUNITY_SIGNUP_HEADER,
  HOME_COMMUNITY_SIGNUP_COPY,
} from '../copy';

const CommunitySignup = (props) => {
  return (
    <Punch>
      <InvertedSectionHeader centered>{HOME_COMMUNITY_SIGNUP_HEADER}</InvertedSectionHeader>
      <InvertedParagraph>{HOME_COMMUNITY_SIGNUP_COPY[0]}</InvertedParagraph>
      <InvertedParagraph>{HOME_COMMUNITY_SIGNUP_COPY[1]}</InvertedParagraph>
      <FlexAcrossJustifyCenter>
        <SignupButton />
      </FlexAcrossJustifyCenter>
    </Punch>
  );
};

export default CommunitySignup;
