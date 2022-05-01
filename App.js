// import React from 'react';
// import {Text, View} from 'react-native';
// import ProductDetail from './src/screens/App/ProductDetail/ProductDetail';
// import Products from './src/screens/App/Products';
// import AppNav from './AppNav';
// const App = ({params}) => <AppNav />;

// export default App;

import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
// import {persister, store} from './src/redux/store';

import {persister, store} from './src/Redux/store';
import AppNav from './AppNav';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <AppNav />
      </PersistGate>
    </Provider>
  );
};
export default App;
