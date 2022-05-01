import React, {useEffect, useState} from 'react';
import {View, LogBox, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductDetail from './src/screens/App/ProductDetail';
const Stack = createStackNavigator();
import CharityDetail from './src/screens/App/Charity/CharityDetail';
import Tickets from './src/screens/App/Tickets';
import Products from './src/screens/App/Products';
import Ticket1 from './src/screens/App/Tickets/Ticket1';
import Login from './src/screens/App/Login';
import Thankyou from './src/screens/App/Thankyou/Thankyou';
import Newpass from './src/screens/Forgotpass/Newpass';
import Withdraw from './src/screens/App/Withdraw';
// import CharityDetail from './src/screens/App/Charity/CharityDetail';
import Settings from './src/screens/App/Settings';
import Cart from './src/screens/App/Cart';
import Paypal from './src/components/Paypal';
import WalkThrough from './src/screens/App/WalkThrough/WalkThrough';
import AsyncStorage from '@react-native-community/async-storage';

import Stripe from './src/components/Stripe';
//screens

import DrawerNav from './src/navigation/Drawer/Drawer';
import Forgot from './src/screens/Forgotpass/Forgot';
import Verifypass from './src/screens/Forgotpass/Verifypass';
import Dashboard from './src/screens/App/Dashboard';
import Aboutus from './src/screens/App/Aboutus';
import PrivacyPolicy from './src/screens/App/PrivacyPolicy';
import Contactus from './src/screens/App/Contactus/Contactus';
import Notifications from './src/screens/App/Notifications/Notification';
import Subscription from './src/screens/App/Subscription/Subscription';
// import InstantBuy from './src/screens/App/InstantBuy/InstantBuy';
import {getUserBalance} from './src/Redux/Action/Competitionaction';
import {connect} from 'react-redux';

const AppNav = ({getUserBalance, user, isLoggedIn}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Root'}>
        <Stack.Screen
          component={Login}
          name="Login"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Thankyou}
          name="Thankyou"
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          component={WalkThrough}
          name="WalkThrough"
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen
            component={Paypal}
            name="Paypal"
            options={{headerShown: false}}
          />
          <Stack.Screen
            component={Stripe}
            name="Stripe"
            options={{headerShown: false}}
          /> */}

        <Stack.Screen name="Root" options={{headerShown: false}}>
          {(props) => <DrawerNav {...props} />}
        </Stack.Screen>
        <Stack.Screen
          component={ProductDetail}
          name="ProductDetail"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Products}
          name="Products"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Subscription}
          name="subscription"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={CharityDetail}
          name="CharityDetail"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Contactus}
          name="contactus"
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={Notifications}
          name="notifications"
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={Aboutus}
          name="Aboutus"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={PrivacyPolicy}
          name="privacy"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Tickets}
          name="Tickets"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Settings}
          name="Settings"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Ticket1}
          name="Ticket1"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Forgot}
          name="Forgot"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Verifypass}
          name="Verifypass"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Newpass}
          name="Newpass"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Withdraw}
          name="Withdraw"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Dashboard}
          name="Dashboard"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Cart}
          name="Cart"
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
            component={InstantBuy}
            name="Instant"
            options={{headerShown: false}}
          /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  const {user, isLoggedIn} = state.auth;

  return {user, isLoggedIn};
};
export default connect(mapStateToProps)(AppNav);
