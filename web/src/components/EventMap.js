import React from 'react';
import styled from 'styled-components';
import colors from '../theme/colors';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';
import Rivet from '../hoc/Rivet';
import { makeEventRoute } from '../routing/routes';
import {
  setPathname,
} from '../actions';
import {
  selectEventsAsArray,
} from '../selectors';

const EventMapContainer = styled.div`
  ${props => props.theme.reset}

  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
`;

function calculateWidth() {
  const { clientWidth } = document.body;

  return clientWidth < 768 ? clientWidth : clientWidth / 2;
}

class EventMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deferRender: true,
      width: calculateWidth(),
      dimensions: null,
    };
  }

  // @SEE: https://medium.freecodecamp.org/what-i-learned-from-reading-defer-render-hoc-8c2e9dc2b07a
  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({ width: calculateWidth() });
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.setState({ deferRender: false });
      });
    });
  }

  render() {
    if (this.state.deferRender) {
      return null;
    }

    const {
      events,
      setPathname,
      measureRef,
    } = this.props;

    const { width } = this.state;
    const scale = width;

    const mapStyle = {
      default: {
        fill: colors.paper,
        stroke: colors.primary,
        strokeWidth: 1,
      },
      hover: {
        fill: colors.secondary,
        stroke: colors.primary,
        strokeWidth: 1,
      },
    };

    const composableMapProps = {
      projection: 'albersUsa',
      width,
      height: width / 2,
      projectionConfig: {
        scale,
      },
    };

    return (
      <EventMapContainer innerRef={measureRef}>
        <ComposableMap {...composableMapProps}>
          <ZoomableGroup>
            <Geographies geography="/states.json" disableOptimization>
              {(geographies, projection) => geographies.map((geography, index) => {
                return (
                  <Geography
                    key={index}
                    cacheId={`${width}_${index}`}
                    geography={geography}
                    projection={projection}
                    style={mapStyle}
                  />
                )
              })}
            </Geographies>
            <Markers>
              {events.map(event => {
                if (! event.geoLocation || event.geoLocation[0] === undefined) {
                  return null;
                }
                
                const marker = {
                  coordinates: event.geoLocation,
                  name: event.title,
                };

                const onClick = () => setPathname(makeEventRoute(event.slug));

                return (
                  <Marker marker={marker} key={event.id} onClick={onClick}>
                    <g transform="translate(-21.7, -33.8)">
                      <g transform="matrix(0.301823,0,0,0.301823,-5.50014,-7.3329)">
                          <path d="M64,24.234C83.187,24.234 105.762,46.134 98.765,64C91.501,82.546 83.187,67.982 64,67.982C44.813,67.982 35.992,83.729 29.235,64C23.018,45.848 44.813,24.234 64,24.234Z" style={{ fill: colors.action }} />
                      </g>
                      <g transform="matrix(0.377975,0,0,-0.393265,2.76643,40.6487)">
                          <path d="M29.235,17.368L56.996,72.89L1.474,72.89L29.235,17.368Z" style={{ fill: colors.action }} />
                      </g>
                      <g transform="matrix(0.0931841,0,0,0.0887133,8.21702,5.39239)">
                          <path d="M24.3,69.7L10.6,60L27.5,60L32.7,44.1L38,60L54.8,60L41.2,69.7L42.7,74.3L65.3,74.3L32.9,0L32.5,0L0,74.3L22.8,74.3L24.3,69.7Z" style={{ fill: colors.paper, fillRule: "nonzero" }} />
                          <path d="M120.9,0L108,0L49.1,0L55.5,0L88,74.3L88.4,74.3L100.7,46.2L85.9,46.2L83.9,41.2L83.9,40.5L103.2,40.5L107.1,31.6L80,31.6L77.7,25.9L109.6,25.9L113.5,16.9L74.1,16.9L71.8,11.2L116,11.2L120.9,0Z" style={{ fill: colors.paper, fillRule: "nonzero" }} />
                          <path d="M49.1,0L32.7,0L65.1,74.3L88.2,74.3L55.8,0L49.1,0Z" style={{ fill: colors.paper, fillRule: "nonzero" }} />
                      </g>
                    </g>
                  </Marker>
                );
              })}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </EventMapContainer>
    );
  }
}

EventMap.mapStateToProps = (state) => ({
  events: selectEventsAsArray(state),
});

EventMap.actionCreators = {
  setPathname,
};

export default Rivet(EventMap);
