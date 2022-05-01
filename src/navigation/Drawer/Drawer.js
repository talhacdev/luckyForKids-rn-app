import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import DrawerContent from './Content';
import Winners from '../../screens/App/Winners';
import Charity from '../../screens/App/Charity';
import Topup from '../../screens/App/Topup';
import Products from '../../screens/App/Products';
import ProductDetail from '../../screens/App/ProductDetail';
import CharityDetail from '../../screens/App/Charity/CharityDetail';
import Thankyou from '../../screens/App/Thankyou/Thankyou';

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = 'Home';
import Home from '../../screens/App/Products';
import Tickets from '../../screens/App/Tickets';
import Dashboard from '../../screens/App/Dashboard';
import Paypal from '../../components/Paypal';
import Stripe from '../../components/Stripe';
import Cart from '../../screens/App/Cart/Cart';
import Contactus from '../../screens/App/Contactus/Contactus';
import InstantBuy from '../../screens/App/InstantBuy/InstantBuy';
import Notifications from '../../screens/App/Notifications/Notification';
import {connect} from 'react-redux';
import Aboutus from '../../screens/App/Aboutus';
import PrivacyPolicy from '../../screens/App/PrivacyPolicy';
import Contact from '../../screens/App/Contactus/Contactus';
import Subscription from '../../screens/App/Subscription/Subscription';
import WalkThrough from '../../screens/App/WalkThrough/WalkThrough';
import AsyncStorage from '@react-native-community/async-storage';

const DrawerNavigator = ({isLoggedIn, executed}) => {
  useEffect(() => {
    console.log('DEBUG appnav useEffect isLoggedIn: ', isLoggedIn);
    console.log('DEBUG appnav useEffect executed: ', executed);
  });

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      // initialRouteName={!isLoggedIn ? 'WalkThrough' : 'Dashboard'}>
      initialRouteName={executed ? 'Dashboard' : 'WalkThrough'}>
      {isLoggedIn && <Drawer.Screen name="Dashboard" component={Dashboard} />}
      <Drawer.Screen name="Home" component={Home} />

      {/* {isLoggedIn && <Drawer.Screen name="Cart" component={Cart} />} */}
      <Drawer.Screen name="Winners" component={Winners} />
      <Drawer.Screen name="Aboutus" component={Aboutus} />
      <Drawer.Screen name="privacy" component={PrivacyPolicy} />
      <Drawer.Screen name="Charity" component={Charity} />
      <Drawer.Screen name="notifications" component={Notifications} />
      <Drawer.Screen name="contactus" component={Contactus} />
      <Drawer.Screen name="subscripton" component={Subscription} />

      {isLoggedIn && <Drawer.Screen name="Instant" component={InstantBuy} />}
      {isLoggedIn && <Drawer.Screen name="Paypal" component={Paypal} />}
      {/* {isLoggedIn && <Drawer.Screen name="Topup" component={Topup} />} */}
      {isLoggedIn && <Drawer.Screen name="Stripe" component={Stripe} />}
      <Drawer.Screen name="WalkThrough" component={WalkThrough} />

      <Drawer.Screen name="Products" component={Products} />

      <Drawer.Screen name="Thankyou" component={Thankyou} />
    </Drawer.Navigator>
  );
};
const mapStateToProps = (state) => {
  const {isLoggedIn} = state.auth;
  const {executed} = state.auth;

  console.log('DEBUG reduxData: ', state);
  return {isLoggedIn, executed};
};
export default connect(mapStateToProps)(DrawerNavigator);
