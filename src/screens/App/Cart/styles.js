import {StyleSheet} from 'react-native';
import {Fonts} from '../../../utils/Fonts';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
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
  text: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 16,
    alignItems: 'center',
    alignItems: 'center',
    fontFamily: Fonts.PoppinsMedium,
  },
  circularButton: {
    borderRadius: 12.5,
    elevation: 10,
    height: 20,
    width: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginTop: 5,
    shadowOpacity: 10,
    shadowColor: '#BDBDBD',
  },
  counter: {
    flexDirection: 'row',
    // flex: 1,
    margin: 5,
    justifyContent: 'flex-start',
  },
  medium: {fontFamily: Fonts.PoppinsMedium, fontSize: 14},
  large: {fontFamily: Fonts.PoppinsMedium, fontSize: 16},
  large1: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: 14,
    fontWeight: 'bold',
    // marginBottom: 8,
  },
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
  charity: {
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    flexDirection: 'row',
    // backgroundColor: 'red',
    margin: 1,
  },
  medium: {
    fontSize: 14,
  },
});
export default styles;
