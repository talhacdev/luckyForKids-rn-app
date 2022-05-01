import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {Header, Badge} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import colors from '../../../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-elements';
import {connect} from 'react-redux';
import {getSubscriptions} from '../../../Redux/Action/Competitionaction';
// import HeaderLeftComponent from '../../components/HeaderLeftComponent';
// import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import {Loading} from '../../../components/Loading';
import styles from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';

import Carousel from 'react-native-snap-carousel';
const {height, width} = Dimensions.get('window');
import {WebView} from 'react-native-webview';
import Entypo from 'react-native-vector-icons/Entypo';

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      loading: true,
      paypal: false,
      stripe: true,
      pkg: null,
      carouselItems: [
        {
          Color: colors.primary,
          title: 'BASIC',
          price: '$40',
          duration: 'P E R  M O N T H',
          line1: '50 Pipes per week(minimum target)',
          line2: 'Signals with 90% of certain accuracy',
          line3: 'Careful analysis before any signals are sent',
          url: 'https://signalwish.com/checkout-1/?rid=p6Xc9C',
          icon: (
            <Ionicons
              name="md-checkmark-outline"
              size={20}
              style={{alignSelf: 'center', marginRight: 10}}
            />
          ),
        },
        {
          Color: colors.secondary,
          title: 'Standard',
          price: '$159',
          duration: 'P E R  M O N T H',
          line1: '150 pips per week (minimum target)',
          line2: 'Signals with 90% of certain accuracy',
          line3: 'Careful analyses before any signals are sent.',
          line4: 'Discuss with our experts',

          url: 'https://signalwish.com/checkout-1/?rid=pgKM09',

          icon: (
            <Ionicons
              name="md-checkmark-outline"
              size={20}
              style={{alignSelf: 'center', marginRight: 10}}
            />
          ),
        },
        {
          Color: colors.ternary,
          title: 'Premium',
          price: '$159',
          duration: 'P E R  M O N T H',
          line1: '30% profit share (broker controlled)',
          line2: 'Signals with 90% of certain accuracy',
          line3: 'Careful analyses before any signals are sent.',
          url: 'https://signalwish.com/checkout-1/?rid=pUDCp3',

          icon: (
            <Ionicons
              name="md-checkmark-outline"
              size={20}
              style={{alignSelf: 'center', marginRight: 10}}
            />
          ),
        },
      ],
    };
  }

  // handleStart = (url) => {
  //   try {
  //     Linking.canOpenURL(url).then((supported) => {
  //       if (supported) {
  //         Linking.openURL(url);
  //       } else {
  //         console.log('Not Supported');
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  componentDidMount = async () => {
    this.setState({loading: true});
    const res = await this.props.getSubscriptions();
    this.setState({loading: false});
    console.log(this.props.packages);
  };
  _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          // borderRadius: 5,
          height: height / 1.8,
          // padding: 100,
          marginLeft: 18,
          marginRight: 7,
          elevation: 3,
          marginBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#BDBDBD',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 5,
          shadowOpacity: 1.0,
          borderWidth: 0.4,
          borderColor: '#ddd',
          borderRadius: 20,
        }}>
        <View
          style={{
            height: 40,
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flex: 1,

            // backgroundColor: '#fa8072',
            backgroundColor: this.state.carouselItems[
              index & this.state.carouselItems.length
            ].Color,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <Text style={{fontSize: 30, color: 'white'}}>
            {item.package_name}
          </Text>
        </View>
        <Text style={{fontSize: 30}}>{'£' + item.package_price}</Text>
        <Text style={{fontSize: 16, marginVertical: 10, color: 'grey'}}>
          {item.package_content}
        </Text>
        <Divider
          style={{
            width: '25%',
            height: 1,
            marginBottom: 5,
            backgroundColor: 'black',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: '80%',
          }}>
          {item.feature1
            ? this.state.carouselItems[index & this.state.carouselItems.length]
                .icon
            : null}
          <Text style={{fontSize: 14, color: '#4C4C4C'}}>{item.feature1}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: '80%',
            marginVertical: 5,
          }}>
          {item.feature2
            ? this.state.carouselItems[index & this.state.carouselItems.length]
                .icon
            : null}
          <Text style={{fontSize: 14, color: '#4C4C4C'}}>{item.feature2}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: '80%',
            marginVertical: 5,
          }}>
          {item.feature3
            ? this.state.carouselItems[index & this.state.carouselItems.length]
                .icon
            : null}
          <Text style={{fontSize: 14, color: '#4C4C4C'}}>{item.feature3}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: '80%',
            marginVertical: 5,
          }}>
          {item.feature4
            ? this.state.carouselItems[index & this.state.carouselItems.length]
                .icon
            : null}
          <Text style={{fontSize: 14, color: '#4C4C4C'}}>{item.feature4}</Text>
        </View>
        <TouchableOpacity
          disabled={this.props.user.package == item.package_id}
          activeOpacity={0.7}
          style={[
            styles.buttonStyle,
            {
              backgroundColor: this.state.carouselItems[
                index & this.state.carouselItems.length
              ].Color,
            },
          ]}
          onPress={() => {
            this.setState({pkg: item}, () => {
              this.sheet.open();
            });

            // this.handleStart(item.url);
          }}>
          <Text style={{color: 'gray', fontSize: 16, color: 'white'}}>
            {this.props.user.package == item.package_id
              ? 'Purchased'
              : 'Get Started'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  ActivityIndicatorLoadingView = () => {
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.activityIndicatorStyle}
      />
    );
  };
  changeTab = (index) => {
    if (index === 1) {
      this.setState({
        paypal: true,
        stripe: false,
      });
    }
    if (index === 2) {
      this.setState({
        paypal: false,
        stripe: true,
      });
    }
    // if (index === 3) {
    //   setpaypal(false);
    //   setstripe(false);
    //   setbalance(true);
    // }
  };
  render() {
    const {paypal, stripe, pkg} = this.state;
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Header
          containerStyle={{paddingTop: 10}}
          // backgroundColor={'tomato'}
          backgroundColor={colors.primary}
          leftComponent={
            <AntDesign
              name="arrowleft"
              size={25}
              style={{marginTop: 8}}
              color="white"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={
            <Text style={[styles.medium, {color: 'white', marginTop: 10}]}>
              Subscriptions
            </Text>
          }
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
              <Badge
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
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            marginTop: 20,
          }}>
        
            <Text style={{color: 'grey'}}>
              You Currently have No Subscription.Please Choose one
            </Text>
          
          <Text style={{color: 'grey'}}>of below to avail unlimited perks</Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Carousel
            layout={'default'}
            ref={(ref) => (this.carousel = ref)}
            data={this.props.packages}
            sliderWidth={350}
            itemWidth={270}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({activeIndex: index})}
          />
        </View>
        <Loading visible={this.state.loading} />
        {/* <TouchableOpacity
          style={[styles.buttonStyle, {marginBottom: 10}]}
          activeOpacity={0.7}
          //   onPress={() => this.props.navigation.navigate('GenerateTrip')}
        >
          <Text
            style={[
              // styles.largeText,
              {textAlign: 'center', color: 'white'},
            ]}>
            Upgrage
          </Text>
        </TouchableOpacity> */}

        <RBSheet
          ref={(sheetRef) => (this.sheet = sheetRef)}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              marginTop: 20,
            },
          }}>
          <Text style={{margin: 20, fontSize: 20, color: colors.primary}}>
            Choose Payment Method
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
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
                  width: 70,
                  height: 70,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}
                source={require('../../../assets/paypal.png')}></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.changeTab(2);
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
          </View>
          <TouchableOpacity
            onPress={() => {
              if (this.props.isLoggedIn) {
                if (paypal) {
                  this.sheet.close();
                  this.props.navigation.navigate('Paypal', {
                    pkg: pkg,
                    price: pkg.package_price,
                    from: 'subscription',
                  });
                } else if (stripe) {
                  this.sheet.close();

                  this.props.navigation.navigate('Stripe', {
                    pkg: pkg,
                    from: 'subscription',
                  });
                }
                // else {
                //   handleOrder();
                // }
              } else {
                this.sheet.close();
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
                marginTop: 30,
              },
            ]}>
            <Text style={[styles.medium, {color: 'white'}]}>Proceed</Text>
          </TouchableOpacity>
        </RBSheet>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const {isLoggedIn, user} = state.auth;
  const {packages} = state.competitionuser;
  const {userCart} = state.cart;
  return {
    isLoggedIn,
    packages,
    userCart,
    user,
  };
};
export default connect(mapStateToProps, {getSubscriptions})(Subscription);
