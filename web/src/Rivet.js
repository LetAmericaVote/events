import { connect } from 'react-redux';

const Rivet = (Component) => {
  const connectParams = [];

  if (Component.mapStateToProps) {
    connectParams.push(Component.mapStateToProps);
  } else {
    connectParams.push(null);
  }

  ['mapDispatchToProps', 'actionCreators'].forEach(key => {
    const param = Component[key];

    if (!!param) {
      connectParams.push(param);
    }
  });

  return connect(...connectParams)(Component);
};

export default Rivet;
