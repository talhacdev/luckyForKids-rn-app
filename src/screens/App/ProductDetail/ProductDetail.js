import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import styles from './styles';
import {Header, Divider, Badge} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {primary, logo, secondary, ticket, award, clock} from '../../../assets';
import colors from '../../../theme/colors';
import Picker from '../../../components/Picker';
import BottomSheet from '../../../components/BottomSheet';
const window = Dimensions.get('window');
import RBSheet from 'react-native-raw-bottom-sheet';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useFocusEffect} from '@react-navigation/native';
//redux
import {compDetail} from '../../../Redux/Action/Competitionaction';
import {addToCart} from '../../../Redux/Action/cart';
import {saveCharity} from '../../../Redux/Action/Loginaction';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import {Loading} from '../../../components/Loading';
const ProductDetail = ({
  params,
  navigation,
  compDetail,
  route,
  userCart,
  isLoggedIn,
  addToCart,
  charityList,
  totalPrice,
  saveCharity,
}) => {
  const [qty, setQty] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [color, setColor] = useState(route?.params?.color);
  const [itemID, setItemID] = useState(null);
  const [counting, setCounting] = useState(false);
  const sheet = useRef();
  const [charityname, setCharity] = useState(null);
  const [action, setAction] = useState('');
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
      const id = route?.params.id;
      setLoading(true);
      const formData = new FormData();
      formData.append('competition_id', id);
      console.log(formData);
      const res = await compDetail(formData);
      if (res.data.status) {
        const inCart = userCart?.some((cartItem) => {
          return cartItem.ID == res?.data?.data?.ID;
        });
        const newres = {
          ...res.data?.data,
          image: res.data?.data.detail_img,
          qty: parseInt(res.data?.data?.minimum_entry),
          totalPrice:
            parseFloat(res.data?.data?.price) *
            parseInt(res.data?.data?.minimum_entry),
          selectedQues: '',
          isCart: inCart,
        };

        setInCart(inCart);
        setData(newres);
        let quantity = res?.data?.data.minimum_entry;
        setQty(parseInt(quantity));
      } else {
        Alert.alert('Winner Wish', res.data.message);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const filled = () => {
    let sold = data?.sold;
    let total = data?.total_entries;
    const totalper = (parseFloat(sold) * parseFloat(total)) / 100;
    return (
      <View
        style={[
          styles.filled,
          {width: totalper >= 100.0 ? '100%' : `${totalper}%`},
        ]}
      />
    );
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
  const handleAddToCart = async (data, color) => {
    try {
      if (isLoggedIn) {
        await addToCart(
          [...userCart, {...data, color, qty: qty}],
          totalPrice + data.totalPrice,
        );

        Alert.alert('Winner Wish', 'Added to Cart Successfully', [
          {
            text: 'OK',
            onPress: () => {
              setUpdate(!update);
            },
          },
        ]);
      } else {
        Alert.alert('Winner Wish', 'Kindly login in');
        navigation.navigate('Login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (item, color) => {
    const newCart =
      userCart &&
      userCart.filter((eachItem) => {
        return item.ID != eachItem.ID;
      });

    const singleItem =
      userCart &&
      userCart.filter((eachItem) => {
        return item.ID == eachItem.ID;
      });

    let deletedPrice = singleItem[0]?.totalPrice;
    await addToCart(newCart, parseFloat(totalPrice) - parseFloat(deletedPrice));
    setItemID(item);
    setColor(color);
    setDeleted(true);
  };
  useEffect(() => {
    const res = handleUpdate();
  }, [deleted]);
  const handleUpdate = async () => {
    deleted &&
      (await addToCart(
        [...userCart, {...itemID, color}],
        parseFloat(totalPrice) + parseFloat(itemID.totalPrice),
      ));
    deleted && alert('cart updated');
    setInCart(true);
    setDeleted(false);
  };
  const handleIncrement = async () => {
    setData({
      ...data,
      isCart: false,
      qty: calculateQty(data?.qty, data?.minimum_entry, action),
      totalPrice: calculatePrice(
        data?.totalPrice,
        data?.price,
        data?.minimum_entry,
        action,
      ),
    });
    console.log(data);
    setCounting(false);
  };
  useEffect(() => {
    counting && handleIncrement();
  }, [counting]);
  const handleUpdateData = (data) => {};
  const calculateQty = (qty, min, action) => {
    if (action === 'add') {
      return qty + parseInt(min);
    } else {
      if (qty == parseInt(min)) {
        return parseInt(min);
      } else {
        return qty - parseInt(min);
      }
    }
  };
  const calculatePrice = (newprice, price, min, action) => {
    if (action === 'add') {
      return parseFloat(newprice) + parseFloat(price) * parseInt(min);
    } else {
      if (parseFloat(newprice) == parseFloat(price)) {
        return parseFloat(price);
      } else {
        return parseFloat(newprice) - parseFloat(price) * parseInt(min);
      }
    }
  };
  return (
    <ScrollView style={styles.mainContainer}>
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
            <Badge
              value={userCart?.length}
              status="success"
              containerStyle={{
                position: 'absolute',
                right: -4,
                top: 3,
              }}
            />
          </TouchableOpacity>
        }
      />

      <View style={{flex: 0.5, backgroundColor: 'white', elevation: 10}}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.charity}
          onPress={() => {
            sheet.current.open();
          }}>
          <Image
            style={{height: 35, width: 45, margin: 8, tintColor: '#00C4CC'}}
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
          </Text>
          <View style={{position: 'absolute', right: 20, bottom: 3}}>
            <Text
              style={[
                {
                  fontSize: 13,

                  color: '#00C4CC',
                  // margin: 15,
                  // padding: 10,
                  fontWeight: 'bold',
                },
              ]}>
              {'  '}
              {charityname ? charityname.catname : 'Change My Charity'}
            </Text>
          </View>
        </TouchableOpacity>
        <Image
          // resizeMode={'contain'}
          style={{height: 200, width: '100%', alignSelf: 'center'}}
          source={{uri: data?.detail_img}}
        />
      </View>
      <View
        style={{
          flex: 0.5,
          backgroundColor: 'white',
          elevation: 10,
          padding: 4,
        }}>
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}> */}
        {/* <Text
            style={[
              styles.medium,
              {
                textAlign: 'center',
                color: 'black',
                backgroundColor: 'red',
                fontSize: 13,
                marginTop: 5,
              },
            ]}>
            0%
          </Text> */}
        <TouchableOpacity activeOpacity={1} style={styles.progress}>
          {filled()}
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={[
              styles.medium,
              {
                textAlign: 'center',
                color: 'black',
                // backgroundColor: 'red',
                fontSize: 13,
                marginTop: 5,
              },
            ]}>
            0%
          </Text>

          <Text
            style={[
              styles.medium,
              {
                textAlign: 'center',
                color: 'black',

                fontSize: 13,
                marginTop: 5,
              },
            ]}>
            100%
          </Text>
        </View>
        <Text
          style={[
            styles.medium,
            {
              color: 'black',

              fontSize: 22,

              fontWeight: 'bold',
              // margin: 15,
              marginTop: 15,
              marginLeft: 15,
            },
          ]}>
          {data?.title}
        </Text>
        <Text
          style={[
            styles.medium,
            {
              color: 'grey',

              fontSize: 13,
              marginLeft: 15,
              marginBottom: 10,
              marginTop: 5,
            },
          ]}>
          {data?.short_desc}
        </Text>
        <Text
          style={[
            styles.medium,
            {
              color: 'grey',

              fontSize: 13,
              marginLeft: 15,
              textAlign: 'justify',
              width: '90%',
            },
          ]}>
          {data?.long_desc}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',

            margin: 10,
            width: '80%',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View>
            <Image source={clock} style={{alignSelf: 'center', opacity: 0.5}} />
            <Text
              style={[
                styles.medium,
                {
                  color: 'black',

                  alignSelf: 'center',
                },
              ]}>
              1 days
            </Text>
          </View>

          <Divider style={{height: 40, width: 1}} />
          <View>
            <Image
              source={ticket}
              style={{alignSelf: 'center', opacity: 0.5}}
            />
            <Text
              style={[
                styles.medium,
                {
                  color: 'black',

                  alignSelf: 'center',
                },
              ]}>
              {/* {data?.minimum_entry} */}£ 60 Cost Per Entry
            </Text>
          </View>
          <Divider style={{height: 40, width: 1}} />
          <View>
            <Image source={award} style={{alignSelf: 'center', opacity: 0.5}} />
            <Text
              style={[
                styles.medium,
                {
                  color: 'black',

                  alignSelf: 'center',
                },
              ]}>
              Guaranteed Winner
            </Text>
          </View>
        </View>

        <View style={styles.counter}>
          <TouchableOpacity
            style={styles.circularButton}
            onPress={() => {
              setInCart(false);
              setAction('add');
              setCounting(true);
            }}>
            <Entypo name="plus" size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text
            style={[
              styles.medium,
              {
                textAlign: 'center',
                color: 'black',
                alignItems: 'center',
                fontSize: 16,
                fontWeight: 'bold',
              },
            ]}>
            {data?.qty}
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleAddToCart();
            }}
            style={styles.circularButton}
            onPress={() => {
              setInCart(false);

              qty > 1 && setQty(qty - 1);
            }}>
            <Entypo name="minus" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Loading visible={loading} />
        <TouchableOpacity
          style={[styles.horizontal]}
          disabled={inCart}
          onPress={() => {
            if (Platform.OS === 'ios') {
              Linking.openURL('https://winnerswish.com/sign-in/').catch((err) =>
                console.error('An error occurred', err),
              );
            } else {
              const res = userCart?.some((it) => {
                return it.ID == data.ID;
              });
              if (res) {
                handleDelete(data, color);
              } else {
                handleAddToCart(data, color);
              }
            }
          }}>
          <Text
            style={[
              styles.medium,
              {
                textAlign: 'center',
                color: colors.white,
                alignItems: 'center',
                fontSize: 16,
                fontWeight: 'bold',
              },
            ]}>
            {inCart ? 'Added' : 'Add TO Cart'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (Platform.OS === 'ios') {
              Linking.openURL('https://winnerswish.com/sign-in/').catch((err) =>
                console.error('An error occurred', err),
              );
            } else {
              if (isLoggedIn) {
                navigation.navigate('Instant', {
                  item: data,
                  color: color,
                  from: 'instantBuy',
                });
              } else {
                Alert.alert('Winner Wish', 'Kindly login first');
                navigation.navigate('Login');
              }
            }
          }}
          style={[styles.horizontal1, {backgroundColor: colors.orange}]}>
          <Text
            style={[
              styles.medium,
              {
                textAlign: 'center',
                color: colors.white,
                alignItems: 'center',
                fontSize: 16,
                fontWeight: 'bold',
              },
            ]}>
            Buy
          </Text>
        </TouchableOpacity>
      </View>

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
    </ScrollView>
  );
};
const mapStateToProps = (state) => {
  const {userCart, totalPrice} = state.cart;
  const {isLoggedIn} = state.auth;
  const {charityList} = state.competitionuser;

  return {userCart, totalPrice, isLoggedIn, charityList};
};
export default connect(mapStateToProps, {compDetail, addToCart, saveCharity})(
  ProductDetail,
);
