import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {dummy, cover} from '../../assets';
import colors from '../../theme/colors';
import {Drawer} from 'react-native-paper';
import {Fonts} from '../../utils/Fonts';
import {connect} from 'react-redux';
import {logoutUser} from '../../Redux/Action/Loginaction';
import {updateCart} from '../../Redux/Action/cart';
import {getUserBalance} from '../../Redux/Action/Competitionaction';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';
const DrawerContent = ({
  props,
  navigation,
  balance,
  getUserBalance,
  user,
  logoutUser,
  isLoggedIn,
  updateCart,
}) => {
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const unsubscribe = getData();
  //     return () => {
  //       unsubscribe;
  //     };
  //   }, []),
  // );

  const handleLogout = async () => {
    try {
      await logoutUser();
      await updateCart();
      navigation.push('Login');
    } catch (err) {}
  };
  return (
    <View style={{flex: 1, marginTop: 25}}>
      <DrawerContentScrollView {...props}>
        {/* <ImageBackground style={styles.drawerItemStyle} source={cover} /> */}
        <Drawer.Section style={styles.drawerSection}>
          {isLoggedIn && (
            <DrawerItem
              style={styles.drawerItem}
              label="Dashboard"
              labelStyle={styles.labelStyle}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
          )}
          {isLoggedIn && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                width: 80,
                top: 10,
                borderWidth: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                borderColor: '#ddd',
              }}>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: Fonts.PoppinsMedium,
                }}>
                {'£: ' + balance}
              </Text>
            </TouchableOpacity>
          )}
          {/* // icon={({color, size}) => ( */}
          {/* //   <Icon name="home" color={colors.primary} size={25} />
            // )}
          */}
          <DrawerItem
            style={styles.drawerItem}
            label="Competitions"
            labelStyle={styles.labelStyle}
            onPress={() => {
              navigation.navigate('Home');
            }}
            // icon={({color, size}) => (
            //   <Icon name="home" color={colors.primary} size={25} />
            // )}
          />
          {/* <DrawerItem
            style={styles.drawerItem}
            label="Messages"
            labelStyle={styles.labelStyle}
            onPress={() => {
              alert('Messages'), navigation.closeDrawer();
            }}
            icon={({color, size}) => (
              <Icon name="message" color={colors.primary} size={20} />
            )}
          /> */}
          <DrawerItem
            style={styles.drawerItem}
            label="Winners"
            labelStyle={styles.labelStyle}
            onPress={() => {
              navigation.navigate('Winners');
            }}
            // icon={({color, size}) => (
            //   <Icon name="cart" color={colors.primary} size={23} />
            // )}
          />

          <DrawerItem
            style={styles.drawerItem}
            label="Subscription"
            labelStyle={styles.labelStyle}
            onPress={() => {
              navigation.navigate('subscription');
            }}
            // icon={({color, size}) => (
            //   <Icon name="cart" color={colors.primary} size={23} />
            // )}
          />

          {/* {isLoggedIn && (
            <DrawerItem
              style={styles.drawerItem}
              label="Topup"
              labelStyle={styles.labelStyle}
              onPress={() => {
                navigation.navigate('Topup');
              }}
              // icon={({color, size}) => (
              //   <Icon name="cart" color={colors.primary} size={23} />
              // )}
            />
          )} */}
          <DrawerItem
            style={styles.drawerItem}
            label="Charity"
            labelStyle={styles.labelStyle}
            onPress={() => {
              navigation.navigate('Charity');
            }}
            // icon={({color, size}) => (
            //   <Icon name="account" color={colors.primary} size={23} />
            // )}
          />

          <DrawerItem
            style={styles.drawerItem}
            label="Notifications"
            labelStyle={styles.labelStyle}
            onPress={() => {
              navigation.navigate('notifications');
            }}
            // icon={({color, size}) => (
            //   <Icon name="account" color={colors.primary} size={23} />
            // )}
          />

          <DrawerItem
            style={styles.drawerItem}
            label="About us"
            labelStyle={styles.labelStyle}
            onPress={() => {
              navigation.navigate('Aboutus');
            }}
            // icon={({color, size}) => (
            //   <Icon name="account" color={colors.primary} size={23} />
            // )}
          />
          <DrawerItem
            style={styles.drawerItem}
            label="Privacy Policy"
            labelStyle={styles.labelStyle}
            onPress={() => {
              navigation.navigate('privacy');
            }}
          />

          <DrawerItem
            style={styles.drawerItem}
            label="Contact Us"
            labelStyle={styles.labelStyle}
            onPress={() => {
              navigation.navigate('contactus');
            }}

            // icon={({color, size}) => (
            //   <Icon name="account" color={colors.primary} size={23} />
            // )}
          />

          <DrawerItem
            style={styles.drawerItem}
            label={isLoggedIn ? 'Logout' : 'Sign in'}
            labelStyle={styles.labelStyle}
            onPress={() => {
              if (isLoggedIn) {
                navigation.toggleDrawer();
                Alert.alert(
                  'Winner Wish',
                  'Are you sure to want logout?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'Logout', onPress: () => handleLogout()},
                  ],
                  {cancelable: false},
                );
              } else {
                navigation.navigate('Login');
              }
            }}
            // icon={({color, size}) => (
            //   <Icon name="information" color={colors.primary} size={23} />
            // )}
          />
          {/* <DrawerItem
            style={styles.drawerItem}
            label="Logout"
            labelStyle={styles.labelStyle}
            onPress={() => {
              alert('Logout');
            }}
            icon={({color, size}) => (
              <Icon name="logout" color={colors.primary} size={23} />
            )}
          /> */}
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};
const mapStateToProps = (state) => {
  const {balance} = state.competitionuser;
  const {user, isLoggedIn} = state.auth;

  return {balance, user, isLoggedIn};
};
export default connect(mapStateToProps, {
  getUserBalance,
  logoutUser,
  updateCart,
})(DrawerContent);

const styles = StyleSheet.create({
  upperContainer: {
    paddingVertical: 40,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  mainText: {
    fontSize: 20,
  },
  mainTextSm: {
    fontSize: 13,
  },
  labelStyle: {
    fontSize: 14,
    color: 'black',
    fontFamily: Fonts.PoppinsBold,
  },
  largeText: {
    fontSize: 17,
    marginTop: 10,
    color: 'white',
    marginLeft: 8,
    alignSelf: 'center',
  },
  drawerItemStyle: {
    height: 200,
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  drawerItem: {
    marginTop: 0,
    marginBottom: 0,
    paddingHorizontal: 15,
    fontFamily: Fonts.PoppinsMedium,
    // paddingVertical: 5,
    // paddingLeft: 30,

    justifyContent: 'center',
  },
  sectionStyle: {
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
  listStyle: {
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    paddingLeft: 40,
    justifyContent: 'center',
  },
  itemStyle: {
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    paddingLeft: 55,
    justifyContent: 'center',
  },
  blurView: {
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
