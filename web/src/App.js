import React from 'react';
import Page from './blocks/Page';
import Navigation from './components/Navigation';
import RouteSwitch from './routing/RouteSwitch';
import routes from './routing/routes';
import Home from './routes/Home';
import Search from './routes/Search';
import Event from './routes/Event';
import Profile from './routes/Profile';
import HostLink from './routes/HostLink';
/* eslint-disable react/jsx-pascal-case */
import _404 from './routes/404';

const App = (props) => {
  const appRoutes = {
    [routes.HOME_ROUTE]: props => <Home {...props} />,
    [routes.SEARCH_ROUTE]: props => <Search {...props} />,
    [routes.EVENT_ROUTE]: props => <Event {...props} />,
    [routes.PROFILE_ROUTE]: props => <Profile {...props} />,
    [routes.HOST_ROUTE]: props => <HostLink {...props} />,
  };

  return (
    <Page>
      <Navigation />
      <RouteSwitch routes={appRoutes} defaultRouteRender={() => <_404 />} />
    </Page>
  );
};

export default App;
