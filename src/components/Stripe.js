import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CreditCardInput} from 'react-native-credit-card-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {useFocusEffect, CommonActions} from '@react-navigation/native';

import stripe from 'tipsi-stripe';
import {Loading} from '../components/Loading';
import {
  addToCart,
  updateTotalPrice,
  placeorder,
  updateStatus,
} from '../Redux/Action/cart';
import {purchasePkg} from '../Redux/Action/Competitionaction';
import {Fonts} from '../utils/Fonts';
import {Keyboard} from 'react-native';
stripe.setOptions({
  publishableKey:
    'pk_test_51H4QdgGmT7c3r5SQV7rLpB2t9BbdIq7yLOxvtielUJC6WrODrynbulG8nrGJ0rBF3XVGhL5LSK5XjJ9yQcixXgiw00edN1Sxa4',
});
const Stripe = ({
  navigation,
  user,
  userCart,
  totalPrice,
  route,
  placeorder,
  updateStatus,
  charityId,
  purchasePkg,
}) => {
  const [creditInfo, setCredit] = useState(null);
  const [loading, setLoader] = useState(false);
  console.log('route', route);
  const handlePurchase = () => {
    Keyboard.dismiss();
    if (!creditInfo) {
      alert('Kindly Enter credit card values');
    } else if (creditInfo && creditInfo.values.number === '') {
      Alert.alert('Roraa', 'Kindly enter credit card no');
    } else if (creditInfo && creditInfo.values.expiry === '') {
      Alert.alert('Roraa', 'Kindly enter credit card expiry');
    } else if (creditInfo && creditInfo.values.cvc === '') {
      Alert.alert('Roraa', 'Kindly enter credit card cvc');
    } else {
      handleCardPayPress();
    }
  };
  // const handleTest = () => {
  //   var stripe_url = 'https://api.stripe.com/v1/';
  //   var secret_key =
  //     'sk_test_51HJdsCLvMN9bDgprLUfV9Af419seG8VuXmhgY1dwAROMSYaMwlzbryBpFyszlyFnGOFNHeczdSTv7Up0fDo5xf3w00mZ8G6WTL';
  //   var cardDetails = {
  //     'card[number]': creditInfo.values.number,
  //     'card[exp_month]': creditInfo.values.expiry.split('/')[0],
  //     'card[exp_year]': creditInfo.values.expiry.split('/')[1],
  //     'card[cvc]': creditInfo.values.cvc,
  //   };

  //   var formBody = [];
  //   for (var property in cardDetails) {
  //     var encodedKey = encodeURIComponent(property);
  //     var encodedValue = encodeURIComponent(cardDetails[property]);
  //     formBody.push(encodedKey + '=' + encodedValue);
  //   }
  //   formBody = formBody.join('&');

  //   return fetch(
  //     stripe_url +
  //       'pk_test_51HJdsCLvMN9bDgprwaGqo8qeOSCVZvvXti1RvWgT4mgnx8fWzmY5U8r2S1JUoIliTa2aKr2eWO9J3ZLhZVHfq9U600dqkVN4fK',
  //     {
  //       method: 'post',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         Authorization: 'Bearer ' + secret_key,
  //       },
  //       body: formBody,
  //     },
  //   );
  // };
  const handleCardPayPress = async () => {
    try {
      const from = route?.params?.from;
      const price = route?.params?.price;
      const apiParams = route?.params?.apiParams;
      const pkg = route?.params?.pkg;
      const res = creditInfo.values.expiry.split('/');
      const token = await stripe.createTokenWithCard({
        number: creditInfo.values.number,
        expMonth: parseInt(res[0]),
        expYear: parseInt(res[1]),
        cvc: creditInfo.values.cvc,
      });
      if (from === 'topup') {
        setLoader(true);
        const formData = new FormData();

        formData.append('currency', 'GBP');
        formData.append('amount', parseFloat(price));
        formData.append('payment_status', '');
        formData.append('payment_method', 'cards');

        formData.append('token', token?.tokenId);
        console.log(formData);
        const ress = await updateStatus(formData, user?.auth);
        if (ress.data.status) {
          Alert.alert('Winner Wish', ress.data.message, [
            {
              text: 'OK',
              onPress: () =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Root'}],
                  }),
                ),
            },
          ]);

          // navigation.navigate('Dashboard');
          setCredit(null);
        } else {
          Alert.alert('Winner Wish', ress.data.message, [
            {
              text: 'OK',
              onPress: () =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Root'}],
                  }),
                ),
            },
          ]);
        }
        setLoader(false);
      } else if (from === 'instant') {
        setLoader(true);
        const formData = new FormData();
        formData.append('token', token?.tokenId);
        formData.append('order_total', apiParams?.price);
        formData.append('order_sub_total', apiParams?.price);
        formData.append('payment_method', 'cards');
        formData.append('charityid', apiParams?.charityid);

        formData.append('lottries', apiParams?.lottries);
        formData.append(
          'order_detail',
          JSON.stringify([
            {lottery_id: apiParams?.lottries, quantity: apiParams?.quantity},
          ]),
        );

        console.log(formData);

        const res = await placeorder(formData, user?.auth);
        if (res.data.status) {
          alert(res.data.message);
          setLoader(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Dashboard'}],
            }),
          );
        } else {
          alert(res.data.message);
          setLoader(false);
        }
      } else if (from === 'subscription') {
        setLoader(true);

        const formData = new FormData();

        formData.append('paidAmount', pkg?.package_price);
        formData.append('payment_method', 'cards');
        formData.append('token', token?.tokenId);

        formData.append('package_id', pkg?.package_id);
        console.log(formData);
        const res = await purchasePkg(formData, user?.auth);
        if (res) {
          setLoader(false);
          Alert.alert('Winner Wish', res.data.message, [
            {
              text: 'OK',
              onPress: () =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Root'}],
                  }),
                ),
            },
          ]);
          // this.props.navigation.navigate('Root');
        }
      } else {
        setLoader(true);

        console.log(token);
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
        formData.append('payment_method', 'cards');
        formData.append('lottries', lottries.toString());
        formData.append('order_detail', JSON.stringify(lott));
        formData.append('token', token?.tokenId);
        formData.append('charityid', charityId);

        const res = await placeorder(formData, user?.auth);
        if (res.data.status) {
          alert(res.data.message);
          setLoader(false);
          navigation.navigate('Dashboard');
        } else {
          alert(res.data.message);
          setLoader(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      // alert(error.message);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.cardBottom}>
        <Text style={[styles.medium, {color: 'white'}]}>
          Proceed to checkout
        </Text>
        <CreditCardInput
          value={creditInfo}
          onChange={(change) => setCredit(change)}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          handlePurchase();
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
        <Text style={[styles.medium, {color: 'white'}]}>Pay & Checkout</Text>
      </TouchableOpacity>
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {userCart, totalPrice} = state.cart;
  const {user, charityId} = state.auth;
  return {userCart, totalPrice, user, charityId};
};
export default connect(mapStateToProps, {
  addToCart,
  updateTotalPrice,
  placeorder,
  updateStatus,
  purchasePkg,
})(Stripe);

const styles = StyleSheet.create({
  priceCard: {
    flex: 1,

    marginRight: 15,
  },
  cardHeader: {
    height: '25%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  cardBody: {
    height: '55%',
  },
  headerMain: {
    color: 'white',
    fontSize: 17,
    fontFamily: Fonts.PoppinsMedium,
  },
  headerSubtite: {
    fontSize: 15,
    color: 'white',
    fontFamily: Fonts.PoppinsRegular,
  },
  cardBottom: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  butnStyle: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 100,
  },
  butnText: {
    color: 'white',
    fontSize: 14,
    fontFamily: Fonts.PoppinsRegular,
  },
  bg_basic: {
    backgroundColor: '#a719c3',
  },
  bg_standard: {
    backgroundColor: '#ff7794',
  },
  bg_premium: {
    backgroundColor: '#e23d7c',
  },
  border_basic: {
    borderColor: '#a719c3',
  },
  border_standard: {
    borderColor: '#ff7794',
  },
  border_premium: {
    borderColor: '#e23d7c',
  },
  circle: {
    width: 7,
    height: 7,
    borderRadius: 50,
    borderWidth: 2,
  },
  button: {
    backgroundColor: 'white',

    elevation: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 15,
    color: 'grey',
    fontFamily: Fonts.PoppinsMedium,
  },
  medium: {fontFamily: Fonts.PoppinsMedium, fontSize: 14},
});
