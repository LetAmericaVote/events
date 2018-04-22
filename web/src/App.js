import React from 'react';
import Rivet from './hoc/Rivet';
import Page from './blocks/Page';
import Spacer from './blocks/Spacer';
import Modal from './modal';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import RouteSwitch from './routing/RouteSwitch';
import routes from './routing/routes';
import Home from './routes/Home';
import Search from './routes/Search';
import Event from './routes/Event';
import Profile from './routes/Profile';
import HostLink from './routes/HostLink';
import GoogleAuth from './routes/GoogleAuth';
import { selectIsModalOpen } from './selectors';
/* eslint-disable react/jsx-pascal-case */
import _404 from './routes/404';

const App = (props) => {
  const { isModalOpen } = props;

  const appRoutes = {
    [routes.HOME_ROUTE]: props => <Home {...props} />,
    [routes.SEARCH_ROUTE]: props => <Search {...props} />,
    [routes.EVENT_ROUTE]: props => <Event {...props} />,
    [routes.PROFILE_ROUTE]: props => <Profile {...props} />,
    [routes.HOST_ROUTE]: props => <HostLink {...props} />,
    [routes.GOOGLE_AUTH_ROUTE]: props => <GoogleAuth {...props} />,
  };

  return [
    <Modal key="modal" />,
    <Page key="page" fixed={isModalOpen}>
      <Navigation />
      <RouteSwitch routes={appRoutes} defaultRouteRender={() => <_404 />} />
      <Spacer large />
      <Footer />
    </Page>,
  ];
};

App.mapStateToProps = (state) => ({
  isModalOpen: selectIsModalOpen(state),
});

export default Rivet(App);
