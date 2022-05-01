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

const Aboutus = ({params, navigation, userCart}) => {
  const htmlContent = `
  
<p>Here at Winners Wish our main objective is to offer all our members a chance to enter the greatest competitions. Where out members can win the latest gadgets, luxury cars, dream vacations, designer fashion and so much more.
<br>


</p>
<h3>
WINNERWISH:</h3>
<p>We even have a members group where we listen to your suggestions on the prizes we should offer next. (face book chat link)

<p>Our knowledge-based competitions are low cost and easy peesy to enter. For a few pounds you could be jetting away to Dubai, winning cash prizes or picking up keys to your brand new car.

<p>We Work Closely with high end luxury brands, fantastic tech suppliers & niche companies to bring all our members amazing prices.

<p>If you are looking for the chance win a gorgeous designer duffle bag, family trip, a brand spanking new SUV or the latest TV or your living room. We have prizes to suit all.
<br>

<h3>CHARITY:</h3>
<p>Here at winners wish charity is entwined with everything that we do.

<p>That is why we donate 5% of each competition entry sold to charity. And you decide where that money goes by selecting one of our charity partners in our members area.

<p>By going this, winners wish and our members work together to give back and support charitable organisations. Check out our charity page to see the organisations we support and the latest donation updates.


<h3>2. QUALIFYING PERSONS:</h3>
<p>2.1 The competition is open for entry to any person aged 18 or older; excluding staff employed by Winner Wish, their family, professional advisers or anyone else connected with the development or operation of the website or conducts administration of the competition in any way. 

<p>2.2 Winner Wish reserves the right to refuse an entrant’s entry or declare an entry null and void (with no refund being given) if the entrant is deemed to be abusing the services by: engaging in any form of fraud (actual or apparent); being abusive to other customers or staff; engages in fraudulent misrepresentation and/or concealment; hacking or otherwise interfering with the functioning of the website. </p>
</p>
<h3>PRIVACY & SECURITY</h3>

<p> We take privacy very seriously. Winners wish will never share or sell any personal information to third parties.

<p>Please read our privacy policy for more details on how we handle your privacy and security 

<p>When making a payment your payment is processed by “Merchant Services” and any money you hold in your winners wish account is held by “First Data” the worlds largest merchant bank.
<p>Our website uses secure and encrypted connections. Our payment provider is fully PCI & ICO compliant. Ensuring your data and information stays secure.
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
          ABOUT THE WINNERWISH
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
export default connect(mapStateToProps)(Aboutus);
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
