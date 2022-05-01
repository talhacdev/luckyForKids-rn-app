import React from 'react';
import {Text, View} from 'react-native';
import {Header, Badge} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Fonts} from '../../../utils/Fonts';
import {TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
const Thankyou = ({navigation, userCart}) => (
  <View style={{flex: 1, backgroundColor: 'lightblue'}}>
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
            navigation.navigate('Cart');
          }}>
          <Entypo
            name="shopping-cart"
            size={23}
            style={{marginTop: 12, marginRight: 10}}
            color="white"
          />
          <Badge
            value={userCart?.length}
            status="success"
            containerStyle={{
              position: 'absolute',
              right: -4,
              top: 3,
            }}
          />
        </TouchableOpacity>
      }
    />
    <View style={styles.card}>
      <Image source={require('../../../assets/thankyou.png')}></Image>
    </View>

    <Text
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: Fonts.PoppinsMedium,
        fontSize: 16,
        color: 'white',
      }}>
      for being an important member
    </Text>
    <Text
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: Fonts.PoppinsMedium,
        fontSize: 16,
        color: 'white',
      }}>
      of winner wish family
    </Text>

    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail')}
        style={{
          backgroundColor: 'red',
          height: 45,
          width: '45%',
          marginTop: 40,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          borderRadius: 80,
          backgroundColor: 'white',
        }}>
        <Text style={{color: colors.primary, fontSize: 17}}>Go home</Text>
      </TouchableOpacity>
    </View>
  </View>
);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  medium: {fontFamily: Fonts.PoppinsMedium, fontSize: 15},
  large: {fontFamily: Fonts.PoppinsMedium, fontSize: 16},
  logo: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  card: {
    // flex: 1,
    height: 300,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

    // marginVertical: 10,
    // marginHorizontal: 15,
    // padding: 15,
    // borderRadius: 2,
    // backgroundColor: '#fff',
  },
});
const mapStateToProps = (state) => {
  const {userCart} = state.cart;
  return {userCart};
};
export default connect(mapStateToProps)(Thankyou);
