import React from 'react';
import styled from 'styled-components';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Rivet from '../hoc/Rivet';
import Spacer from '../blocks/Spacer';
import {
  Detail,
} from '../blocks/Type';
import {
  ActionMenuButton,
  MenuButton,
} from '../blocks/Button';
import {
  SmileIcon,
} from '../blocks/Icons';
import {
  setFormValue,
  postComment,
} from '../actions';
import {
  TextInput,
  LongTextInput,
} from '../blocks/Input';
import {
  FlexAcross,
  FlexDown,
} from '../blocks/Flex';

const StyledTextInput = styled(TextInput)`
  ${props => props.theme.bg.paper}
  ${props => props.theme.borderRadius}
`;

const StyledLongTextInput = styled(LongTextInput)`
  ${props => props.theme.bg.paper}
  ${props => props.theme.borderRadius}

  min-height: 2em;
`;

const EmojiPickerWrapper = styled.div`
  ${props => props.theme.reset}

  position: relative;
  cursor: pointer;
`;

class WriteComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      hideEmojiPicker: true,
    };
  }

  render() {
    const {
      postComment,
      eventId,
      inReplyToId,
      setFormValue,
    } = this.props;
    const {
      input,
      hideEmojiPicker,
    } = this.state;

    const InputComponent = inReplyToId ?
      StyledTextInput : StyledLongTextInput;

    const limit = inReplyToId ? 25 : 1000;

    const onChange = (event) => {
      const { value } = event.target;
      if (value.length > limit) {
        return;
      }

      this.setState({ input: value });
    };

    const onSubmit = () => {
      setFormValue('reply', inReplyToId, false);
      postComment(input, eventId, inReplyToId);

      this.setState({ input: '' });
    };

    const onCancel = () => {
      setFormValue('reply', inReplyToId, false);
    };

    return (
      <FlexDown>
        <InputComponent value={input} onChange={onChange} />
        <Detail>{input.length}/{limit}</Detail>
        <Spacer tiny />
        <FlexAcross>
          <ActionMenuButton rightIndent onClick={onSubmit}>Post Comment</ActionMenuButton>
          {inReplyToId ? <MenuButton rightIndent onClick={onCancel}>Cancel</MenuButton> : null }
          <SmileIcon onClick={() => this.setState({ hideEmojiPicker: ! hideEmojiPicker })} />
          {hideEmojiPicker ? null : (
            <EmojiPickerWrapper>
              <Picker
                style={{ position: 'absolute', top: '48px', left: '-250px' }}
                onSelect={(emoji) => {
                  onChange({ target: { value: `${input}${emoji.native}`}});
                  this.setState({ hideEmojiPicker: true });
                }}
              />
            </EmojiPickerWrapper>
          )}
        </FlexAcross>
      </FlexDown>
    );
  }
}

WriteComment.actionCreators = {
  setFormValue,
  postComment,
};

export default Rivet(WriteComment);
