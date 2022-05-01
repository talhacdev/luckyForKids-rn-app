import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import colors from '../../../theme/colors';
import {Fonts} from '../../../utils/Fonts';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  medium: {fontFamily: Fonts.PoppinsMedium, fontSize: 15},
  large: {fontFamily: Fonts.PoppinsMedium, fontSize: 16},
  logo: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

    marginVertical: 10,
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 2,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  login: {
    marginTop: 40,
    fontFamily: Fonts.PoppinsBold,
    fontSize: 20,
    color: colors.primary,
    // color: '#11416F',
  },
  email: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: 14,
    // height: 30,
    justifyContent: 'center',
    // marginTop: 5,
    // backgroundColor: 'red',
    color: 'grey',
    width: '70%',
    marginLeft: 10,
    // alignSelf: 'center',
    // alignContent: 'center',
    // alignSelf: 'center',
    // textAlign: 'center',
    paddingBottom: 5,
  },
  email1: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: 14,
    // height: 30,
    justifyContent: 'center',
    // marginTop: 5,
    // backgroundColor: 'red',
    color: 'grey',
    width: '70%',
    marginLeft: 10,
    // alignSelf: 'center',
    // alignContent: 'center',
    // alignSelf: 'center',
    // textAlign: 'center',
    paddingBottom: 5,
  },
  forgot: {
    marginLeft: 10,
  },
});
export default styles;
