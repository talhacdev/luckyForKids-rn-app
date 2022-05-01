import {StyleSheet} from 'react-native';
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
    marginHorizontal: 10,
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
});
export default styles;
