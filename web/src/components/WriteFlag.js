import React from 'react';
import Rivet from '../hoc/Rivet';
import Spacer from '../blocks/Spacer';
import {
  ActionMenuButton,
  MenuButton,
} from '../blocks/Button';
import {
  LongTextInput,
} from '../blocks/Input';
import {
  FlexDown,
  FlexAcross,
} from '../blocks/Flex';
import {
  Detail,
} from '../blocks/Type';
import {
  setFormValue,
  postFlag,
} from '../actions';

class WriteFlag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reason: '',
    };
  }

  render() {
    const onCancel = () => {
      this.props.setFormValue('flag', this.props.targetId, false);

    };

    const onFlag = () => {
      this.props.postFlag(this.state.reason, this.props.targetType, this.props.targetId);
      onCancel();
    };

    return (
      <FlexDown>
        <Detail>Quick description of why this is being flagged.</Detail>
        <Detail boldend>NOTE: Flagging a comment will immediately remove it from public view.</Detail>
        <Spacer tiny />
        <LongTextInput
          value={this.state.reason}
          onChange={event => this.setState({ reason: event.target.value })}
        />
        <Spacer small />
        <FlexAcross>
          <ActionMenuButton rightIndent onClick={onFlag}>Flag {this.props.targetType}</ActionMenuButton>
          <MenuButton onClick={onCancel}>Cancel</MenuButton>
        </FlexAcross>
      </FlexDown>
    );
  }
}

WriteFlag.actionCreators = {
  postFlag,
  setFormValue,
};

export default Rivet(WriteFlag);
