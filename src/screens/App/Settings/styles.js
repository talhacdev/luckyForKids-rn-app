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
  large: {fontFamily: Fonts.PoppinsBold, fontSize: 16},
  logo: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  inputText: {
    margin: 10,
    padding: 10,
    // paddingHorizontal: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FEFF',
    fontFamily: Fonts.PoppinsMedium,
    elevation: 5,
    color: 'gray',
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  itemraffle: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  textContainer: {
    justifyContent: 'center',
    flex: 0.75,
  },
  smallImg: {
    height: 110,
    width: 110,
    borderRadius: 10,
    flex: 0.3,
    margin: 4,
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  medium: {
    fontSize: 14,
    fontFamily: Fonts.PoppinsMedium,
    textAlign: 'center',
  },
  large: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsBold,
    textAlign: 'center',
  },
  cardContainer: {
    height: 410,
    width: 270,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'flex-end',

    backgroundColor: '#F8FEFF',

    elevation: 5,
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  button: {
    backgroundColor: 'white',

    elevation: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '50%',
  },
  ticket: {
    height: 70,
    width: 70,
    borderRadius: 35,
    position: 'absolute',
    right: -20,
    top: -10,
    backgroundColor: '#c2961d',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularButton: {
    borderRadius: 20,

    height: 25,
    width: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    margin: 5,
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    margin: 25,
    justifyContent: 'space-between',
    height: window.height / 3.4,
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
    borderRadius: 10,
  },
});
export default styles;
