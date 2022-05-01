import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {gift, arrow} from '../../../assets';
import {CommonActions} from '@react-navigation/routers';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {UPDATE_EXECUTION} from '../../../Redux/Action/types';

const WalkThrough = ({navigation, isLoggedIn}) => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(0);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (isLoggedIn) {
  //       navigation.dispatch(
  //         CommonActions.reset({
  //           index: 0,
  //           routes: [{name: 'Root'}],
  //         }),
  //       );
  //     } else {
  //       navigation.dispatch(
  //         CommonActions.reset({
  //           index: 0,
  //           routes: [{name: 'Products'}],
  //         }),
  //       );
  //     }
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [navigation]);

  useEffect(() => {
    console.log('DEBUG walkthrough useEffect');
    dispatch({
      type: UPDATE_EXECUTION,
      executed: true,
    });
    // setTimeout(function () {
    //   // navigation.navigate('PhoneInput');
    //   navigation.navigate('Products');
    // }, 2000);

    (async () => {
      const value = await AsyncStorage.getItem('selected');
      if (value == 1) {
        navigation.navigate('Products');
      }
      console.log('value123', value);
    })();
  }, []);

  const Check = async () => {
    try {
      const value = await AsyncStorage.getItem('selected');
      console.log('value', value);
      await AsyncStorage.setItem('selected', '1');
      navigation.navigate('Products');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#2CD8D0'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={gift} resizeMode="contain" />

        <Text
          style={{
            color: 'white',
            paddingTop: 30,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Welcome
        </Text>
        <View style={{marginHorizontal: 10}}>
          <Text style={{color: 'white', fontSize: 16}}>
            Thousands of the Raffles arewaiting for you
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            Check();
          }}>
          <Image
            resizeMode="contain"
            source={arrow}
            resizeMode="contain"
            style={{width: 50}}
          />
          <Text
            style={{
              color: 'white',
              flexDirection: 'row',
              textAlign: 'center',

              paddingBottom: 30,
            }}>
            Enter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WalkThrough;

const styles = StyleSheet.create({});
