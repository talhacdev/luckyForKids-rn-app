import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StyleSheet,
} from 'react-native';
// import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
// import styles from './styles';
import Zocial from 'react-native-vector-icons/Zocial';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Fonts from '../../theme/fonts';

import colors from '../../theme/colors';
//redux
import {connect} from 'react-redux';
import {updatePassword} from '../../Redux/Action/Loginaction';
import {Alert} from 'react-native';
const Newpass = ({params, navigation, updatePassword}) => {
  const [email, changeemail] = useState('');
  const [Newpass, changenewpass] = useState('');
  const [Conpass, changeconpass] = useState('');
  const check = async () => {
    if (email == '') {
      alert('kindly enter email');
    } else if (Newpass == '') {
      alert('kindly enter New password');
    } else if (Conpass == '') {
      alert('Confirm pass');
    } else if (Newpass !== Conpass) {
      alert('Password did not match');
    } else {
      try {
        const formData = new FormData();
        formData.append('user_email', email);
        formData.append('newpassword', Newpass);

        const res = await updatePassword(formData);
        if (res.data.status) {
          Alert.alert('Winner Wish', res.data.message);
          navigation.navigate('Login');
        } else {
          Alert.alert('Winner Wish', res.data.message);
        }
      } catch (err) {}
    }
  };

  return (
    <ImageBackground
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        // alignContent: 'center',
      }}
      source={require('../../assets/background.png')}>
      <View
        style={{
          height: 320,
          borderRadius: 10,
          backgroundColor: 'white',
          borderColor: '#ddd',
          elevation: 10,
          shadowColor: '#BDBDBD',
          alignSelf: 'center',

          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 5,
          shadowOpacity: 1.0,
          alignItems: 'center',

          width: '85%',
          // justifyContent: 'center',
        }}>
        <Text style={{marginTop: 20}}>Reset password</Text>
        {/* <View
          style={{
            height: 100,
            borderRadius: 60,
            width: 100,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -60,
            borderWidth: 0.5,
            borderColor: 'grey',
            borderColor: '#ddd',
            elevation: 10,
            shadowColor: '#BDBDBD',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowRadius: 5,
            shadowOpacity: 1.0,
          }}>
          <Ionicons name="person" size={60} color="grey" style={{}}></Ionicons>
        </View> */}

        {/* <Text style={styles.login}>Login</Text> */}

        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            borderBottomWidth: 1,
            borderColor: 'grey',
            marginTop: 10,
            height: 38,
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Zocial name="email" size={25} color="grey" style={{}}></Zocial>
          </View>
          <View style={styles.email}>
            <TextInput
              placeholderTextColor="gray"
              style={{
                marginTop: 2,
                fontSize: 12,
                justifyContent: 'center',
              }}
              onChangeText={(text) => changeemail(text)}
              value={email}
              placeholder="Enter Email"></TextInput>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            borderBottomWidth: 1,
            borderColor: 'grey',
            marginTop: 10,
            height: 38,
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Fontisto
              name="locked"
              size={25}
              color="grey"
              style={{}}></Fontisto>
          </View>
          <View style={styles.email}>
            <TextInput
              placeholderTextColor="gray"
              style={{
                marginTop: 2,
                fontSize: 12,
                justifyContent: 'center',
              }}
              onChangeText={(text) => changenewpass(text)}
              value={Newpass}
              placeholder="New password"></TextInput>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            borderBottomWidth: 1,
            borderColor: 'grey',
            marginTop: 10,
            height: 38,
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Fontisto
              name="locked"
              size={25}
              color="grey"
              style={{}}></Fontisto>
          </View>
          <View style={styles.email}>
            <TextInput
              placeholderTextColor="gray"
              style={{
                marginTop: 2,
                fontSize: 12,
                justifyContent: 'center',
              }}
              onChangeText={(text) => changeconpass(text)}
              value={Conpass}
              placeholder="Confirm password"></TextInput>
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            width: '80%',
            borderBottomWidth: 1,
            borderColor: 'grey',
            marginTop: 10,
            height: 38,
          }}>
          <View
            style={{
              // backgroundColor: 'red',
              justifyContent: 'center',
              // alignContent: 'center',
            }}>
            <Fontisto
              name="locked"
              size={25}
              color="grey"
              style={{}}></Fontisto>
          </View>
          <View style={styles.email}>
            <TextInput
              style={{
                marginTop: 2,
                fontSize: 12,
                justifyContent: 'center',
              }}
              onChangeText={(text) => changepass(text)}
              value={pass}
              placeholder="Enter Password"></TextInput>
          </View>
        </View> */}
        {/* 
        <View
          style={{
            marginTop: 20,

            width: '80%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <Text
            onPress={() => navigation.navigate('Forgotpass')}
            style={{color: 'grey'}}>
            Forgot Password?
          </Text>
        </View> */}
        <TouchableOpacity
          style={{
            // position: 'absolute',
            // bottom: 0,
            height: 40,
            width: '60%',
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            // bottom: 20,
            borderRadius: 10,
            marginTop: 40,
          }}
          onPress={check}>
          <Text style={{color: 'white'}}>update</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
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
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

    marginVertical: 10,
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 2,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  login: {
    marginTop: 10,
    fontFamily: Fonts.PoppinsMedium,
    fontSize: 20,
    color: colors.primary,
  },
  email: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: 14,
    // height: 30,
    justifyContent: 'center',
    // marginTop: 5,
    // backgroundColor: 'red',
    color: 'grey',
    width: '70%',
    marginLeft: 10,
    // alignSelf: 'center',
    // alignContent: 'center',
    // alignSelf: 'center',
    // textAlign: 'center',
  },
  forgot: {
    marginLeft: 10,
  },
});

export default connect(null, {updatePassword})(Newpass);
