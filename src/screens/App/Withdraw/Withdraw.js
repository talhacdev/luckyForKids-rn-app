import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native';

import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import colors from '../../../theme/colors';
import Foundation from 'react-native-vector-icons/Foundation';
import {styles} from './styles';
import {Header, Badge} from 'react-native-elements';
import {primary, logo, secondary} from '../../../assets';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Fonts} from '../../../utils/Fonts';
import Zocial from 'react-native-vector-icons/Zocial';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useState} from 'react';
import {connect} from 'react-redux';
import Picker from '../../../components/Picker';
const Withdraw = ({params, navigation, userCart, balance}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const sheet = useRef();
  const [email, changeemail] = useState('');
  const [Newpass, changenewpass] = useState('');
  const [Conpass, changeconpass] = useState('');
  const check = async () => {};

  const handleamount = () => {
    if (Newpass.text <= 5) {
      alert('Not Enter less then 5');
      // alert(balance);
    }
    // else if (Newpass.text < balance) navigation.navigate('Dashboard');
    else if (Number(Newpass.text) > balance) {
      alert('Enter Correct Value');
    } else {
      alert(' correct value');
    }
  };
  return (
    <View style={{flex: 1}}>
      <Header
        containerStyle={{paddingTop: 10}}
        backgroundColor={colors.primary}
        leftComponent={
          <AntDesign
            name="arrowleft"
            size={25}
            style={{marginTop: 8}}
            color="white"
            onPress={() => {
              navigation.goBack();
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

      <View style={{flex: 1}}>
        <ImageBackground
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
          }}
          source={require('../../../assets/background.png')}>
          <View
            style={{
              height: 420,
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
            <Text style={{marginTop: 20, fontSize: 20}}>WidthDraw</Text>

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
                  justifyContent: 'center',
                }}>
                <Foundation
                  name="pound"
                  size={25}
                  color="grey"
                  style={{}}></Foundation>
              </View>
              <View style={styles.email}>
                <TextInput
                  placeholderTextColor="gray"
                  style={{
                    // marginTop: 2,
                    fontSize: 12,
                    justifyContent: 'center',
                  }}
                  onChangeText={(text) => changeemail(text)}
                  value={email}
                  placeholder="Amount"></TextInput>
              </View>
            </View> */}

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
                <Foundation
                  name="pound"
                  size={25}
                  color="grey"
                  style={{}}></Foundation>
              </View>
              <View style={styles.email}>
                <TextInput
                  placeholderTextColor="gray"
                  style={{
                    marginTop: 2,
                    fontSize: 12,
                    justifyContent: 'center',
                  }}
                  keyboardType="number-pad"
                  value={Newpass}
                  onChangeText={(text) => {
                    const re = /^[0-9\b]+$/;
                    if (text === '' || re.test(text))
                      changenewpass({
                        text,
                      });
                    // onChangeText={(text) => changenewpass(text)}
                  }}
                  placeholder="Withdraw Amount"></TextInput>
              </View>
            </View>
            <View style={{backgroundColor: 'red', width: '100%'}}>
              <Text style={{position: 'absolute', right: 30}}>
                {'£: ' + balance}
              </Text>
            </View>
            <Picker
              title={!selectedValue ? 'Choose Payment Method' : selectedValue}
              onPress={() => {
                sheet.current.open();
              }}
            />
            {selectedValue !== '' && (
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  borderBottomWidth: 1,
                  borderColor: 'grey',
                  marginTop: 20,
                  height: 38,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <Zocial
                    name="email"
                    size={20}
                    color="grey"
                    style={{}}></Zocial>
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
                    placeholder="Enter Email"></TextInput>
                </View>
              </View>
            )}

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
              //   onPress={check}

              onPress={handleamount}>
              <Text style={{color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <RBSheet
        ref={sheet}
        height={240}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginTop: 10,
          },
        }}>
        <Text style={{margin: 20, fontSize: 20, color: colors.primary}}>
          Choose Payment Method
        </Text>

        <Text
          style={{margin: 20, fontSize: 20}}
          onPress={() => {
            setSelectedValue('Paypal');
            sheet.current.close();
          }}>
          Paypal
        </Text>
        <Text
          style={{margin: 20, fontSize: 20}}
          onPress={() => {
            setSelectedValue('Payoneer');
            sheet.current.close();
          }}>
          Payoneer
        </Text>
      </RBSheet>
    </View>
  );
};

const mapStateToProps = (state) => {
  const {userCart} = state.cart;
  const {balance} = state.competitionuser;
  return {userCart, balance};
};
export default connect(mapStateToProps)(Withdraw);
