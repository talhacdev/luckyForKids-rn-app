import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {Header, Badge} from 'react-native-elements';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../../theme/colors';
import {Fonts} from '../../../utils/Fonts';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
class Topup extends Component {
  constructor(props) {
    super(props);
    this.state = {discount: '', stripe: true, paypal: false};
  }

  changeTab = (index) => {
    if (index === 1) {
      this.setState({
        paypal: true,
        stripe: false,
      });
    }
    if (index === 2) {
      this.setState({
        stripe: true,
        paypal: false,
      });
    }
  };
  render() {
    const {userCart} = this.props;
    const {stripe, paypal} = this.state;
    return (
      <View style={{flex: 1}}>
        <Header
          containerStyle={{paddingTop: 0}}
          backgroundColor={colors.primary}
          leftComponent={
            <Entypo
              name="menu"
              size={25}
              style={{marginTop: 8}}
              color="white"
              onPress={() => {
                this.props.navigation.openDrawer();
              }}
            />
          }
          // centerComponent={
          //   <Text style={[styles.medium, {color: 'white'}]}>Topup</Text>
          // }
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
          // rightComponent={
          //   <Entypo
          //     name="shopping-cart"
          //     size={20}
          //     style={{marginTop: 12}}
          //     color="white"
          //   />
          // }
          rightComponent={
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.props.navigation.navigate('Cart');
              }}>
              <Entypo
                name="shopping-cart"
                size={23}
                style={{marginTop: 12, marginRight: 10}}
                color="white"
              />
              {userCart.length > 0 && (
                <Badge
                  value={this.props.userCart && this.props.userCart.length}
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
        <ScrollView>
          <View style={styles.textstyle}>
            <Text
              style={
                styles.text
              }>{`Choose Payment Method \n                Method`}</Text>
          </View>
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
                  this.changeTab(1);
                }}
                style={{
                  borderRadius: 100,
                  borderWidth: paypal ? 3 : 0,
                  borderColor: paypal ? '#3992a8' : '',
                }}>
                <Image
                  style={{
                    width: 80,
                    height: 80,
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
                  textAlign: 'center',
                }}>
                Paypal
              </Text>
            </View>
            <View style={{}}>
              <TouchableOpacity
                onPress={() => {
                  this.changeTab(2);
                }}
                style={{
                  borderRadius: 100,
                  borderWidth: stripe ? 3 : 0,
                  borderColor: stripe ? '#3992a8' : '',
                }}>
                <Image
                  style={{
                    width: 80,
                    height: 80,
                  }}
                  source={require('../../../assets/write.png')}></Image>
              </TouchableOpacity>

              <Text
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                Credit card
              </Text>
            </View>
          </View>
          <View
            style={{
              // backgroundColor: 'black',

              justifyContent: 'center',
              alignContent: 'center',
              borderColor: colors.primary,
              margin: 50,
            }}>
            <TextInput
              placeholderTextColor="gray"
              keyboardType={'number-pad'}
              // editable={editable}
              // style={[styles.inputText, {color: editable ? 'black' : 'gray'}]}
              // value={name}
              style={styles.inputText}
              placeholder={'Top up Amount'}
              // onChangeText={(text) => console.log(text)}
              value={this.state.discount}
              onChangeText={(discount) => {
                const re = /^[0-9\b]+$/;
                if (discount === '' || re.test(discount))
                  this.setState({
                    discount,
                  });
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                !this.state.discount
                  ? Alert.alert('Winner Wish', 'Kindly enter Amount')
                  : this.props.navigation.navigate(
                      paypal ? 'Paypal' : 'Stripe',
                      paypal
                        ? {
                            price: this.state.discount,
                            from: 'topup',
                          }
                        : {from: 'topup', price: this.state.discount},
                    );
              }}
              style={{
                backgroundColor: colors.secondary,
                height: 40,
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                width: '80%',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  color: 'white',
                }}>
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const {userCart} = state.cart;
  return {userCart};
};
export default connect(mapStateToProps)(Topup);
