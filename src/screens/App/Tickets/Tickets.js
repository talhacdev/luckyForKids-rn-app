import React, {useState} from 'react';
import {Text, FlatList, TouchableOpacity, View, Image} from 'react-native';
import colors from '../../../theme/colors';
import styles from './styles';
import {Header, Badge} from 'react-native-elements';
import {primary, logo, secondary} from '../../../assets';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Fonts} from '../../../utils/Fonts';
import {Loading} from '../../../components/Loading';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
//redux
import {connect} from 'react-redux';
import {getMyTickets} from '../../../Redux/Action/Competitionaction';
import {ScrollView} from 'react-native-gesture-handler';
import {ScreenStackHeaderRightView} from 'react-native-screens';
const Tickets = ({
  params,
  navigation,
  getMyTickets,
  myTickets,
  user,
  userCart,
}) => {
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = getData();
      return () => {
        unsubscribe;
      };
    }, []),
  );
  const getData = async () => {
    try {
      setLoading(true);
      const res = await getMyTickets(user?.auth);
      setLoading(false);
    } catch (err) {}
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
        // centerComponent={
        //   <Text style={[styles.large, {color: 'white', marginTop: 10}]}>
        //     Tickets
        //   </Text>
        // }

        // centerComponent={
        //   <Image
        //     style={{
        //       resizeMode: 'contain',
        //       height: 30,
        //       width: 60,
        //       marginTop: 8,
        //     }}
        //     source={require('../../../assets/logo.png')}></Image>

        // }
        centerComponent={
          <Text style={[styles.medium, {color: 'white', marginTop: 10}]}>
            My Tickets
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
      <ScrollView horizontal>
        <FlatList
          data={myTickets}
          keyExtractor={(item) => {
            item;
          }}
          ListHeaderComponent={
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.button, {backgroundColor: colors.secondary}]}>
                <Text style={[styles.medium, {color: 'white'}]}>ID</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.button, {backgroundColor: colors.primary}]}>
                <Text style={[styles.medium, {color: 'white'}]}>
                  Raffle Name
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.button, {backgroundColor: colors.ternary}]}>
                <Text style={[styles.medium, {color: 'white'}]}>
                  Ticket purchased
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.button, {backgroundColor: colors.primary}]}>
                <Text style={[styles.medium, {color: 'white'}]}>
                  Date purchased
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.button, {backgroundColor: colors.secondary}]}>
                <Text style={[styles.medium, {color: 'white'}]}>
                  Date of Draw
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.button, {backgroundColor: colors.ternary}]}>
                <Text style={[styles.medium, {color: 'white'}]}>
                  Cost per Ticket
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                activeOpacity={1}
                style={[styles.button, {backgroundColor: colors.secondary}]}>
                <Text style={[styles.medium, {color: 'white'}]}>Date</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.button, {backgroundColor: colors.ternary}]}>
                <Text style={[styles.medium, {color: 'white'}]}>
                  Winning Status
                </Text>
              </TouchableOpacity> */}
            </View>
          }
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Ticket1', {tickets: item.tickets})
                }
                style={{
                  backgroundColor: index % 2 === 0 ? '#F7FEFF' : '#F2F6F9',
                  // margin: 0.2,
                  paddingHorizontal: 2,
                  // paddingVertical: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // borderRadius: 4,
                  borderWidth: 0.2,
                  borderColor: '#e2e2',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    flex: 1,
                    height: '100%',
                    // paddingHorizontal: 10,
                    margin: 10,
                  }}>
                  <View
                    style={{
                      // backgroundColor: 'red',
                      borderRightWidth: 1,
                      borderColor: 'white',
                      // width: '24%',
                      justifyContent: 'center',
                      marginTop: -1,
                    }}>
                    <Text
                      style={[
                        styles.medium,
                        {fontFamily: Fonts.PoppinsRegular},
                      ]}>
                      {/* {item.competition_name} */}
                      LOT_15
                    </Text>
                  </View>

                  <View
                    style={{
                      // backgroundColor: 'red',
                      borderRightWidth: 1,
                      borderColor: 'white',
                      width: '17%',
                      justifyContent: 'center',
                      marginTop: -1,
                    }}>
                    <Text
                      style={[
                        styles.medium,
                        {fontFamily: Fonts.PoppinsRegular},
                      ]}>
                      {/* {item.competition_name} */}
                      Raffle 1
                    </Text>
                  </View>

                  <View
                    style={{
                      // backgroundColor: 'red',
                      borderRightWidth: 1,
                      width: '21%',

                      borderColor: 'white',
                      justifyContent: 'center',
                      marginTop: -1,
                    }}>
                    <Text
                      style={[
                        styles.medium,
                        {
                          marginLeft: 10,
                          fontFamily: Fonts.OpenSansSemiBold,
                          color: colors.orange,
                        },
                      ]}>
                      {/* {item.date_purchased} */}
                      40
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderColor: 'white',
                      // backgroundColor: 'red',
                      alignSelf: 'center',
                      width: '21%',
                    }}>
                    <Text
                      style={[
                        styles.medium,
                        {
                          marginLeft: 10,
                          fontFamily: Fonts.OpenSansSemiBold,
                          justifyContent: 'center',
                          color: colors.orange,
                        },
                      ]}>
                      {/* {item.date_purchased} */}
                      26,Mar 2021
                    </Text>
                    {/* <Ionicons name={'chevron-forward'} size={17} color="gray" /> */}
                  </View>
                  <View
                    style={{
                      // backgroundColor: 'red',
                      borderRightWidth: 1,
                      width: '17%',

                      borderColor: 'white',
                      justifyContent: 'center',
                      marginTop: -1,
                    }}>
                    <Text
                      style={[
                        styles.medium,
                        {
                          marginLeft: 10,
                          fontFamily: Fonts.OpenSansSemiBold,
                          color: colors.orange,
                        },
                      ]}>
                      {/* {item.date_purchased} */}
                      26,Mar 2021
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      borderRightWidth: 1,
                      borderColor: 'white',
                      // backgroundColor: 'red',
                      alignSelf: 'center',
                      width: '20%',
                    }}>
                    <Text
                      style={[
                        styles.medium,
                        {
                          marginLeft: 40,
                          fontFamily: Fonts.OpenSansSemiBold,
                          justifyContent: 'center',
                          color: colors.orange,
                        },
                      ]}>
                      40
                    </Text>
                    <Ionicons
                      name={'chevron-forward'}
                      size={17}
                      color="gray"
                      style={{marginRight: 10}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
      <Loading visible={loading} />
    </View>
  );
};
const mapStateToProp = (state) => {
  const {myTickets} = state.competitionuser;
  const {userCart} = state.cart;
  const {user} = state.auth;

  return {myTickets, user, userCart};
};
export default connect(mapStateToProp, {getMyTickets})(Tickets);
