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
  updateComment,
} from '../actions';
import {
  TextInput,
  LongTextInput,
} from '../blocks/Input';
import {
  FlexAcross,
  FlexDown,
} from '../blocks/Flex';
import {
  selectCommentMessage,
} from '../selectors';

const StyledTextInput = styled(TextInput)`
  ${props => props.theme.borderRadius}
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
      input: props.initialMessage,
      hideEmojiPicker: true,
    };
  }

  render() {
    const {
      postComment,
      updateComment,
      eventId,
      inReplyToId,
      setFormValue,
      commentId,
    } = this.props;
    const {
      input,
      hideEmojiPicker,
    } = this.state;

    const InputComponent = inReplyToId ?
      StyledTextInput : LongTextInput;

    const limit = inReplyToId ? 24 : 1000;

    const onChange = (event) => {
      const { value } = event.target;
      if (value.length > limit) {
        return;
      }

      this.setState({ input: value });
    };

    const onSubmit = () => {
      setFormValue('reply', commentId ? commentId : inReplyToId, false);

      if (commentId) {
        updateComment(commentId, input);
        setFormValue('edit', commentId, false);
      } else {
        postComment(input, eventId, inReplyToId);
      }

      this.setState({ input: '' });
    };

    const onCancel = () => {
      setFormValue('reply', inReplyToId || commentId, false);
    };

    const emojiOffset = inReplyToId ? -250 : -150;

    return (
      <FlexDown>
        <InputComponent value={input} onChange={onChange} />
        <Detail>{input.length}/{limit}</Detail>
        <Spacer tiny />
        <FlexAcross>
          <ActionMenuButton rightIndent onClick={onSubmit}>{commentId ? 'Edit' : 'Post'} Comment</ActionMenuButton>
          {(inReplyToId || commentId) ? <MenuButton rightIndent onClick={onCancel}>Cancel</MenuButton> : null }
          <SmileIcon onClick={() => this.setState({ hideEmojiPicker: ! hideEmojiPicker })} />
          {hideEmojiPicker ? null : (
            <EmojiPickerWrapper>
              <Picker
                style={{ position: 'absolute', top: '48px', left: `${emojiOffset}px` }}
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

WriteComment.mapStateToProps = (state, ownProps) => ({
  initialMessage: ownProps.commentId ?
    selectCommentMessage(ownProps.commentId, state) || '' : '',
})

WriteComment.actionCreators = {
  setFormValue,
  postComment,
  updateComment,
};

export default Rivet(WriteComment);
