import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Picker,
  Platform,
  Linking,
  BackHandler,
} from 'react-native';
import styles from './styles';
import {Header, Badge} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import {Actions} from 'react-native-router-flux';

import {
  primary,
  logo,
  person,
  secondary,
  ternary,
  forth,
} from '../../../assets';
import colors from '../../../theme/colors';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {Fonts} from '../../../utils/Fonts';
import {
  useFocusEffect,
  CommonActions,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import {Loading} from '../../../components/Loading';
import {
  competition,
  updateComp,
  charityCateg,
  getCateg,
} from '../../../Redux/Action/Competitionaction';
import {addToCart} from '../../../Redux/Action/cart';
import {saveCharity} from '../../../Redux/Action/Loginaction';
import {Alert} from 'react-native';
import {compose} from 'redux';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Product = ({
  params,
  competition,
  comp,
  charityList,
  isLoggedIn,
  updateComp,
  addToCart,
  userCart,
  totalPrice,
  charityCateg,
  charityId,
  saveCharity,
  getCateg,
  allCateg,
}) => {
  let navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(0);

  const [choosenCharity, setChoosenCharity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [singleItem, setSingleItem] = useState(null);
  const [color, setColor] = useState('');
  const [itemID, setItemID] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const productList = [primary, secondary, ternary, forth];
  const [update, setUpdate] = useState(false);
  const [cartUpdate, setCartUpdate] = useState(false);
  const isFocused = useIsFocused();
  const [deleted, setDeleted] = useState(false);
  const [from, setFrom] = useState('');
  const colorList = [
    colors.primary,
    colors.secondary,
    colors.forth,
    colors.ternary,
  ];
  useFocusEffect(
    React.useCallback(() => {
      const unsub = Check();
      return () => unsub;
    }, [update, isFocused]),
  );
  useEffect(() => {
    const unsub = getData();
    return () => unsub;
  }, []);
  const getData = async () => {
    try {
      setLoading(true);
      await getCateg();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsub = handleup();

      return () => {
        unsub;
      };
    }, []),
  );
  const handleup = () => {
    setSelectedValue(0);
    setUpdate(!update);
  };

  const Check = async () => {
    try {
      const resp = await AsyncStorage.getItem('selected');
      let value;
      if (resp) {
        setSelectedValue(JSON.parse(resp));
        value = JSON.parse(resp);
      } else if (selectedValue) {
        value = selectedValue;
      } else {
        value = 0;
      }
      console.log(selectedValue, value, resp);

      await competition(value, userCart);
      await AsyncStorage.setItem('selected', '');
    } catch (err) {
      console.log(err);
    }
  };

  const handleIncrement = async (id, action) => {
    const res =
      comp &&
      comp.map((item) => {
        if (parseInt(id) === parseInt(item.ID)) {
          return {
            ...item,
            isCart: false,
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
    await updateComp(res);
  };
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
  const handleAddToCart = async (item, color, from) => {
    try {
      if (isLoggedIn) {
        await addToCart(
          [...userCart, {...item, color}],
          totalPrice + item.totalPrice,
        );
        Alert.alert('Winner Wish', 'Added to Cart Successfully', [
          {
            text: 'OK',
            onPress: async () => {
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
    console.log(item);
    console.log(userCart);
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
    deleted &&
      Alert.alert('Winner Wish', 'Cart Updated', [
        {text: 'OK', onPress: () => setCartUpdate(true)},
      ]);
    setDeleted(false);
  };

  // BackHandler.addEventListener('hardwareBackPress', function () {
  //   BackHandler.exitApp();
  // });

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
      backHandler.remove();
    };
  }, []);

  // BackHandler.addEventListener('hardwareBackPress', function () {
  //   Alert.alert(
  //     'Thoát Khỏi Ứng Dụng',
  //     'Bạn có muốn thoát không?',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //         onPress: () => BackHandler.exitApp(),
  //       },
  //     ],
  //     {
  //       cancelable: false,
  //     },
  //   );
  //   return true;
  // });

  const renderItem = ({item, index}) => {
    console.log('DEBUG renderItem item: ', item);
    console.log('DEBUG renderItem index: ', index);
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          flex: 1,
          margin: 25,
          justifyContent: 'space-between',
          // height: window.height/2 ,
          backgroundColor: '#ed247c',
          elevation: 10,
          shadowColor: '#BDBDBD',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 5,
          shadowOpacity: 1.0,
          // borderWidth: 1,
          borderColor: '#ddd',
          padding: 10,
          borderRadius: 3,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor:
            index == 0 ||
            index == 4 ||
            index == 8 ||
            index == 12 ||
            index == 16 ||
            index == 20 ||
            index == 24
              ? '#ec247c'
              : index == 1 ||
                index == 5 ||
                index == 9 ||
                index == 13 ||
                index == 17 ||
                index == 21 ||
                index == 25
              ? '#00c4cc'
              : index == 2 ||
                index == 6 ||
                index == 10 ||
                index == 14 ||
                index == 18 ||
                index == 22 ||
                index == 26
              ? '#fe984e'
              : index == 3 ||
                index == 7 ||
                index == 11 ||
                index == 15 ||
                index == 19 ||
                index == 23 ||
                index == 27
              ? '#d2baa0'
              : null,
        }}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('ProductDetail', {
            id: item.ID,
            color: colorList[index % colorList.length],
          });
        }}>
        {/* <ImageBackground
          source={productList[index % productList.length]}
          style={{
            flex: 1,
            height: '100%',
            borderWidth: 1,
            borderColor: '#ddd',
            elevation: 10,
            shadowColor: '#BDBDBD',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowRadius: 5,
            shadowOpacity: 1.0,
            width: '100%',
            justifyContent: 'space-between',
          }}> */}
        {/* <Text
            style={[
              styles.medium1,
              {
                flex: 0.1,
                fontFamily: Fonts.PoppinsMedium,
                alignSelf: 'center',
                alignItems: 'center',
                alignContent: 'center',
                width: '80%',
                justifyContent: 'center',
                textAlign: 'center',
                marginTop: 5,
              },
            ]}>
            {item.title}
          </Text> */}

        <View
          style={{
            // flex: 0.7,
            justifyContent: 'space-between',
          }}>
          {/* <Text
              style={[
                styles.medium,
                {
                  textAlign: 'center',
                  color: 'white',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                },
              ]}>
              {item.short_description}
            </Text>
            <Text
              style={[
                styles.medium,
                {
                  marginTop: 5,
                  textAlign: 'center',
                  color: 'white',
                },
              ]}>
              Choose Qty
            </Text> */}
          <View
            style={{
              // flex:1,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 10,
              backgroundColor: 'white',
              width: width * 0.8,
              height: width * 0.8,
              marginTop: 3,
            }}>
            <Image
              // source={person}
              source={{uri: item.image}}
              overflow={'hidden'}
              style={{
                width: width * 0.8,
                height: width * 0.8,
              }}
            />
          </View>
          <View style={{}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}>
              {/* Win an iPhone */}
              {item.title}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {/* Win a Latest Apple iphone Pro Max */}
              {item.short_description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: 5,
              left: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
                right: 40,
              }}>
              Qty
            </Text>

            <TouchableOpacity
              style={styles.circularButton1}
              onPress={() => {
                handleIncrement(item.ID, 'minus');
              }}>
              <Entypo name="minus" size={20} color={colors.forth} />
            </TouchableOpacity>
            <Text
              style={[
                styles.medium,
                {
                  textAlign: 'center',
                  color: 'white',
                  alignItems: 'center',
                  fontSize: 14,
                  // marginLeft: 2,
                  padding: 15,
                },
              ]}>
              {item.qty}
            </Text>
            <TouchableOpacity
              style={styles.circularButton}
              onPress={() => {
                handleIncrement(item.ID, 'add');
              }}>
              <Entypo name="plus" size={20} color={colors.forth} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              // margin: 5,
              // justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              disabled={item.isCart}
              onPress={() => {
                if (Platform.OS == 'ios') {
                  Linking.openURL('https://winnerswish.com/sign-in/').catch(
                    (err) => console.error('An error occurred', err),
                  );
                } else {
                  const res = userCart?.some((it) => {
                    return it.ID == item.ID;
                  });
                  if (res) {
                    handleDelete(item, colorList[index % colorList.length]);
                  } else {
                    handleAddToCart(
                      item,
                      colorList[index % colorList.length],
                      'cart',
                    );
                  }
                }
              }}
              style={[styles.button]}>
              <Text
                style={[
                  styles.medium1,
                  {
                    textAlign: 'center',
                    color: '#ed247c',
                    fontSize: 12,
                  },
                ]}>
                {!item.isCart ? 'Add to Cart' : 'Added'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS == 'ios') {
                  Linking.openURL('https://winnerswish.com/sign-in/').catch(
                    (err) => console.error('An error occurred', err),
                  );
                } else {
                  if (isLoggedIn) {
                    navigation.navigate('Instant', {
                      item,
                      color: colorList[index % colorList.length],
                      from: 'instantBuy',
                    });
                  } else {
                    Alert.alert('Winner Wish', 'Kindly login first');
                    navigation.navigate('Login');
                  }
                }
              }}
              style={[styles.button]}>
              <Text
                style={[
                  styles.medium1,
                  {
                    textAlign: 'center',
                    color: '#ed247c',
                    fontSize: 12,
                  },
                ]}>
                Instant Buy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </ImageBackground> */}
        {/* <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            alignContent: 'center',
            borderWidth: 1,
            borderColor: '#ddd',
            elevation: 10,
            shadowColor: '#BDBDBD',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowRadius: 5,
            shadowOpacity: 1.0,
            flex: 1,
            height: '100%',
            marginLeft: 1,
            backgroundColor: colorList[index % colorList.length],
          }}>
          <Image
            source={{uri: item.image}}
            style={{
              height: height / 4,
              resizeMode: 'cover',
              width: width / 3,
              marginRight: 1,
              marginTop: 5,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity
            style={styles.ticket}
            onPress={() => {
              qty > 1 && setQty(qty - 1);
            }}>
            <Text
              style={[
                styles.medium1,
                {
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 8,
                },
              ]}>
              {`Ending \n Soon`}
            </Text>
          </TouchableOpacity>
        </View> */}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
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
              console.log('navigation', navigation);
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
        // centerComponent={
        //   // <Text style={[styles.large, {color: 'white', marginTop: 10}]}>
        //   //   Competition1
        //   // </Text>
        //   // <Image source={logo} style={{width: 60, height: 30, marginTop: 8}} />
        // }
        rightComponent={
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (isLoggedIn) {
                navigation.navigate('Cart', {from: 'Products'});
              } else {
                Alert.alert('Winner Wish', 'Kindly login');
                navigation.navigate('Login');
              }
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
          width: '100%',
        }}>
        {Platform.OS === 'ios' ? (
          <Picker
            selectedValue={selectedValue}
            style={{
              flex: 1,
              width: '100%',
              alignSelf: 'center',
            }}
            itemStyle={{height: 50, backgroundColor: 'white'}}
            prompt={'Select Category'}
            placeholder={'none'}
            onValueChange={async (value) => {
              setSelectedValue(value);
              await AsyncStorage.setItem('selected', JSON.stringify(value));
              Check();
            }}>
            {allCateg &&
              allCateg.map((item, index) => {
                switch (index) {
                  case index === '0':
                    return (
                      <Picker.Item
                        key={index}
                        label={item.cat_name}
                        value={item.id}
                      />
                    );
                  default:
                    return (
                      <Picker.Item
                        key={index}
                        label={item.cat_name}
                        value={item.id}
                      />
                    );
                }
              })}
          </Picker>
        ) : (
          <View
            style={{
              width: '99%',
              padding: 12,
              backgroundColor: 'white',
              borderRadius: 4,
            }}>
            <Picker
              selectedValue={selectedValue}
              style={{
                height: 25,
                color: colors.fontColor,
              }}
              prompt={'Select Charity'}
              placeholder={'none'}
              onValueChange={async (value) => {
                setSelectedValue(value);
                await AsyncStorage.setItem('selected', JSON.stringify(value));
                Check();
              }}>
              {allCateg &&
                allCateg.map((item, index) => {
                  switch (index) {
                    case index === '0':
                      return (
                        <Picker.Item
                          key={index}
                          label={item.cat_name}
                          value={item.id}
                        />
                      );
                    default:
                      return (
                        <Picker.Item
                          key={index}
                          label={item.cat_name}
                          value={item.id}
                        />
                      );
                  }
                })}
            </Picker>
          </View>
        )}
      </View>
      <FlatList
        extraData={comp}
        data={comp}
        keyExtractor={(item) => item}
        renderItem={renderItem}
      />
      {isModalVisible && renderModal()}
      <Loading visible={loading} />
    </View>
  );
};
const mapStateToProps = (state) => {
  const {comp, charityList, allCateg} = state.competitionuser;
  const {userCart, totalPrice} = state.cart;
  const {isLoggedIn, charityId} = state.auth;
  return {
    comp,
    charityList,
    isLoggedIn,
    userCart,
    totalPrice,
    charityId,
    allCateg,
  };
};
export default connect(mapStateToProps, {
  competition,
  updateComp,
  addToCart,
  charityCateg,
  saveCharity,
  getCateg,
})(Product);
