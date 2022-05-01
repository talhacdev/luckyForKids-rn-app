import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {primary, logo, secondary} from '../../../assets';
import {Header, Badge} from 'react-native-elements';
import {StyleSheet, Dimensions, ScrollView} from 'react-native';
import colors from '../../../theme/colors';
import HTML from 'react-native-render-html';
import Antdesign from 'react-native-vector-icons/AntDesign';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
const window = Dimensions.get('window');
const SIZE = 30;
const ICON_WRAPPER_SIZE = 25;
import {connect} from 'react-redux';
import {Fonts} from '../../../utils/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';

const CharityDetail = ({params, navigation, userCart}) => {
  const htmlContent = `
  
<p>Company Name:  Winner Wish
<br>
Email:               Info@winnerwish.com
<br>
Facebook:           Winner Wish
<br>
Instagram:          @Winner Wish
<br>
Website:              www.WinnerWish.com

</p>
<h3>
DEFINITIONS OF TERMS WITHIN THESE TERMS AND CONDITIONS:</h3>
<p>Promoter:       Us, Winner Wish
<br>
Entrant:           You, the customer
<br>
Competition:  This applies to all competitions advertised on the website
<br>
Winner:           The Entrant with the ticket number matching that drawn for each individual competition
<br>
Prize draw:    The live draw of each competition</p>
<h3>1. GENERAL:</h3>
<p>1.1   By entering any competition on the website, entrants are deemed to have read and accepted these terms and conditions and agree to be bound by them.

<p>1.2  When entering the competition, all entrants must submit contact details as requested by the promoter. This includes but is not limited to; e-mail address and phone number. These will be used for the following purposes;

– To notify the winner that they have won.

– To post the Winners name on the website and social media platforms.

– To comply with the privacy policy.

<p>1.3  All entrants are solely responsible for providing the promoter with accurate contact details and maintaining these should they change at any time. 

<p>1.4 The promoter is in no way liable for any failure or inability to make contact with any entrant due to errors or inaccuracies in the contact details that the entrant has provided. </p>
<h3>2. QUALIFYING PERSONS:</h3>
<p>2.1 The competition is open for entry to any person aged 18 or older; excluding staff employed by Winner Wish, their family, professional advisers or anyone else connected with the development or operation of the website or conducts administration of the competition in any way. 

<p>2.2 Winner Wish reserves the right to refuse an entrant’s entry or declare an entry null and void (with no refund being given) if the entrant is deemed to be abusing the services by: engaging in any form of fraud (actual or apparent); being abusive to other customers or staff; engages in fraudulent misrepresentation and/or concealment; hacking or otherwise interfering with the functioning of the website. </p>
</p>
<h3>3. COMPETITION ENTRY</h3>

<p>3.1 All competitions on the website are operated by the promoter.

<p>3.2 All competition entries will be based on answering a question. In answering the question, the entrant recognises that they must exercise skill, knowledge and judgement to give the correct answers.  

<p>3.3 The Promoter may run multiple competitions that will be operated at the same time and each competition will have a specific prize. Each competition will require the entrant to exercise skill, knowledge, and judgement, to correctly answer a question. 

<p>3.4 All entrants acknowledge that their payment for entry to the competition, does not guarantee that they will win the prize in any way. 

<p>3.5 Only completed entries which include the correct answer as held by the promoter, will be entered into the competition. If the entrant does not answer the question correctly, this will still result in the entrant being charged.

<p>3.6 Maximum number of entries/tickets per entrant will vary depending on each individual competition, details can be found on the individual competition page on the website and/or facebook page.

<p>3.7 The promoter reserves the right to refuse or disqualify any entrant if it has reasonable grounds for believing that an entrant has contravened any of the terms and conditions provided. Or if they have acted in a way that is reasonability considered to be illegal.

<p>3.8 All entries to the competition are final and no refunds shall be made at any time or for any reason, except in the case of the cancellation of the competition by the promoter or any entries submitted after the competition closing date.

<p>3.9 The promoter does not accept responsibility for entries which they do not receive due to high internet traffic, hardware failure, software failure, server faults, failures in computer systems, or any other reason.

<p>3.10 The promoter does not accept responsibility for entries which they do not receive due to high internet traffic, hardware failure, software failure, server faults, failures in computer systems, or any other reason.

<p>3.11 We offer free entry via postal service. Please contact us via email for further details on this. You will need to send us the following information; name, address, email, contact number and date of birth along with which competition you would like to enter and the correct answer to the qualifying question. For details on where to send this please contact info@WinnerWish.com</p>
<h4>4. COMPETITION TIME PERIODS:</h4>

<p>4.1 Each individual competition will have separate time periods to which it will run, please see each individual competition on the website for these details. Each competition will run for a specified period with the closing date of the competition defined by, either, the maximum number of available tickets being sold, or, the chosen competition closing date. The promoter reserves the right to extend the closing date by up to 6 weeks at its discretion.

<p>4.2 In the event that the number of entries to the competition does not meet the maximum number by the closing date (after the competition has already been extended as in section 4.1), the competition will either: (a) close and the proceeds will be deemed, at the discretion of the promoter, sufficient to award the prize, or, (b) close and a cash ‘Prize Fund’ will be offered with the entry funds after the deduction of any admin expenses, other expenses, and marketing fees.

<p>4.3 The Promoter reserves the right to cancel any Competition at any time either before or after tickets have been sold, and refund entry fees to the entrants as required. Refunds will be processed within 4 weeks, and once processed the promoter shall have no further liability to the entrant or any other person.

<h3>5. CLOSING THE COMPETITION:</h3>
<p>5.1 Details of the Prize Draw for a competition will be confirmed once the competition has been closed (Either once tickets have sold, or the end date has been reached) and will be announced within 24 hours of the competition closing via the Facebook page and/or the Website.

<p>5.2  A final entry list will be posted to the Website and/or the Facebook page prior to the Prize Draw.

<p>5.3 Assigned ticket numbers for a Competition may be subject to change at any time until the entry list has been published. Any numbers assigned within a receipt of payment are subject to change up until the entry list has been published.

<p>5.4 All prize draws will be done via Facebook live using Google’s random number generator.

<p>5.5 There will be one winner per competition, in some instances we may have runner up prizes. Please check each individual competition for details on this as it will be different for each competition.

<p>5.6 In the event that a competition closes early if all tickets have sold out or for any other reason (see section 4), the winner will be selected from all valid and eligible entries received prior to the date of closure.

<p>5.7 The outcome of the competition via the google random generate as described above is final and no correspondence will be entered into about the result of the competition.

<p>5.8 If the winner cannot be contacted by the promoter within 10 days of being notified of their status as the winner by e-mail, telephone, or Facebook, then the Promoter reserves the right to then select an alternate winner, who will then have 10 days to accept the prize following the same routes of contact as the original winner. The original winner will have no claim to the prize after the alternate winner is selected.
<h3>6. PRIZE</h3>
<p>
6.1 The promoter owns any prize offered until a winner has been successfully contacted.

<p>6.2 The prize will only be that as stated and awarded at the time of the draw, no alternatives will be offered under any circumstance. In some cases we may offer a cash alternative, however this will be different on each individual competition. Please check each competition before entering on details around whether this will be an option or not.

<p>6.3 The Promoter will not provide any warranty or accept any valuation to the prize or guarantee functionality/roadworthiness in any way, shape, or form. The Entrant must make up their own decision through their own enquiries and legal advice before entering the competition.

<p>6.4 The promoter will deliver any prize the UK and Ireland free of charge and will ship/post any item where shipping/postage costs are less than £50. If neither of these two options apply, the winner must either collect the item or pay the extra cost of any shipping over £50. If we are unable to ship the prize i.e. courier legislation, it will be the entrant’s responsibility to collect the prize from the promotors address.

<p>6.5 The winner will be provided to show proof of identity and proof of entry to the competition at the time the prize is delivered/collected.
</p>
<h3>7. MISC</h3>
<p>7.1 The winner agrees to allow the promoter to display his or her name on the website and on social media in accordance with the Privacy Policy. The name and town of residence of the winner will be posted on the website for the purposes of announcing the winner of the competition within 24 hours of the winner being determined.

<p>7.2 The winner also agrees upon receipt of the prize that they are required to provide photo(s) and or video(s) for promotional purposes. The promoter may also use this content in any future promotional material.

<p>7.3 Entrants authorise the promoter to enter their personal details into their database and to use the information in accordance with the provisions of the Data Protection Act 1998 and subject to the terms of Privacy Policy.

<p>7.4 Save for death or personal injury the promoter will not be liable for any loss (including economic loss) suffered to or sustained by any person or property as a result of any act or omission of the promoters, nor will their servants or their agents in developing, planning and administrating the competition, distributing the prize to the winner or following the distribution of the prize.

<p>7.5 The promoter accepts no liability for errors or omissions contained within the prize details, description or specification or any other part of the website. It is the responsibility of each entrant to satisfy him/herself as to the accuracy of any such details and/or any content of this website.

<p>7.6 The Promoter will not be liable for any loss suffered by an entrant as a result of incomplete entries or failed computer communications or for any loss suffered as a result of use of the website.

<p>7.7 The promoter does not accept responsibility for entries which they do not receive due to failures in computer systems, other malfunctions, high Internet traffic, hardware failure, software failure, server faults or any other reason.

<p>7.8 These competition rules shall not create or be construed as creating any form of contract, joint venture or other agreement between any entrant and the promoters.

<p>7.9 The Promoter reserves the right to amend these terms and conditions at any time. Any changes will be immediately published on the competition home page.</p>
<h3>
8. PRIVACY POLICY</h3>
<p>8.1 The entrants and the promoter recognise that the promoter may use contact details and other data including personal data as defined by the Data Protection Act 1998 supplied by the entrants to the promoter to administer the website and conduct the competition according to these terms and conditions.

<p>8.2 The entrants and the promoter also recognise that the promoter may (either by choice or at the request of a third party) also disclose this information to relevant third parties for the purposes of the prevention of fraud, money laundering, legal or other financial or regulatory reasons.</p>

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
      <ScrollView>
        <Text
          style={[
            {
              color: 'black',

              margin: 15,

              color: colors.black,
              alignSelf: 'center',
              fontSize: 22,
              fontFamily: Fonts.PoppinsRegular,
            },
          ]}>
          TERM AND CONDITION
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
          containerStyle={{margin: 10}}
          html={htmlContent}
          imagesMaxWidth={Dimensions.get('window').width}
          baseFontStyle={{fontFamily: Fonts.PoppinsRegular}}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  const {userCart} = state.cart;

  return {userCart};
};
export default connect(mapStateToProps)(CharityDetail);
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
