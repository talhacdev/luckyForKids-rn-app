import React from 'react';
import {Text, FlatList, TouchableOpacity, View, Image} from 'react-native';
import colors from '../../../theme/colors';
import styles from './styles';
import {Header, Badge} from 'react-native-elements';
import {primary, logo, secondary} from '../../../assets';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {Fonts} from '../../../utils/Fonts';
const Tickets = ({params, navigation, route, userCart}) => {
  const tickets = route?.params.tickets;
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
        // centerComponent={
        //   <Text style={[styles.large, {color: 'white', marginTop: 10}]}>
        //     Tickets
        //   </Text>
        // }

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

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',

          width: '100%',

          padding: 4,
          marginVertical: 10,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.button, {backgroundColor: colors.primary}]}>
          <Text style={[styles.medium, {color: 'white'}]}>Raffle Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.button, {backgroundColor: colors.secondary}]}>
          <Text style={[styles.medium, {color: 'white'}]}>Tickets</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.button, {backgroundColor: colors.ternary}]}>
          <Text style={[styles.medium, {color: 'white'}]}>Winning Status</Text>
        </TouchableOpacity>
      </View> */}
      <FlatList
        data={tickets}
        numColumns={3}
        keyExtractor={(item) => {
          item;
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: index % 2 === 0 ? '#F7FEFF' : '#F2F6F9',

                paddingHorizontal: 2,
                // paddingVertical: 2,

                alignItems: 'center',
                flex: 1,
                // borderRadius: 4,
                borderWidth: 0.2,

                borderColor: '#e2e2',
              }}>
              <View
                style={{
                  // backgroundColor: 'red',
                  borderRightWidth: 1,
                  padding: 10,
                  justifyContent: 'center',
                  marginTop: -1,
                  borderColor: 'white',
                }}>
                <Text
                  style={[styles.medium, {fontFamily: Fonts.PoppinsRegular}]}>
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  const {userCart} = state.cart;
  return {userCart};
};
export default connect(mapStateToProps)(Tickets);
