import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text, View, TouchableOpacity, Dimensions, Image} from 'react-native';
import {Header, Badge} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import styles from './styles';
import {addToCart} from '../../../Redux/Action/cart';
import {saveCharity} from '../../../Redux/Action/Loginaction';
import {Alert} from 'react-native';
import {compose} from 'redux';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import {
  competition,
  updateComp,
  charityCateg,
  getCateg,
} from '../../../Redux/Action/Competitionaction';
const Notifications = ({params, userCart, isLoggedIn, navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        containerStyle={{paddingTop: 10}}
        backgroundColor={colors.primary}
        leftComponent={
          <Entypo
            name="menu"
            size={25}
            style={{marginTop: 8}}
            color="white"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        }
        centerComponent={
          <Image
            style={{
              resizeMode: 'contain',
              height: 70,
              width: 130,

              marginTop: -15,
            }}
            source={require('../../../assets/logo.png')}></Image>
        }
        rightComponent={
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (isLoggedIn) {
                navigation.navigate('Cart');
              } else {
                Alert.alert('Winner Wish', 'Kindly login');
                navigation.navigate('Login');
              }
            }}>
            <Entypo
              name="shopping-cart"
              size={23}
              style={{marginTop: 12, marginRight: 10}}
              color="white"
            />
            {userCart.length > 0 && (
              <Badge
                value={userCart?.length}
                status="success"
                containerStyle={{
                  position: 'absolute',
                  right: -4,
                  top: 3,
                }}
              />
            )}
          </TouchableOpacity>
        }
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',

          alignSelf: 'center',
          alignItems: 'center',
          //   marginTop: 20,
        }}>
        <Image
          style={{
            height: 140,
            width: 100,
            // alignContent: 'center',
            // alignItems: 'center',
            // alignSelf: 'center',
          }}
          source={require('../../../assets/notification.png')}></Image>
        <Text style={{color: 'grey'}}>No Notification Yet</Text>
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  const {comp, charityList, allCateg} = state.competitionuser;
  const {userCart, totalPrice} = state.cart;
  const {isLoggedIn, charityId} = state.auth;

  return {
    comp,
    charityList,
    isLoggedIn,
    userCart,
  };
};
export default connect(mapStateToProps, {
  competition,
  updateComp,
  addToCart,
  charityCateg,
  saveCharity,
  getCateg,
})(Notifications);
