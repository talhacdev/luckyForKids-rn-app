import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {Header, Badge} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import {primary, logo, secondary} from '../../../assets';
import colors from '../../../theme/colors';
import Picker from '../../../components/Picker';
import BottomSheet from '../../../components/BottomSheet';
import {connect} from 'react-redux';
import {getWinners} from '../../../Redux/Action/Competitionaction';
const window = Dimensions.get('window');
import {Fonts} from '../../../utils/Fonts';
import {Loading} from '../../../components/Loading';
import {Alert} from 'react-native';
const Winners = ({params, navigation, userCart, getWinners, winners}) => {
  const [qty, setQty] = useState(0);
  const [loading, setLoading] = useState(false);
  // const productList = useState([
  const productList = [
    {
      id: 0,
      offer: 'Win a Diamond',
      description: 'Please select a charity from member panel',
      qty: 0,
      tickt: 1,
      image:
        'https://assets.entrepreneur.com/content/3x2/2000/20160305000536-diamond.jpeg',
    },
    {
      id: 1,
      offer: 'Win a Diamond',
      description: 'Please select a charity from member panel',
      qty: 0,
      tickt: 1,
      image:
        'https://assets.entrepreneur.com/content/3x2/2000/20160305000536-diamond.jpeg',
    },
    {
      id: 2,
      offer: 'Win a Diamond',
      description: 'Please select a charity from member panel',
      qty: 0,
      tickt: 1,
      image:
        'https://assets.entrepreneur.com/content/3x2/2000/20160305000536-diamond.jpeg',
    },
    {
      id: 3,
      offer: 'Win a Diamond',
      description: 'Please select a charity from member panel',
      qty: 0,
      tickt: 1,
      image:
        'https://assets.entrepreneur.com/content/3x2/2000/20160305000536-diamond.jpeg',
    },
  ];
  const sheet = useRef();
  const renderPages = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        style={styles.cardContainer}>
        <Text
          style={[
            styles.mediumText,
            {
              color: 'black',
              textAlign: 'center',
              fontFamily: Fonts.PoppinsMedium,
              marginBottom: 10,
              fontWeight: 'bold',
            },
          ]}>
          {item.winner_id}
        </Text>

        <Image
          style={{height: 150, width: 150, borderRadius: 4}}
          // source={{
          //   uri:
          //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBnIgMHY6ftRGopd4wKui7lMMAIYArLJ0kYw&usqp=CAU',
          // }}
          source={{uri: item.winner_img}}
        />
        <Text
          style={[
            styles.mediumText,
            {
              color: 'black',
              textAlign: 'center',
              fontFamily: Fonts.PoppinsMedium,

              marginVertical: 5,
              color: colors.primary,
            },
          ]}>
          {item.winner_name}
        </Text>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetail')}
          style={{
            padding: 5,
            backgroundColor: colors.secondary,
            borderRadius: 100,
            width: '100%',
            marginVertical: 5,
          }}>
          <Text
            style={[
              {
                color: 'black',
                textAlign: 'center',
                fontFamily: Fonts.PoppinsMedium,

                color: colors.white,
                marginHorizontal: 10,
                fontSize: 11,
                marginVertical: 4,
              },
            ]}>
            View Competition
          </Text>
        </TouchableOpacity> */}
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    const unsub = getWins();
  }, [navigation]);
  const getWins = async () => {
    setLoading(true);
    const res = await getWinners();
    if (!res.data.status) {
      Alert.alert('Winerwish', res.data.message);
    }
    setLoading(false);
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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <Image source={require('../../../assets/trophy1.png')}></Image>
        <Text style={styles.colorwi}>Winner's</Text>
      </View>
      <FlatList
        data={winners}
        renderItem={renderPages}
        keyExtractor={(item, index) => item + index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
      <Loading visible={loading} />
    </View>
  );
};

const mapStateToProps = (state) => {
  const {userCart} = state.cart;
  const {winners} = state.competitionuser;
  return {userCart, winners};
};
export default connect(mapStateToProps, {getWinners})(Winners);
