import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import qs from 'qs';
import {Loading} from '../components/Loading';
import {WebView} from 'react-native-webview';
import {Fonts} from '../utils/Fonts';
import {updateStatus, placeorder} from '../Redux/Action/cart';
import {purchasePkg} from '../Redux/Action/Competitionaction';
import {connect} from 'react-redux';
import {colors} from 'react-native-elements';
import {CommonActions} from '@react-navigation/native';

class Paypal extends Component {
  state = {
    accessToken: null,
    approvalUrl: null,
    paymentId: null,
    price: '',
    loading: false,
  };
  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const price = this.props.route.params.price;

      this.setState({price: price});
    });
  };
  componentWillUnmount = () => {
    this.focusListener.remove;
  };
  getAccessToken = () => {
    // this.setState({loading: true});
    var data = qs.stringify({
      grant_type: 'client_credentials',
    });
    var config = {
      method: 'post',
      url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic QVdUeHhuOTI1bnJvZTVoWW1pVUtualJzaEd3NE1EY3JrN0xYM0JGWUI5LWJobUFPbmlFd3Jidmh0aFA5MVZoMU9uY2M5Q01WbnVSbkkwSlI6RVBZN3E2QWRQYmZOU2FjTWhHV0hfTjV3WkNQNnNtaUx5bDhMRDI5cUs5ZXlBU1FrQ2hMZ1JoZmdNUnNjTzAzaTRQbl84QVZBcU0wZmNiMEo=',
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        const token = response.data.access_token;
        // console.log(JSON.stringify(token));
        this.setState(
          {
            accessToken: token,
          },
          () => {
            console.log('access token success');

            this.handleTransaction();
          },
        );
      })
      .catch((error) => {
        console.log('access token error');
        console.log(error);
      });
  };
  handleTransaction = () => {
    let currency = this.props.route?.params?.price;

    // Data which will go in WebView for Transaction
    const params = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            total: currency,
            currency: 'GBP',
            details: {
              subtotal: currency,
              tax: '0',
              shipping: '0',
              handling_fee: '0',
              shipping_discount: '0',
              insurance: '0',
            },
          },
        },
      ],
      redirect_urls: {
        return_url: 'https://example.com',
        cancel_url: 'https://example.com',
      },
    };

    // rest api call to get payment id & approval url
    axios
      .post('https://api.sandbox.paypal.com/v1/payments/payment', params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.state.accessToken}`,
        },
      })
      .then((response) => {
        const {id, links} = response.data;

        const approvalUrl = links.find((data) => data.rel == 'approval_url');
        console.log('id, links Success');
        // this.setState({loading: false});
        this.setState({
          paymentId: id,
          approvalUrl: approvalUrl.href,
        });
      })
      .catch((err) => {
        console.log('id, links error');
        console.log({err});
        alert(err);
        this.props.navigation.goBack();
      });
  };
  _onNavigationStateChange = async (webViewState) => {
    if (webViewState.url.includes('https://example.com/')) {
      this.setState({
        approvalUrl: null,
      });

      // const {PayerID, paymentId} = webViewState.url;
      const extractURL = webViewState.url;

      // getting paymentId & PayerID from string (form of link)
      const res = extractURL.split('=');
      const paymentId = res[1].slice(0, -6);
      const PayerID = res[3];

      axios
        .post(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
          {payer_id: PayerID},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.state.accessToken}`,
            },
          },
        )
        .then(async (response) => {
          console.log('done payment success');
          //   const key = response.gatewayResponse.data.state;
          const key = response?.data?.state;
          console.log(key);
          console.log(response);
          if (key === 'approved') {
            this.handleStatus(response);
          }
        })
        .catch((err) => {
          alert('Something went wrong');
          console.log('done payment error');
          console.log({...err});
        });
    }
  };
  handleStatus = async (response) => {
    try {
      const pkg = this.props.route.params.pkg;
      const from = this.props.route.params.from;
      const apiParams = this.props.route.params.apiParams;
      console.log(apiParams);
      if (from === 'topup') {
        const {user, updateStatus} = this.props;
        this.setState({loading: true});
        const formData = new FormData();
        formData.append(
          'trans_id',
          response?.data?.transactions[0]?.related_resources[0]?.sale?.id,
        );
        formData.append('currency', 'GBP');
        formData.append(
          'amount',
          response?.data?.transactions[0]?.amount?.total,
        );
        formData.append('payment_status', 'paid');
        formData.append('payment_method', 'paypal');

        const res = await updateStatus(formData, user?.auth);
        if (res.data.status) {
          Alert.alert('Winner Wish', res.data.message);
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Root'}],
            }),
          );
          // this.props.navigation.navigate('Dashboard');
        } else {
          Alert.alert('Winner Wish', res.data.message);
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Root'}],
            }),
          );
          // this.props.navigation.navigate('Dashboard');
        }
        this.setState({loading: false});
      } else if (from === 'instant') {
        const {placeorder, user, navigation} = this.props;
        this.setState({loading: true});
        const formData = new FormData();
        formData.append(
          'trans_id',
          response?.data?.transactions[0]?.related_resources[0]?.sale?.id,
        );
        formData.append('order_total', apiParams?.price);
        formData.append('order_sub_total', apiParams?.price);
        formData.append('payment_method', 'paypal');
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
          this.setState({loading: false});

          navigation.navigate('Root');
        } else {
          alert(res.data.message);
          this.setState({loading: false});
        }

        // this.props.navigation.navigate('Instant', {
        //   approved: 'true',
        //   response: response,
        // });
      } else if (from === 'subscription') {
        this.setState({loading: true});
        const {user, purchasePkg, navigation} = this.props;

        const formData = new FormData();
        formData.append(
          'transactionID',
          response?.data?.transactions[0]?.related_resources[0]?.sale?.id,
        );
        formData.append('paidCurrency', 'GBP');
        formData.append('paidAmount', pkg?.package_price);
        formData.append('payment_method', 'paypal');
        formData.append(
          'payment_status',
          response?.data?.state == 'approved' ? 'paid' : response?.data?.state,
        );
        formData.append('package_id', pkg?.package_id);
        console.log(formData);
        const res = await purchasePkg(formData, user?.auth);
        if (res) {
          alert(res.data.message);
          this.setState({loading: false});
          navigation.navigate('Dashboard');
        }
      } else {
        this.props.navigation.push('Cart', {approved: 'true', response});
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const {approvalUrl, price} = this.state;
    return (
      <SafeAreaView style={{flex: 1, marginTop: 20}}>
        <Loading visible={this.props.isLoading} />
        {approvalUrl ? (
          <WebView
            style={{height: 400, width: '100%'}}
            source={{uri: approvalUrl}}
            onNavigationStateChange={(webViewState) =>
              this._onNavigationStateChange(webViewState)
            }
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            renderLoading={() => <Loading visible />}
          />
        ) : (
          <View
            style={{
              flex: 1,

              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Image
              source={{
                uri:
                  'https://propakistani.pk/wp-content/uploads/2018/09/paypal-900x506.png',
              }}
              style={{height: 150, width: 150, alignSelf: 'center'}}
            />
            <View style={{flex: 0.6, justifyContent: 'center'}}>
              <View>
                <Text
                  style={[
                    {
                      fontFamily: Fonts.PoppinsMedium,
                      fontSize: 18,
                      marginBottom: 10,
                      alignSelf: 'center',
                    },
                  ]}>
                  {'Total Amount To Pay'}
                </Text>
                <Text
                  style={[
                    {
                      fontFamily: Fonts.PoppinsMedium,
                      fontSize: 25,
                      marginBottom: 10,
                      alignSelf: 'center',
                    },
                  ]}>
                  {'£' + this.props.route?.params?.price}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: colors.primary,
                  width: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  borderRadius: 4,
                  marginTop: 10,
                }}
                activeOpacity={0.9}
                onPress={() => this.getAccessToken()}>
                <Text style={{color: 'white'}}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Loading visible={this.state.loading} />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  const {user} = state.auth;
  return {user};
};
export default connect(mapStateToProps, {
  updateStatus,
  placeorder,
  purchasePkg,
})(Paypal);
