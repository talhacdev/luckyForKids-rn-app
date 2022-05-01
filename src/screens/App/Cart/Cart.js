import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Text, View} from 'react-native';
import {charityCateg} from '../../../Redux/Action/Competitionaction';
import styles from './styles';
import {Fonts} from '../../../utils/Fonts';
import {saveCharity} from '../../../Redux/Action/Loginaction';
import Entypo from 'react-native-vector-icons/Entypo';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Header, Badge, Divider} from 'react-native-elements';
import {primary, logo, secondary} from '../../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator, RadioButton} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../theme/colors';
import {competition} from '../../../Redux/Action/Competitionaction';
import {connect} from 'react-redux';
import {Loading} from '../../../components/Loading';
import {
  useFocusEffect,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
import {
  addToCart,
  updateTotalPrice,
  placeorder,
  applyCoupon,
} from '../../../Redux/Action/cart';
const Cart = ({
  params,
  navigation,
  selectedIndex,
  userCart,
  totalPrice,
  addToCart,
  updateTotalPrice,
  placeorder,
  user,
  route,
  applyCoupon,
  charityId,
  charityList,
  charityCateg,
  isLoggedIn,
  balance,
}) => {
  const [qty, setQty] = useState(0);
  const [value, setValue] = React.useState('first');
  const [price, setPrice] = useState('');
  const [min, setMin] = useState('');
  const [action, setAction] = useState('');
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paypal, setpaypal] = useState(true);
  const [stripe, setstripe] = useState(false);
  const [isbalance, setbalance] = useState(false);
  const [code, setCode] = useState('');
  const from = route?.params?.from;
  const [charityname, setCharity] = useState(null);
  const [couponLoading, setcouponLoading] = useState(false);
  console.log(userCart);
  const sheet = useRef();
  const handleQuesChange = async (value, id) => {
    let updateCart =
      userCart &&
      userCart.map((item) => {
        if (item.ID === id) {
          return {
            ...item,
            selectedQues: value,
          };
        }
        return item;
      });
    await addToCart(updateCart, totalPrice);
  };
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
      const res = await charityCateg();
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewCharity = async (charity) => {
    try {
      await saveCharity(charity.catid);
      setCharity(charity);
      sheet.current.close();
    } catch (err) {
      console.log();
    }
  };
  const handleRemove = async (item) => {
    try {
      const updateCart =
        userCart &&
        userCart.filter((cartItem) => {
          return cartItem.ID !== item.ID;
        });
      const filterItem =
        userCart &&
        userCart.filter((cartItem) => {
          return cartItem.ID === item.ID;
        });
      let updateTotalPrice =
        parseFloat(totalPrice) - parseFloat(filterItem[0]?.totalPrice);

      await addToCart(updateCart, updateTotalPrice);
    } catch (Err) {
      console.log(Err);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = handlefun();
      return () => unsubscribe;
    }, []),
  );
  const handlefun = () => {
    const approved = route?.params?.approved;
    const paypalResponse = route?.params?.response;
    if (userCart && userCart.length > 0) {
      approved === 'true' && paypalResponse && handleCheckout(paypalResponse);
    }
  };
  const handleCheckout = async (paypalResponse) => {
    try {
      const formData = new FormData();
      const lott =
        userCart &&
        userCart.map((item) => {
          return {
            lottery_id: item.ID,
            quantity: item.qty,
          };
        });
      let lottries =
        userCart &&
        userCart.map((item) => {
          return item.ID;
        });
      formData.append(
        'trans_id',
        paypalResponse?.data?.transactions[0]?.related_resources[0]?.sale?.id,
      );
      formData.append('order_total', totalPrice);
      formData.append('order_sub_total', totalPrice);
      formData.append('payment_method', 'paypal');
      formData.append('charityid', charityId);

      formData.append('lottries', lottries.toString());
      formData.append('order_detail', JSON.stringify(lott));

      console.log(formData);
      // return console.log(formData);

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
  useEffect(() => {
    update && handleOverallPrice(price, min, action);
  }, [update]);
  const handleOverallPrice = async (price, min, action) => {
    if (action === 'add') {
      console.log('Total', totalPrice, 'price', price, 'min', min);
      console.log('Add', totalPrice + parseFloat(price) * parseInt(min));

      await updateTotalPrice(totalPrice + parseFloat(price) * parseInt(min));
      setUpdate(false);
    } else {
      console.log('Minus', totalPrice - parseFloat(price) * parseInt(min));
      console.log('Total', totalPrice, 'price', price, 'min', min);
      let subt = parseFloat(price) * parseInt(min);
      await updateTotalPrice(totalPrice - subt);
      setUpdate(false);
    }
  };
  const handleIncrement = async (id, action) => {
    const res =
      userCart &&
      userCart.map((item) => {
        if (parseInt(id) === parseInt(item.ID)) {
          return {
            ...item,
            qty: calculateQty(item.qty, item.minimum_entry, action),
            totalPrice: calculatePrice(
              item.totalPrice,
              item.price,
              item.minimum_entry,
              action,
            ),
          };
        }
        return item;
      });
    console.log(res);
    await addToCart(res, totalPrice);
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
      const res = await applyCoupon(formData, totalPrice);
      setcouponLoading(false);
      setCode('');
    } catch (err) {
      console.log(err);
    }
  };
  const handleOrder = async () => {
    const formData = new FormData();
    const lott = userCart?.map((item) => {
      return {
        lottery_id: item.ID,
        quantity: item.qty,
      };
    });
    let lottries = userCart?.map((item) => {
      return item.ID;
    });
    formData.append('order_total', totalPrice);
    formData.append('order_sub_total', totalPrice);
    formData.append('payment_method', 'balance');
    formData.append('lottries', lottries.toString());
    formData.append('order_detail', JSON.stringify(lott));

    formData.append('charityid', charityId);
    console.log(formData);
    if (parseFloat(balance) > parseFloat(totalPrice)) {
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
        `You Don't have enough balance in wallet to checkout`,
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
        rightComponent={
          <TouchableOpacity activeOpacity={1}>
            <Entypo
              name="shopping-cart"
              size={23}
              style={{marginTop: 12, marginRight: 10}}
              color="white"
            />
            {userCart.length > 0 && (
              <Badge
                value={userCart && userCart.length}
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
      {userCart?.length > 0 && (
        <View
          style={{
            borderRadius: 50,
            margin: 10,
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.charity}
            onPress={() => {
              sheet.current.open();
            }}>
            <Image
              style={{height: 35, width: 45, margin: 8, tintColor: '#fa8072'}}
              source={require('../../../assets/charity.png')}
            />
            <Text
              style={[
                styles.medium,
                {
                  color: 'black',

                  fontSize: 13,
                  alignSelf: 'center',
                  width: '80%',
                  marginTop: -10,
                },
              ]}>
              5% of all ticket purchases go towards your
              <View style={{position: 'absolute', right: 0}}>
                <Text
                  style={[
                    {
                      fontSize: 13,

                      color: 'red',
                      // margin: 15,
                      // padding: 10,
                      position: 'absolute',
                      right: 0,
                      marginTop: 5,
                    },
                  ]}>
                  {charityname ? charityname.catname : 'Change Charity'}
                </Text>
              </View>
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={userCart}
        keyExtractor={(item) => {
          item;
        }}
        ListHeaderComponent={
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
            Total: {'£' + totalPrice}
          </Text>
        }
        renderItem={({item, index}) => {
          return (
            <View style={{margin: 5}}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 0.5,

                    backgroundColor: item.color,
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
                      width: width / 2.7,
                      height: height / 3.5,

                      margin: 20,
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
                      {'£ ' + item.totalPrice}
                    </Text>
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
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: -5,
                    }}>
                    <TouchableOpacity
                      style={styles.circularButton}
                      onPress={() => {
                        handleIncrement(item.ID, 'add');
                      }}>
                      <Entypo name="plus" size={20} color={colors.secondary} />
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: 'black',
                        alignItems: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginTop: 5,
                      }}>
                      {item.qty}
                    </Text>

                    <TouchableOpacity
                      style={styles.circularButton}
                      onPress={() => {
                        handleIncrement(item.ID, 'minus');
                      }}>
                      <Entypo name="minus" size={20} color={colors.secondary} />
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
                    onValueChange={(newValue) =>
                      handleQuesChange(newValue, item.ID)
                    }
                    value={item.selectedQues}>
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
          userCart &&
          userCart.length > 0 && (
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
                <View style={{width: '10%', padding: 10}}>
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
                  // alignContent: 'center',
                  // alignSelf: 'center',
                  // textAlign: 'center',

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
                  if (isLoggedIn) {
                    if (paypal) {
                      navigation.navigate('Paypal', {
                        price: totalPrice,
                        from: 'cart',
                      });
                    } else if (stripe) {
                      navigation.navigate('Stripe', {
                        price: totalPrice,
                        from: 'cart',
                      });
                    } else {
                      handleOrder();
                    }
                  } else {
                    Alert.alert('Winner Wish', 'Kindly login first');
                    navigation.navigate('Login');
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

      <RBSheet
        ref={sheet}
        height={440}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginTop: 10,
          },
        }}>
        <ScrollView>
          <Text style={{margin: 20, fontSize: 20, color: colors.primary}}>
            Choose Category
          </Text>
          {charityList &&
            charityList.map((item, index) => {
              return (
                <View>
                  <Text
                    style={{margin: 20, fontSize: 20}}
                    onPress={() => {
                      handleNewCharity(item);
                    }}>
                    {item.catname}
                  </Text>
                </View>
              );
            })}
        </ScrollView>
      </RBSheet>
    </View>
  );
};
const mapStateToProps = (state) => {
  const {userCart, totalPrice} = state.cart;
  const {user, charityId} = state.auth;
  const {charityList} = state.competitionuser;
  const {isLoggedIn} = state.auth;
  const {balance} = state.competitionuser;
  return {
    userCart,
    totalPrice,
    user,
    charityId,
    charityList,
    isLoggedIn,
    balance,
  };
};
export default connect(mapStateToProps, {
  addToCart,
  updateTotalPrice,
  placeorder,
  applyCoupon,
  saveCharity,
  charityCateg,
})(Cart);
