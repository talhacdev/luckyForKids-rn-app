import React, {useState, useRef, useEffect} from 'react';
import {ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  Dimensions,
} from 'react-native';
import Picker from '../../../components/Picker';
import RBSheet from 'react-native-raw-bottom-sheet';
const {height, width} = Dimensions.get('window');
import {Header, Badge} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import {primary, logo, secondary} from '../../../assets';
import {Fonts} from '../../../utils/Fonts';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';

import Carousel from 'react-native-snap-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Picker from '../../../components/Picker';
import BottomSheet from '../../../components/BottomSheet';
import {
  charityCateg,
  getCharityFunds,
} from '../../../Redux/Action/Competitionaction';
import {connect} from 'react-redux';
import Foundation from 'react-native-vector-icons/Foundation';
import colors from '../../../theme/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
import {Loading} from '../../../components/Loading';
const Charity = ({
  params,
  navigation,
  charityCateg,
  charityList,
  userCart,
  getCharityFunds,
  charityFunds,
}) => {
  const crousalRef = useRef(null);
  const isFocused = useIsFocused();
  const [index, setIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const productList = [
    {
      id: 0,
      offer: 'WWF',
      description:
        'Raising funds in aid of WWF. WWF is the world’s leading independent conservation organisation. Our mission is to create a world where people and wildlife can thrive together. Our world is under threat like never before. We need a global deal for nature and people to reverse the decline. Help us build a movement of people calling for change – support our campaigns for a safe climate, clean oceans and forests filled with wildlife.',
      qty: 0,
      tickt: 1,
      image:
        'https://winnerswish.com/wp-content/uploads/2021/03/WWF_Supporter.png',
    },
    {
      id: 0,
      offer: 'WORLDWIDE CANCER RESEARCH',
      description:
        'Cancer research needs you more than ever. Because of the ongoing pandemic much of our fundraising has had to stop and our lifesaving research is at risk. But cancer carries on. In the UK, nearly 450 people die from cancer every single day. You can help start new cancer cures and stop suffering.',
      qty: 0,
      tickt: 1,
      image: 'https://winnerswish.com/wp-content/uploads/2021/03/wa.png',
    },
    {
      id: 0,
      offer: 'WOMEN’S AID',
      description:
        'Women’s Aid is the national charity working to end domestic abuse against women and children. Since 1974 we have been at the forefront of shaping and coordinating responses to domestic abuse, with survivors at the heart of our work. We are a federation of over 180 organisations which provide just under 300 local lifesaving services to women and children across the country.',
      qty: 0,
      tickt: 1,
      image:
        'https://winnerswish.com/wp-content/uploads/2021/03/sightsavers.png',
    },
    {
      id: 0,
      offer: 'SIGHTSAVERS',
      description:
        'Our vision is of a world where no one is blind from avoidable causes, and where people with disabilities participate equally in society.',
      qty: 0,
      tickt: 1,
      image:
        'https://winnerswish.com/wp-content/uploads/2021/03/sightsavers.png',
    },
    {
      id: 0,
      offer: 'PLASTIC OCEANS UK',
      description:
        'Please Plastic Oceans UK have been experts on plastic pollution for nearly a decade. This began with our award-winning documentary A Plastic Ocean, now available for streaming on Netflix. Now, we’re solving the plastic crisis through our science, sustainability and education programmes. Through changing attitudes, behaviours and practices on the use and value of plastics, we can stop plastic pollution reaching the oceans.',
      qty: 0,
      tickt: 1,
      image:
        'https://winnerswish.com/wp-content/uploads/2021/03/PlasticOceanLogo.png',
    },
    {
      id: 0,
      offer: 'OXFAM',
      description:
        'Oxfam is a global movement of millions of people who share the belief that, in a world rich in resources, poverty isnt inevitable. When an emergency hits, Oxfam is there. We save lives in disasters and stay to build back for the long term, so future generations can access clean flowing water. With our local partners, we develop opportunities for women to be financially independent and help farmers be resilient to the effects of climate change. We believe in equality and campaign for the rights of women and men everywhere,speaking out against injustices that keep people in poverty',
      qty: 0,
      tickt: 1,
      image: 'https://winnerswish.com/wp-content/uploads/2021/03/Oxfam.png',
    },
    {
      id: 0,
      offer: 'MENTAL HEALTH UK',
      description:
        'Please 1 in 4 people in the UK has experienced a mental health problem. Mental Health UK is the only UK-wide mental health charity supporting people affected by mental health problems including friends, family and carers. We bring together over 40 years of expertise from our four national founding charity partners to improve understanding and provide vital care.',
      qty: 0,
      tickt: 1,
      image: 'https://winnerswish.com/wp-content/uploads/2021/03/MHUK.jpg',
    },
    {
      id: 0,
      offer: 'HOSPICE UK',
      description:
        'At the end of a persons life, we only have one chance to get it right. Sadly, on average more than 335 people every day wont access the compassionate, expert care that hospices across the UK provide. Hospice care is so much more than a building where you go to die. Most hospice care happens at home and in the community. But for one in four families in the UK today, hospice care isnt an option. Its vital were there to support every family in need. Hospice UK is your national charity for hospice care and our mission is to ensure that everyone who needs hospice care,gets it.',
      qty: 0,
      tickt: 1,
      image: 'https://winnerswish.com/wp-content/uploads/2021/03/Hospice.png',
    },
    {
      id: 0,
      offer: 'GREAT ORMOND STREET HOSPITAL CHARITY',
      description:
        'Great Ormond Street Hospital Charity raises money to support some of the most seriously ill children in the UK who are treated at Great Ormond Street Hospital. The charity funds research into pioneering new treatments for children, provides the most up to date medical equipment, funds support services for children and their families and supports the essential rebuilding and refurbishment of the hospital. You can help us to provide world class care for our patients and families.',
      qty: 0,
      tickt: 1,
      image: 'https://winnerswish.com/wp-content/uploads/2021/03/GOSHLogo.png',
    },
    {
      id: 0,
      offer: 'BRADLEY LOWERY FOUNDATION',
      description:
        'The Bradley Lowery Foundation was established in August 2017 after six-year-old Bradley Lowery lost his fight to Stage 4 High Risk Neuroblastoma, a rare and aggressive form of childhood cancer. The Bradley Lowery Foundation aims to support families who are fundraising for treatment or equipment, which is not readily available or covered by the NHS. This includes all illnesses and conditions. The foundation also supports research into Neuroblastoma and childhood cancers, is developing plans to support a £600,000 holiday home in Scarborough and runs a support line for the families of children with cancer in the North East',
      qty: 0,
      tickt: 1,
      image:
        'https://winnerswish.com/wp-content/uploads/2021/03/BLF_Sq_Logo.jpg',
    },
  ];
  const sheet = useRef();
  useEffect(() => {
    const unsubscribe = getData();
    return () => {
      unsubscribe;
    };
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res1 = await getCharityFunds();

      const res = await charityCateg();
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };
  const renderPages = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <ImageBackground
          imageStyle={{borderRadius: 10}}
          style={styles.cardContainer}
          source={require('../../../assets/baloon.png')}>
          <View
            style={[
              styles.cardContainer,
              {
                alignSelf: 'center',
                width: 250,
                height: 320,
                justifyContent: 'flex-start',
                padding: 10,
              },
            ]}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                flex: 0.3,
              }}>
              <Image
                resizeMode="contain"
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                }}
                source={{uri: item.image}}
              />
              <Text
                style={[
                  {
                    color: 'black',

                    margin: 5,
                    //  fontWeight:'bold,'
                    color: colors.gray,
                    alignSelf: 'center',
                    fontSize: 12,
                    fontFamily: Fonts.PoppinsBold,
                  },
                ]}>
                {item.offer}
              </Text>
            </View>
            <Text
              style={[
                {
                  color: 'black',

                  flex: 1,
                  margin: 10,
                  // backgroundColor: 'red',
                  color: colors.gray,
                  alignSelf: 'center',
                  fontSize: 9,
                  fontFamily: Fonts.PoppinsRegular,
                },
              ]}>
              {item.description}
            </Text>

            {/* <View style={styles.horizontal}>
              <Text
                style={[
                  {
                    color: 'black',
                    textAlign: 'center',
                    fontFamily: Fonts.PoppinsMedium,
                    marginVertical: 5,
                    color: colors.primary,
                  },
                ]}></Text> */}
            {/* <Text
                style={[
                  {
                    color: '#fa8072',
                    textAlign: 'center',
                    fontFamily: Fonts.PoppinsMedium,
                    backgroundColor: 'green',
                    marginVertical: 5,
                  },
                ]}>
                2 hrs ago
              </Text> */}
            {/* </View> */}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

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
            source={require('../../../assets/logo.png')}></Image>
        }
        rightComponent={
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('Cart', {from: 'Charity'});
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
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            height: 120,
          }}>
          <Text style={{padding: 50}}>Total Raised for Charity</Text>

          <View
            style={{
              // marginTop: 10,
              height: 90,

              borderWidth: 4,
              backgroundColor: colors.secondary,
              width: 90,
              borderRadius: 50,
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',

              borderColor: '#fa8072',
              marginLeft: -19,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Foundation
              name="pound"
              size={20}
              style={{color: 'white'}}></Foundation>
            <Text style={{textAlign: 'center', color: 'white', marginLeft: 2}}>
              {charityFunds}
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            width: '80%',
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignSelf: 'center',
          }}></View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
            marginTop: 10,
          }}>
          <Text
            style={{
              justifyContent: 'center',
              color: 'grey',
              fontWeight: 'bold',
            }}>
            HOW WE HELP EACH OTHER DONATE:
          </Text>
          <View
            style={{
              justifyContent: 'center',
              width: '90%',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                marginTop: 5,
                color: 'grey',

                textAlign: 'center',
              }}>
              Here at winners wish charity is entwined with everything that we
              do. That is why we donate 5% of each competition entry sold to
              charity. And you decide where that money goes by selecting one of
              our charity partners in our members area, and change your cause
              any time you like. By going this, winners wish and our members
              work together to give back and support charitable organisations.
              Check out our charity page to see the organisations we support and
              the latest donation updates. Below are the charitable
              organisations that we work with.
            </Text>
          </View>
        </View>

        {/* <View
          style={{
            marginBottom: 20,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Picker
            title={!selectedValue ? 'Choose Category' : selectedValue?.catname}
            onPress={() => {
              sheet.current.open();
            }}
          />
        </View> */}

        <Carousel
          layout={'default'}
          ref={crousalRef}
          data={productList}
          sliderWidth={360}
          itemWidth={280}
          renderItem={renderPages}
          onSnapToItem={(index) => setIndex(productList[index])}
        />
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
                        setSelectedValue(item);
                        sheet.current.close();
                      }}>
                      {item.catname}
                    </Text>
                  </View>
                );
              })}
          </ScrollView>
        </RBSheet>
      </ScrollView>
      <Loading visible={loading} />
    </View>
  );
};
const mapStateToProps = (state) => {
  const {charityList, charityFunds} = state.competitionuser;
  const {userCart} = state.cart;
  return {charityList, userCart, charityFunds};
};
export default connect(mapStateToProps, {charityCateg, getCharityFunds})(
  Charity,
);
