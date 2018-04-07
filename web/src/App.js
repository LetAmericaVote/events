import React from 'react';
import RouteSwitch from './routing/RouteSwitch';
import routes from './routing/routes';
import Home from './routes/Home';
import Search from './routes/Search';
import Event from './routes/Event';
import Profile from './routes/Profile';

const App = (props) => {
  const appRoutes = {
    [routes.HOME_ROUTE]: props => <Home {...props} />,
    [routes.SEARCH_ROUTE]: props => <Search {...props} />,
    [routes.EVENT_ROUTE]: props => <Event {...props} />,
    [routes.PROFILE_ROUTE]: props => <Profile {...props} />,
  };

  return (
    <main>
      <RouteSwitch routes={appRoutes} />
    </main>
  )
};

export default App;
