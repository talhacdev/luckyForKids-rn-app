import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {BASE_URL} from '../../../Redux/Baseurl';
import axios from 'axios';
import {Text, View} from 'react-native';
import styles from './styles';
import {Fonts} from '../../../utils/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import {Header, Badge, Divider} from 'react-native-elements';
import {primary, logo, secondary} from '../../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator, RadioButton} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../theme/colors';
import {
  useFocusEffect,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import {connect} from 'react-redux';
import {Loading} from '../../../components/Loading';

import {placeorder, applyCoupon} from '../../../Redux/Action/cart';
const InstantBuy = ({
  params,
  navigation,

  placeorder,
  user,
  route,
  applyCoupon,
  charityId,
  userCart,

  totalPrice,
  balance,
}) => {
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [data, setData] = useState([route?.params?.item]);
  const [min, setMin] = useState('');
  const [action, setAction] = useState('');
  const [update, setUpdate] = useState(false);
  const [color, setColor] = useState(route?.params?.color);
  const [loading, setLoading] = useState(false);
  const [paypal, setpaypal] = useState(true);
  const [stripe, setstripe] = useState(false);
  const [isbalance, setbalance] = useState(false);
  const [code, setCode] = useState('');
  const [couponLoading, setcouponLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const calculateQty = (qty, min, action) => {
    if (action === 'add') {
      return qty + parseInt(min);
    } else {
      if (qty == parseInt(min)) {
        return parseInt(min);
      } else {
        return qty - parseInt(min) == parseInt(min)
          ? parseInt(min)
          : qty - parseInt(min);
      }
    }
  };
  const d1 = route?.params?.item;
  //   useFocusEffect(
  //     React.useCallback(() => {
  //       const unsubscribe = handlefun();
  //       return () => unsubscribe;
  //     }, []),
  //   );
  useEffect(() => {
    const unsub = handleItem();
    return () => {
      unsub;
    };
  }, [d1]);

  const handleItem = () => {
    const data = route?.params?.item;
    const color = route?.params?.color;
    setData([data]);
    setColor(color);
    setQty(parseInt(data?.qty));
    setPrice(parseInt(data?.totalPrice));
  };

  const handlefun = () => {
    const approved = route?.params?.approved;
    const paypalResponse = route?.params?.response;

    // approved === 'true' && paypalResponse && handleCheckout(paypalResponse);
  };
  const handleCheckout = async () => {
    try {
      //   setLoading(true);
      const formData = new FormData();

      //
      formData.append('order_total', price);
      formData.append('order_sub_total', price);
      formData.append('payment_method', 'paypal');
      formData.append('charityid', charityId);

      formData.append('lottries', d1?.ID);
      formData.append(
        'order_detail',
        JSON.stringify([{lottery_id: d1?.ID, quantity: qty}]),
      );

      navigation.navigate(
        paypal ? 'Paypal' : 'Stripe',
        paypal
          ? {
              price: price,
              from: 'instant',
              apiParams: {
                price: price,
                method: 'paypal',
                charityid: charityId,
                lottries: d1?.ID,
                quantity: qty,
              },
            }
          : {
              from: 'instant',
              apiParams: {
                price: price,
                method: 'paypal',
                charityid: charityId,
                lottries: d1?.ID,
                quantity: qty,
              },
            },
      );
      //   const res = await placeorder(formData, user?.auth);
      //   if (res.data.status) {
      //     alert(res.data.message);
      //     setLoading(false);
      //     navigation.navigate('Dashboard');
      //   } else {
      //     alert(res.data.message);
      //     setLoading(false);
      //   }
    } catch (err) {
      console.log(err);
    }
    // navigation.navigate('Thankyou');
  };

  const calculatePrice = (newprice, price, min, action) => {
    if (action === 'add') {
      setMin(min);
      setPrice(price);
      setAction(action);
      setUpdate(true);
      handleOverallPrice(price, min, action);
      return parseFloat(newprice) + parseFloat(price) * parseInt(min);
    } else {
      if (parseFloat(newprice) / parseInt(min) == parseFloat(price)) {
        return parseFloat(newprice);
      } else {
        setMin(min);
        setPrice(price);
        setAction(action);
        setUpdate(true);
        handleOverallPrice(price, min, action);
        return parseFloat(newprice) - parseFloat(price) * parseInt(min);
      }
    }
  };

  const handleIncrement = async (id, action) => {
    if (action === 'add') {
      setQty(qty + parseInt(d1?.qty));
      setPrice(parseFloat(price) + parseFloat(d1?.price) * parseInt(d1.qty));
    } else {
      if (qty == parseInt(d1?.qty)) {
        setQty(parseInt(d1?.qty));
        setPrice(parseFloat(d1?.price));
      } else {
        setQty(qty - parseInt(d1?.qty));
        setPrice(parseFloat(price) - parseFloat(d1?.price) * parseInt(d1?.qty));
      }
    }
    // if (action === 'add') {

    //   setQty(qty + parseInt(d1?.qty));
    //   setPrice(price + parseInt(data?.price) * data?.qty);
    // } else {
    //   if (qty == 0) {
    //     return;
    //   } else {
    //     setQty(qty - 1);
    //     setPrice(price + parseInt(data?.price) * data?.qty);
    //   }
    // }
  };

  const changeTab = (index) => {
    if (index === 1) {
      setpaypal(true);
      setstripe(false);
      setbalance(false);
    }
    if (index === 2) {
      setpaypal(false);
      setstripe(true);
      setbalance(false);
    }
    if (index === 3) {
      setpaypal(false);
      setstripe(false);
      setbalance(true);
    }
  };
  const handleCoupon = async () => {
    try {
      setcouponLoading(true);
      const formData = new FormData();
      formData.append('vcode', code);
      console.log(formData);
      const res = await axios.post(
        `${BASE_URL}wp-json/winnerwish/v1/check_voucher`,
        formData,
      );
      console.log(res);
      if (!res.data.error) {
        Alert.alert('Congrats', res.data.success_msg);

        setPrice(
          parseFloat(
            (parseFloat(price) *
              parseFloat(res?.data?.voucher_detail?.vprice)) /
              100.0,
          ),
        );
        setcouponLoading(false);
        setCode('');
      } else {
        alert(res.data.error_msg);
        setcouponLoading(false);
        setCode('');
      }
    } catch (err) {
      setcouponLoading(false);
      setCode('');
      console.log(err);
    }
  };

  const handleOrder = async () => {
    const formData = new FormData();

    //
    formData.append('order_total', price);
    formData.append('order_sub_total', price);
    formData.append('payment_method', 'balance');
    formData.append('charityid', charityId);

    formData.append('lottries', d1?.ID);
    formData.append(
      'order_detail',
      JSON.stringify([{lottery_id: d1?.ID, quantity: qty}]),
    );
    console.log(formData);
    if (parseFloat(balance) > parseFloat(price)) {
      setLoading(true);
      const res = await placeorder(formData, user?.auth);
      if (res.data.status) {
        alert(res.data.message);
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Root'}],
          }),
        );
      } else {
        alert(res.data.message);
        setLoading(false);
      }
    } else {
      Alert.alert(
        'Winner Wish',
        `You Don't have enough balance  in wallet to checkout`,
      );
    }
  };
  return (
    <View style={styles.mainContainer}>
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
      />

      <Text
        style={[
          styles.large,
          {
            color: 'grey',
            // color: colors.secondary,
            marginTop: 10,
            alignSelf: 'flex-end',
            margin: 12,
            fontSize: 14,
          },
        ]}>
        Total: {'£' + price}
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => {
          item;
        }}
        renderItem={({item, index}) => {
          return (
            <View style={{margin: 5}}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 0.5,

                    backgroundColor: color,
                  }}>
                  <Text
                    style={[
                      styles.large1,
                      {
                        color: 'white',
                        justifyContent: 'center',
                        marginTop: 10,
                        marginBottom: 8,
                      },
                    ]}>
                    {item.title}
                  </Text>

                  <Divider
                    style={{
                      height: 1,
                      width: '100%',
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      marginVertical: 2,
                    }}
                  />
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: 160,
                      height: 190,
                      marginVertical: 4,

                      margin: 10,
                    }}
                  />
                </View>
                <View style={{marginLeft: 10, flex: 0.5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.large,
                        {color: 'red', margin: 10, fontWeight: 'bold'},
                      ]}>
                      {'£ ' + price}
                    </Text>
                    {/*                   
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          'Winner Wish',
                          'Are you sure to remove item ?',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'Remove',
                              onPress: () => handleRemove(item),
                            },
                          ],
                          {cancelable: false},
                        );
                      }}
                      style={{
                        backgroundColor: colors.primary,
                        borderRadius: 100,
                        height: 27,
                        width: 27,
                        margin: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="cross" size={20} color={colors.white} />
                    </TouchableOpacity>
                  */}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: -5,
                    }}>
                    <TouchableOpacity
                      style={styles.circularButton}
                      onPress={() => {
                        handleIncrement(item.ID, 'minus');
                      }}>
                      <Entypo name="minus" size={20} color={colors.secondary} />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: 'black',
                        alignItems: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginTop: 5,
                      }}>
                      {qty}
                    </Text>
                    <TouchableOpacity
                      style={styles.circularButton}
                      onPress={() => {
                        handleIncrement(item.ID, 'add');
                      }}>
                      <Entypo name="plus" size={20} color={colors.secondary} />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      marginTop: 5,
                      marginLeft: 5,
                      fontSize: 12,
                      width: '93%',
                    }}>
                    {item.security_question}
                  </Text>
                  <RadioButton.Group
                    onValueChange={(newValue) => setSelected(newValue)}
                    value={selected}>
                    <View style={{flexDirection: 'row'}}>
                      <RadioButton value="first" />
                      <Text
                        style={[
                          styles.medium,
                          {color: 'black', alignSelf: 'center'},
                        ]}>
                        {item.answer_1}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <RadioButton value="second" />
                      <Text
                        style={[
                          styles.medium,
                          {color: 'black', alignSelf: 'center'},
                        ]}>
                        {item.answer_2}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <RadioButton value="third" />
                      <Text
                        style={[
                          styles.medium,
                          {color: 'black', alignSelf: 'center'},
                        ]}>
                        {item.answer_3}
                      </Text>
                    </View>
                  </RadioButton.Group>
                </View>
              </View>

              <View style={styles.counter}></View>

              <Divider
                style={{
                  height: 1,
                  width: '50%',
                  alignSelf: 'center',
                  marginVertical: 10,
                }}
              />
            </View>
          );
        }}
        ListFooterComponent={
          data?.length > 0 && (
            <View style={{flex: 1}}>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderWidth: 0.5,
                  flexDirection: 'row',
                  borderColor: '#BDBDBD',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View style={{width: '10%'}}>
                  <Image
                    resizeMode={'contain'}
                    source={{
                      uri:
                        'https://www.seekpng.com/png/full/238-2384400_coupon-comments-icon-coupon.png',
                    }}
                    style={{
                      height: 30,
                      width: 30,
                      alignSelf: 'center',
                    }}
                  />
                </View>
                <TextInput
                  value={code}
                  onChangeText={(code) => {
                    setCode(code);
                  }}
                  style={{
                    width: '65%',

                    fontFamily: Fonts.PoppinsMedium,
                    paddingLeft: 10,
                  }}
                  placeholder={'Coupon Code'}
                />

                <Text
                  onPress={() => {
                    code
                      ? handleCoupon()
                      : Alert.alert('Winner Wish', 'Kindly Enter Coupon');
                  }}
                  style={[
                    styles.text,
                    {
                      alignSelf: 'center',
                      fontSize: 14,

                      color: colors.primary,
                    },
                  ]}>
                  {couponLoading ? (
                    <ActivityIndicator
                      animating
                      color={colors.primary}
                      size={'small'}
                    />
                  ) : (
                    `Apply`
                  )}
                </Text>
              </View>
              <Text style={styles.text}>{`Choose Payment Method `}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  // backgroundColor: 'green',
                  alignContent: 'center',
                  alignSelf: 'center',
                  textAlign: 'center',
                  width: '100%',
                  justifyContent: 'space-around',
                  // backgroundColor: 'orange',
                  marginTop: 5,
                }}>
                <View
                  style={
                    {
                      // justifyContent: 'center',
                    }
                  }>
                  <TouchableOpacity
                    onPress={() => {
                      changeTab(1);
                    }}
                    style={{
                      borderRadius: 100,
                      borderWidth: paypal ? 3 : 0,
                      borderColor: paypal ? '#3992a8' : '',
                    }}>
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                        textAlign: 'center',
                      }}
                      source={require('../../../assets/paypal.png')}></Image>
                  </TouchableOpacity>
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                      fontFamily: Fonts.PoppinsMedium,
                      color: paypal ? colors.primary : 'gray',
                      textAlign: 'center',
                    }}>
                    Paypal
                  </Text>
                </View>
                <View style={{}}>
                  <TouchableOpacity
                    onPress={() => {
                      changeTab(2);
                    }}
                    style={{
                      borderRadius: 100,
                      borderWidth: stripe ? 3 : 0,
                      borderColor: stripe ? '#3992a8' : '',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                      }}
                      source={require('../../../assets/write.png')}></Image>
                  </TouchableOpacity>

                  <Text
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontFamily: Fonts.PoppinsMedium,
                      color: stripe ? colors.secondary : 'gray',
                    }}>
                    Credit card
                  </Text>
                </View>

                <View style={{}}>
                  <TouchableOpacity
                    onPress={() => {
                      changeTab(3);
                    }}
                    style={{
                      borderRadius: 100,
                      borderWidth: isbalance ? 3 : 0,
                      borderColor: isbalance ? '#3992a8' : '',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                      }}
                      source={require('../../../assets/wallet.png')}></Image>
                  </TouchableOpacity>

                  <Text
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontFamily: Fonts.PoppinsMedium,
                      color: paypal ? colors.secondary : 'gray',
                    }}>
                    Via Balance
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (selected) {
                    if (isbalance) {
                      handleOrder();
                    } else {
                      handleCheckout();
                    }
                  } else {
                    Alert.alert('Winner Wish', 'Kindly select answer');
                  }
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
                  Proceed to checkout
                </Text>
              </TouchableOpacity>
            </View>
          )
        }
      />

      <Loading visible={loading} />
    </View>
  );
};
const mapStateToProps = (state) => {
  const {user, charityId} = state.auth;
  const {userCart, totalPrice} = state.cart;
  const {balance} = state.competitionuser;
  return {user, charityId, userCart, totalPrice, balance};
};
export default connect(mapStateToProps, {
  placeorder,
  applyCoupon,
})(InstantBuy);
