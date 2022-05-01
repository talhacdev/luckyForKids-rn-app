import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../theme/colors';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
const window = Dimensions.get('window');
const SIZE = 30;
const ICON_WRAPPER_SIZE = 25;
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
  },
  horizontal: {
    width: '90%',
    padding: 8,
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 100,
    // marginVertical: 10,
  },
  horizontal1: {
    width: '90%',
    padding: 8,
    // marginTop: 15,
    marginTop: 5,
    alignSelf: 'center',
    backgroundColor: colors.orange,
    borderRadius: 100,
    marginBottom: 10,
    // marginVertical: 10,
  },
  charity: {
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    flexDirection: 'row',
    margin: 10,
  },
  button: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    elevation: 10,
    height: 30,
    width: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 20,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  counter: {
    flexDirection: 'row',

    // flex: 1,
    // margin: 5,
    // marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
  progress: {
    height: 6,
    width: '100%',
    shadowOpacity: 10,
    shadowColor: '#BDBDBD',
    // margin: 10,
    backgroundColor: 'white',
    elevation: 4,
    marginTop: 10,
    borderRadius: 100,
    alignSelf: 'center',
  },
  filled: {
    height: 6,
    // width: '100%',

    backgroundColor: colors.primary,

    borderRadius: 100,
  },
});
export default styles;
