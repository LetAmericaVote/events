import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import Byline from './Byline';
import {
  selectUsersAsArray,
} from '../selectors';

const SPEED = (60 / 1000) * 20;

const ScrollPill = styled.div`
  ${props => props.theme.reset}

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  ${props => props.theme.tinyPadding}
`;

const ScrollPillContainer = styled.div`
  ${props => props.theme.reset}

  width: 100%;
  height: 100%;
  min-height: 50vh;
  position: relative;

  overflow-y: hidden;
`;

// @SEE: https://stackoverflow.com/a/12646864
function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// @SEE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function hasUsers(props) {
  return props.users && props.users.length;
}

class CommunityScroll extends React.Component {
  constructor(props) {
    super(props);

    const shuffled = shuffleArray(props.users);

    this.state = {
      height: 0,
      width: 0,
      frameId: null,
      queue: hasUsers(props) ? shuffled : [],
      onDeck: hasUsers(props) ? [
        {
          top: 0,
          left: 0,
          user: shuffled[0],
        },
      ] : [],
      nextUser: hasUsers(props) ? 1 : 0,
    };

    this.updateQueue = this.updateQueue.bind(this);
    this.animate = this.animate.bind(this);
    this.updateSize = this.updateSize.bind(this);
  }

  componentDidMount() {
    this.setState({
      frameId: requestAnimationFrame(this.animate)
    });

    const sameLength = hasUsers(this.props) &&
      this.props.users.length === this.state.queue.length;

    if (hasUsers(this.props) && ! sameLength) {
      this.updateQueue();
    }

    this.updateSize();
    window.addEventListener('resize', this.updateSize);
  }

  componentDidUpdate(prevProps, prevState) {
    const hadPreviousUsers = hasUsers(prevProps);
    const propLengthsMatch = hadPreviousUsers && hasUsers(this.props) &&
      prevProps.users.length === this.props.users.length;

    if ((! hadPreviousUsers && !! this.users) ||
      (hadPreviousUsers && ! propLengthsMatch)) {

      this.updateQueue();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.state.frameId);

    this.setState({ frameId: null });
  }

  updateSize() {
    if (! this.scroller) {
      return;
    }

    this.setState({
      height: this.scroller.clientHeight,
      width: this.scroller.clientWidth,
    });
  }

  updateQueue() {
    const { onDeck } = this.state;
    const isScrolling = !!onDeck.length;
    const newQueue = shuffleArray(this.props.users);
    const newDeck = isScrolling ? onDeck : [
      {
        top: 0,
        left: 0,
        user: newQueue[0],
      },
    ];

    this.setState({
      nextUser: isScrolling ? 0 : 1,
      queue: newQueue,
      onDeck: newDeck,
    }, () => {
      this.updateSize();
    });
  }

  animate() {
    const { onDeck, queue, nextUser, height, width } = this.state;
    let nextIncrement = nextUser;

    const newDeck = onDeck.reduce((acc, val) => {
      if (val.top >= height + 300) {
        return acc;
      }

      let hasSpawned = {...val}.hasSpawned;
      const cutoff = Math.random() * -30;

      if (val.top >= cutoff && ! hasSpawned) {
        if (! queue[nextIncrement]) {
          nextIncrement = 0;
        }

        acc.push({
          top: -100,
          left: getRandomInt(width / 2),
          user: queue[nextIncrement],
        });

        nextIncrement += 1;
        hasSpawned = true;
      }

      acc.push({
        ...val,
        hasSpawned,
        top: val.top + SPEED,
      });

      return acc;
    }, []);

    this.setState({
      onDeck: newDeck,
      nextUser: nextIncrement,
    }, () => {
      this.setState({
        frameId: requestAnimationFrame(this.animate),
      });
    });
  }

  render() {
    const { users } = this.props;
    const { onDeck } = this.state;

    if (! users || ! users.length) {
      return null;
    }

    if (! onDeck.length) {
      // TODO: Loading spinner
      return null;
    }

    return (
      <ScrollPillContainer innerRef={scroller => this.scroller = scroller}>
        {onDeck.map(item => {
          const joined = new Date(item.user.createdAt)
            .toLocaleString('en-US', { month: 'short', year: 'numeric'});
          const style = {
            top: `${item.top}px`,
            left: `${item.left}px`
          };

          return (
            <ScrollPill key={item.user.id} style={style}>
              <Byline userId={item.user.id} tagline={`Joined ${joined}`} />
            </ScrollPill>
          );
        })}
      </ScrollPillContainer>
    );
  }
}

CommunityScroll.mapStateToProps = (state) => ({
  users: selectUsersAsArray(state)
    .filter(user => ! user.isFlagged),
});

export default Rivet(CommunityScroll);
