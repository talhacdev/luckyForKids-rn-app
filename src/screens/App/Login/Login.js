import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Forgotpass from '../../../screens/Forgotpass/Forgot';
import {loginaction, savePass} from '../../../Redux/Action/Loginaction';
import {Header, Badge} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import {baloons} from '../../../assets';
import styles from './styles';
import Zocial from 'react-native-vector-icons/Zocial';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../theme/colors';
import getStoredState from 'redux-persist/es/getStoredState';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

const Login = ({navigation, loginaction, isLoggedIn, savePass}) => {
  const [email, changeemail] = useState('');
  const [pass, changepass] = useState('');
  const [loading, setLoading] = useState(false);
  const check = async () => {
    if (email == '') {
      alert('kindly enter email');
    } else if (pass == '') {
      alert('kindly enter password ');
    } else {
      Keyboard.dismiss();
      setLoading(true);
      const formdata = new FormData();
      formdata.append('username', email);
      formdata.append('pass', pass);

      const res = await loginaction(formdata);
      if (res.data.status) {
        await savePass(pass);
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Root'}],
          }),
        );
        // navigation.navigate('Root');
      } else {
        alert(res.data.message);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    isLoggedIn &&
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Root'}],
        }),
      );
  }, []);
  return (
    <View style={{backgroundColor: 'white'}}>
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
            {/* {userCart.length > 0 && ( */}
            {/* <Badge
              // value={userCart?.length}
              status="success"
              containerStyle={{
                position: 'absolute',
                right: -4,
                top: 3,
              }}
            /> */}
            {/* )} */}
          </TouchableOpacity>
        }
      />

      <ImageBackground
        style={{
          height: '100%',
          width: '100%',
          // justifyContent: 'center',
          // alignContent: 'center',
        }}
        // source={require('../../../assets/background.png')}
      >
        <View
          style={{
            alignItems: 'center',
            marginVertical: 60,
          }}>
          <Text style={{fontSize: 20, color: 'gray'}}>
            Welcome to the Family
          </Text>
        </View>
        <View
          style={{
            height: 400,
            borderRadius: 10,
            backgroundColor: 'white',
            borderColor: '#ddd',
            elevation: 5,
            shadowColor: '#BDBDBD',
            alignSelf: 'center',
            marginTop: -20,

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
            <Ionicons
              name="person"
              size={60}
              color="grey"
              style={{}}></Ionicons>
          </View> */}
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.login}>Login</Text>
            <Image source={baloons} style={{marginLeft: 30, marginTop: 20}} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              borderBottomWidth: 0.5,
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
                  fontSize: 14,
                  justifyContent: 'center',
                  height: 50,
                }}
                onChangeText={(text) => changeemail(text)}
                value={email}
                placeholder=" Email"></TextInput>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              borderBottomWidth: 0.5,
              borderColor: 'grey',
              marginTop: 20,
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
            <View style={styles.email1}>
              <TextInput
                placeholderTextColor="gray"
                style={{
                  marginTop: 2,
                  fontSize: 14,
                  justifyContent: 'center',
                  height: 50,
                }}
                secureTextEntry
                onChangeText={(text) => changepass(text)}
                value={pass}
                placeholder=" Password"></TextInput>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,

              width: '80%',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Text
              onPress={() => navigation.navigate('Forgot')}
              style={{color: '#00C4CC'}}>
              Forgot Password?
            </Text>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              height: 45,
              width: '40%',
              backgroundColor: colors.primary,
              // backgroundColor: '#11416F',
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 20,
              borderRadius: 10,
              marginBottom: 20,
            }}
            // onPress={() => navigation.navigate('Root')}
            onPress={check}>
            <View style={{}}>
              {loading ? (
                <ActivityIndicator animating size="small" color={'white'} />
              ) : (
                <Text style={{color: 'white'}}>Sign In</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = (state) => {
  const {user, isLoggedIn} = state.auth;

  return {user, isLoggedIn};
};
export default connect(mapStateToProps, {loginaction, savePass})(Login);
