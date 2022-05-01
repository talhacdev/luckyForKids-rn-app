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
import Textarea from 'react-native-textarea';
import {
  competition,
  updateComp,
  charityCateg,
  getCateg,
} from '../../../Redux/Action/Competitionaction';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../../../theme/colors';
const Contactus = ({params, userCart, isLoggedIn, navigation}) => {
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
      <View>
        <TextInput
          style={{
            // borderWidth: 0.3,
            margin: 20,
            borderColor: 'grey',
            backgroundColor: 'white',

            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
          }}
          placeholderTextColor={'#c7c7c7'}
          placeholder="Your Name"></TextInput>

        <TextInput
          style={{
            // borderWidth: 0.5,
            // margin: 20,
            borderColor: 'grey',
            backgroundColor: 'white',
            marginLeft: 20,
            marginRight: 20,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
          }}
          placeholderTextColor={'#c7c7c7'}
          placeholder="Email"></TextInput>

        <TextInput
          style={{
            // borderWidth: 0.5,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
            borderColor: 'grey',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
          }}
          placeholderTextColor={'#c7c7c7'}
          placeholder="Subject"></TextInput>

        {/* <TextInput
          style={{
            borderWidth: 0.5,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
            borderColor: 'grey',
            backgroundColor: 'white',
            // height: '40%',
            padding: 160,
            paddingTop: 0,
            paddingHorizontal: 0,
            paddingLeft: 0,
            width: '88%',
            // backgroundColor: 'red',
          }}
          placeholder="Write Your Message Here"></TextInput> */}

        <View style={{width: '89%', margin: 20}}>
          <Textarea
            containerStyle={{
              // padding: 7,
              width: '100%',
              // borderRadius: 4,
              alignSelf: 'flex-start',
              marginVertical: 5,
              backgroundColor: colors.white,
              fontSize: 16,
              elevation: 5,
            }}
            style={{
              textAlignVertical: 'top', // hack android
              height: 170,
              fontSize: 14,
              color: colors.fontColor,
              textAlign: 'left',
            }}
            // onChangeText={(comment) => setComment(comment)}
            // defaultValue={note}
            maxLength={300}
            placeholder={'Write Your Message Here'}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          margin: 20,
          height: 40,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold', color: 'white'}}>Get In Touch</Text>
      </TouchableOpacity>
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
})(Contactus);
