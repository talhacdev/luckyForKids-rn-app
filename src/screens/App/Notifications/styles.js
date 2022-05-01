import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../theme/colors';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
const window = Dimensions.get('window');
const SIZE = 30;
const ICON_WRAPPER_SIZE = 25;
import {Fonts} from '../../../utils/Fonts';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  logo: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  medium: {
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: Fonts.PoppinsRegular,
  },

  large: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsBold,
  },
  medium1: {
    fontSize: 14,
    // fontWeight: 'bold',
    fontFamily: Fonts.PoppinsBold,
  },
  button1: {
    // height: 33,
    width: 55,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 10,
    marginVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 10,
  },
  button: {
    // height: 33,
    width: 55,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 10,
    marginVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
  },
  ticket: {
    height: 40,
    width: 40,
    borderRadius: 35,
    position: 'absolute',
    right: -30,
    top: -30,
    backgroundColor: '#c2961d',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: Fonts.PoppinsMedium,
  },
  circularButton: {
    borderRadius: 20,

    height: 20,
    width: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginRight: 5,
    alignItems: 'center',
  },
  circularButton1: {
    borderRadius: 20,

    height: 20,
    width: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginLeft: 8,
    alignItems: 'center',
  },
  counter: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent: 'center',
    // flex: 1,
    // margin: 2,
    marginTop: 4,
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    margin: 25,
    justifyContent: 'space-between',
    height: window.height / 3.2,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    // borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    // borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
  },
});
export default styles;
