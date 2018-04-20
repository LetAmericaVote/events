import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import Byline from './Byline';
import {
  fetchComment,
  fetchPaginatedEventComments,
} from '../actions';

const StyledThread = styled.div`
  ${props => props.theme.reset}

  border: 1px solid ${props => props.theme.night};
  ${props => props.theme.borderRadius}

  ${props => props.theme.basePadding}
`;

const Thread = (props) => {
  return (
    <StyledThread>

    </StyledThread>
  );
};

// TODO: Move init logic to middleware.
//
// class ThreadConnector extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.loadMoreComments = this.loadMoreComments.bind(this);
//   }
//
//   loadMoreComments() {
//     const {
//       eventId,
//       topLevelCommentId,
//       fetchPaginatedEventComments,
//     } = props;
//
//     fetchPaginatedEventComments(eventId, true, topLevelCommentId);
//   }
//
//   componentDidMount() {
//     const {
//       eventId,
//       topLevelCommentId,
//       fetchComment,
//     } = props;
//
//     fetchComment(eventId, topLevelCommentId);
//
//     this.loadMoreComments();
//   }
//
//   render() {
//     const ConnectedThread = Rivet(Thread);
//     const props = {
//       ...this.props,
//       loadMoreComments: this.loadMoreComments,
//     };
//
//     return (
//       <ConnectedThread {...props} />
//     );
//   }
// }
//
// ThreadConnector.actionCreators = {
//   fetchComment,
//   fetchPaginatedEventComments,
// };

export default Rivet(Thread);
