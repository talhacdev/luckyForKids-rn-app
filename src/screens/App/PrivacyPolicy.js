import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import {Header, Badge} from 'react-native-elements';
import {StyleSheet, Dimensions, ScrollView} from 'react-native';

import colors from '../../../src/theme/colors';
import HTML from 'react-native-render-html';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
const window = Dimensions.get('window');
const SIZE = 30;
const ICON_WRAPPER_SIZE = 25;
import {connect} from 'react-redux';

import Fonts from '../../../src/utils/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';

const PrivacyPolicy = ({params, navigation, userCart}) => {
  const htmlContent = `
  
<p>Winner Wish for many years and even today are still subject to a lot of biases and misunderstandings and this is exactly why we were born.

<p>Our Mission is to lead the shift from traditional work structures towards full time Winner Wish culture.

<p>At Winner Wish, our community is made up of highly skilled, driven self-starters who want to network, increase their skillset and expose themselves to new opportunities. Whilst enjoying the flexibility and freedom that Winner Wish work offers!

<p>For our customers, now is the time to think about how you should structure your business and manage your costs. With the right preparation and by making changes so your employees & freelance staff can work from home and access the system, you will be set up to thrive in this brave new world that we are about to enter.

<h3>THIS IS WHERE WE COME IN!

`;

  return (
    <View style={{flex: 1}}>
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
            source={require('../../../src/assets/logo.png')}></Image>
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
      <ScrollView contentContainerStyle={{margin: 10}}>
        <Text
          style={[
            {
              color: 'black',

              margin: 15,

              color: colors.black,
              alignSelf: 'center',
              fontSize: 22,
              //   fontFamily: Fonts.PoppinsRegular,
            },
          ]}>
          PRIVACY POLICY
        </Text>
        {/* <View style={styles.horizontal}>
          <Text
            style={[
              {
                color: 'black',
                textAlign: 'center',
                fontFamily: Fonts.PoppinsMedium,
                marginVertical: 5,
                color: colors.gray,
              },
            ]}>
            Published from ohio
          </Text>
          <Text
            style={[
              {
                color: 'black',
                textAlign: 'center',

                color: colors.gray,
                fontFamily: Fonts.PoppinsMedium,
              },
            ]}>
            22 Mar,2020
          </Text>
        </View> */}
        {/* <Image
          style={styles.headerImg}
          source={require('../../../assets/person.png')}
        /> */}
        <HTML
          html={htmlContent}
          imagesMaxWidth={Dimensions.get('window').width}
          //   baseFontStyle={{fontFamily: Fonts.PoppinsRegular}}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  const {userCart} = state.cart;

  return {userCart};
};
export default connect(mapStateToProps)(PrivacyPolicy);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  logo: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  headerImg: {height: 200, width: '100%'},
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
