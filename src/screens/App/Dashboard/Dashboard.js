import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackgroundBase,
  Dimensions,
} from 'react-native';
import {Text, View, ImageBackground} from 'react-native';
import styles from './styles';
import {Fonts} from '../../../utils/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import {Header, Badge} from 'react-native-elements';
import {primary, logo, secondary} from '../../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {charityCateg} from '../../../Redux/Action/Competitionaction';
import {loginaction} from '../../../Redux/Action/Loginaction';
import {connect} from 'react-redux';
import {getUserBalance} from '../../../Redux/Action/Competitionaction';
const {height, width} = Dimensions.get('window');
const Dashboard = ({
  params,
  navigation,
  charityCateg,
  userCart,
  user,
  getUserBalance,
  isLoggedIn,
}) => {
  const [data, setData] = useState([
    {
      id: 0,
      name: 'My Tickets',
      color: colors.primary,
      onPress: 'Tickets',
      src: require('../../../assets/ticket.png'),
    },
    {
      id: 1,
      name: 'Charity',
      color: colors.secondary,
      onPress: 'Charity',
      src: require('../../../assets/charity.png'),
    },
    // {
    //   id: 2,
    //   name: 'Topup',
    //   color: colors.ternary,
    //   onPress: 'Topup',
    //   src: require('../../../assets/topup.png'),
    // },
    {
      id: 3,
      name: 'Account Detail',
      color: '#2A9DF4',
      onPress: 'Settings',
      src: require('../../../assets/setting.png'),
    },
  ]);
  useEffect(() => {
    const unsub = getData();
    return () => unsub;
  }, [navigation]);
  const getData = async () => {
    try {
      isLoggedIn && (await getUserBalance(user?.auth));
    } catch (err) {
      console.log(err);
    }
  };
  const renderPages = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.onPress);
        }}
        key={index}
        activeOpacity={0.9}
        style={[
          styles.cardContainer,
          {
            backgroundColor: item.color,
            minWidth: (width - 18) / 3,
            maxWidth: (width - 30) / 2,
          },
        ]}>
        <View
          style={{
            height: 70,
            width: 70,
            borderRadius: 35,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            // {/* <Ionicons name="cart-outline" color="white" size={40} /> */}
            source={item.src}
          />
        </View>

        <Text style={[styles.large, {marginBottom: 10, color: 'white'}]}>
          {item.name}
        </Text>
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
              navigation.openDrawer();
            }}
          />
        }
        centerComponent={
          <Text style={[styles.medium, {color: 'white', marginTop: 10}]}>
            Dashboard
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
      <Text
        style={[
          styles.large,
          {color: colors.black, alignSelf: 'center', marginVertical: 20},
        ]}>
        Welcome
        <Text
          style={[
            styles.large,
            {
              color: colors.primary,
              alignSelf: 'center',
              marginVertical: 20,
              fontWeight: 'bold',
            },
          ]}>
          {''} {user.display_name}
        </Text>
      </Text>
      <FlatList
        data={data}
        renderItem={renderPages}
        keyExtractor={(item, index) => item + index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />

      <Text style={[styles.large, {color: 'grey', alignSelf: 'center'}]}>
        want to withdraw your remaining funds?
      </Text>
      <Text
        onPress={() => navigation.navigate('Withdraw')}
        style={[
          styles.large,
          {color: colors.primary, alignSelf: 'center', marginBottom: 30},
        ]}>
        withdraw
      </Text>
    </View>
  );
};
const mapStateToProps = (state) => {
  const {charityList} = state.competitionuser;
  const {userCart} = state.cart;
  const {user, isLoggedIn} = state.auth;

  return {charityList, userCart, user, isLoggedIn};
};
export default connect(mapStateToProps, {
  charityCateg,
  loginaction,
  getUserBalance,
})(Dashboard);
