import React from 'react';
import Rivet from '../hoc/Rivet';
import styled from 'styled-components';
import { closeModal } from '../actions';
import {
  FlexDown,
  FlexAcrossJustifyCenter,
} from '../blocks/Flex';
import {
  SectionHeader,
} from '../blocks/Type';
import {
  CallToActionButton,
} from '../blocks/Button';

export const ModalContainer = styled.div`
  ${props => props.theme.reset}

  width: 100%;
  max-width: 400px;
  margin: auto;

  ${props => props.theme.borderRadius}

  ${props => props.theme.bg.paper}
`;

export const ModalSpacer = styled.div`
  ${props => props.theme.reset}

  width: 100%;

  ${props => props.theme.smallPaddingVertical}
  ${props => props.theme.basePaddingHorizontal}
`;

export const ModalHeader = styled(SectionHeader)`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 0;
`;

const ModalDot = styled.div`
  ${props => props.theme.reset}

  width: 12px;
  height: 12px;

  border-radius: 50%;

  ${props => props.active ? props.theme.bg.primary : props.theme.bg.cloud}

  ${props => props.theme.extraTinyMarginHorizontal}
`;

const ModalSubmitButton = styled(CallToActionButton)`
  width: 100%;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  text-align: center;
  ${props => props.theme.bg.primary}
  ${props => props.theme.smallPaddingVertical}
`;

const ModalCancelButton = styled.a`
  ${props => props.theme.reset}

  font-family: ${props => props.theme.thinFontFamily};
  font-size: ${props => props.theme.regularFontSize};

  ${props => props.theme.fg.paper}

  text-decoration: underline;
  text-align: center;

  cursor: pointer;

  ${props => props.theme.baseMarginTop}
`;

const BaseModal = (props) => {
  const {
    title,
    stepIndex,
    totalSteps,
    onSubmit,
    submitCopy,
    cancelMessage,
    children,
    closeModal,
    SubmitWrapper,
  } = props;

  const SubmitButtonType = SubmitWrapper ?
    SubmitWrapper(ModalSubmitButton) : ModalSubmitButton;

  const SubmitButton = (props) => {
    const { onClick } = props;

    return (
      <SubmitButtonType onClick={onClick ? onClick : onSubmit}>
        {submitCopy}
      </SubmitButtonType>
    );
  }

  return (
    <FlexDown fill>
      <ModalContainer>
        <FlexDown>
          {stepIndex && totalSteps ? (
            <ModalSpacer>
              <FlexAcrossJustifyCenter>
                {[...Array(totalSteps).keys()].map((item) =>
                  <ModalDot active={stepIndex === item + 1} key={item} />
                )}
              </FlexAcrossJustifyCenter>
            </ModalSpacer>
          ) : null}
          <ModalSpacer>
            <ModalHeader>{title}</ModalHeader>
          </ModalSpacer>
          <ModalSpacer>
            {children}
          </ModalSpacer>
          <SubmitButton />
        </FlexDown>
      </ModalContainer>
      {cancelMessage ? (
        <ModalCancelButton onClick={closeModal} key="cancel">
          {cancelMessage}
        </ModalCancelButton>
      ) : null}
    </FlexDown>
  );
};

BaseModal.actionCreators = {
  closeModal,
};

export default Rivet(BaseModal);
