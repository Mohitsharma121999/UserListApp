import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import StackNavigator from './src/navigation/StackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/navigation/Routes';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Routes />
           <FlashMessage
             style={{marginTop:20}}
              position="top"
              animated
            />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;