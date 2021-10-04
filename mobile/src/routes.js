import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './pages/Login';
import Timeline from './pages/Timeline';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    App: createStackNavigator({
      Timeline,
    }),
  }),
);

export default Routes;
