import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Header, Badge} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//redux
import {changeUName, changeUPass} from '../../../Redux/Action/Loginaction';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import {Loading} from '../../../components/Loading';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Settings = ({
  params,
  navigation,
  user,
  changeUName,
  password,
  changeUPass,
  userCart,
}) => {
  const [active, setActive] = useState(true);

  const [editable, setEditable] = useState(false);
  const [passeditable, setPassEditable] = useState(false);

  const [name, setName] = useState(user?.display_name);
  const [email, setEmail] = useState('alice@dummy.com');

  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [uk, setUk] = useState('');
  const [pcode, setPcode] = useState('');

  const [pass, setPassword] = useState('');
  const [oldPass, setOldPassword] = useState('');

  const [newPass, setNewPass] = useState('');
  const [cnfPass, setCnfPass] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChangeName = async () => {
    if (!name) {
      Alert.alert('Winner Wish', 'Kindly enter name');
    } else if (!address) {
      Alert.alert('Winner Wish', 'Kindly enter address');
    } else {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('userName', name);
        const res = await changeUName(formData, user?.auth);
        setLoading(false);
        Alert.alert('Winner Wish', res?.data?.message);
        setEditable(false);
      } catch (er) {
        console.log(er);
      }
    }
  };

  const handleChangePass = async () => {
    if (!oldPass) {
      Alert.alert('Winner Wish', 'Kindly enter old password');
    } else if (!pass) {
      Alert.alert('Winner Wish', 'Kindly enter Password');
    } else if (!cnfPass) {
      Alert.alert('Winner Wish', 'Kindly confirm new password');
    } else if (pass !== cnfPass) {
      Alert.alert(
        'Winner Wish',
        'New Password & Confirm Password did not match',
      );
    } else if (oldPass !== password) {
      Alert.alert('Winner Wish', 'Your old password is incorrect');
    } else {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('password', pass);
        const res = await changeUPass(formData, user?.auth);
        setLoading(false);
        Alert.alert('Winner Wish', res?.data?.message);
        setEditable(false);
        setOldPassword('');
        setPassword('');
        setCnfPass('');
      } catch (er) {
        console.log(er);
      }
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
          <Text style={[styles.large, {color: 'white', marginTop: 10}]}>
            Settings
          </Text>
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',

          width: '100%',

          padding: 4,
          marginVertical: 10,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          onPress={() => {
            setActive(true);
            setEditable(false);
          }}
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: active ? colors.primary : colors.white},
          ]}>
          <Text style={[styles.medium, {color: active ? 'white' : 'black'}]}>
            User Name
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setActive(false);
            setEditable(false);
          }}
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: !active ? colors.primary : colors.white},
          ]}>
          <Text style={[styles.medium, {color: active ? 'black' : 'white'}]}>
            Password
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        onPress={() => {
          setEditable(!editable);
        }}
        style={[
          styles.medium,
          {color: colors.secondary, alignSelf: 'flex-end', margin: 14},
        ]}>
        {!editable && 'Edit'}
      </Text>
      {active ? (
        <KeyboardAwareScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          {/* <Text style={{marginLeft: 10, color: 'grey'}}>First Name</Text> */}
          <TextInput
            placeholderTextColor="gray"
            // editable={editable}
            style={[styles.inputText, {color: editable ? 'black' : 'gray'}]}
            value={name}
            editable={editable}
            placeholder={'Name'}
            onChangeText={(text) => setName(text)}
          />
          {/* <Text style={{marginLeft: 10, color: 'grey'}}>Sur Name</Text> */}
          <TextInput
            editable={editable}
            style={[styles.inputText, {color: editable ? 'black' : 'gray'}]}
            value={email}
            placeholder={'Email'}
            onChangeText={(text) => setEmail(text)}
          />
          {/* <Text style={{marginLeft: 10, color: 'grey'}}>Email</Text> */}
          <TextInput
            placeholderTextColor="gray"
            editable={editable}
            style={[styles.inputText, {color: editable ? 'black' : 'gray'}]}
            value={address}
            placeholder={'address'}
            onChangeText={(text) => setAddress(text)}
          />

          {/* <Text style={{marginLeft: 10, color: 'grey'}}>Telephone</Text> */}
          <TextInput
            placeholderTextColor="gray"
            editable={editable}
            style={[styles.inputText, {color: editable ? 'black' : 'gray'}]}
            value={telephone}
            placeholder={'Telephone'}
            onChangeText={(text) => setTelephone(text)}
          />
          {/* <Text style={{marginLeft: 10, color: 'grey'}}>Uk Address</Text> */}
          <TextInput
            placeholderTextColor="gray"
            editable={editable}
            style={[styles.inputText, {color: editable ? 'black' : 'gray'}]}
            value={uk}
            placeholder={'Uk Address'}
            onChangeText={(text) => setUk(text)}
          />
          {/* <Text style={{marginLeft: 10, color: 'grey'}}>Postal code</Text> */}
          <TextInput
            placeholderTextColor="gray"
            editable={editable}
            style={[styles.inputText, {color: editable ? 'black' : 'gray'}]}
            value={pcode}
            placeholder={'Postal Code'}
            onChangeText={(text) => setPcode(text)}
          />

          {/* <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              margin: 30,
              height: 40,
              borderRadius: 10,
            }}>
            <Text style={{color: 'white'}}>Update Profile</Text>
          </TouchableOpacity> */}
          {editable && (
            <TouchableOpacity
              onPress={() => {
                handleChangeName();
              }}
              activeOpacity={1}
              style={[
                styles.button,
                {
                  backgroundColor: colors.secondary,
                  alignSelf: 'center',
                  marginVertical: 20,
                  width: '95%',
                },
              ]}>
              <Text style={[styles.medium, {color: 'white'}]}>
                Update Username
              </Text>
            </TouchableOpacity>
          )}
        </KeyboardAwareScrollView>
      ) : (
        <KeyboardAwareScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <TextInput
            editable={editable}
            placeholderTextColor="gray"
            style={[styles.inputText, {color: editable ? 'black' : 'gray'}]}
            value={oldPass}
            placeholder={'Old Password'}
            secureTextEntry
            onChangeText={(text) => setOldPassword(text)}
          />
          <TextInput
            placeholderTextColor="gray"
            editable={editable}
            style={[styles.inputText, {color: editable ? 'black' : 'gray'}]}
            value={pass}
            placeholder={'New Password'}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            placeholderTextColor="gray"
            editable={editable}
            style={[
              styles.inputText,
              {
                color: editable ? 'black' : 'gray',
              },
            ]}
            value={cnfPass}
            secureTextEntry
            placeholder={'Confirm Password'}
            onChangeText={(text) => setCnfPass(text)}
          />
          {editable && (
            <TouchableOpacity
              onPress={() => {
                handleChangePass();
              }}
              activeOpacity={1}
              style={[
                styles.button,
                {
                  backgroundColor: colors.secondary,
                  alignSelf: 'center',
                  marginVertical: 20,
                  width: '95%',
                },
              ]}>
              <Text style={[styles.medium, {color: 'white'}]}>
                Update Password
              </Text>
            </TouchableOpacity>
          )}
        </KeyboardAwareScrollView>
      )}
      <Loading visible={loading} />
    </View>
  );
};
const mapStateToProps = (state) => {
  const {user, password} = state.auth;
  const {userCart} = state.cart;
  return {user, password, userCart};
};
export default connect(mapStateToProps, {changeUName, changeUPass})(Settings);
