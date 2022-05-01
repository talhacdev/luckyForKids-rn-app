import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Fonts} from '../utils/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Picker = ({title = '', onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        styles.email,
        {
          marginTop: 30,
          marginLeft: 26,
          marginRight: 27,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      ]}>
      <Text style={styles.titleStyle}>{title}</Text>
      <MaterialIcons
        name="keyboard-arrow-down"
        color="gray"
        size={25}
        style={{marginRight: 13}}
      />
    </TouchableOpacity>
  );
};

export default Picker;
const styles = StyleSheet.create({
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
  email: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: 14,

    color: 'grey',
    width: '80%',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  titleStyle: {
    fontSize: 15,
    // color: 'red',
    color: 'grey',
    fontFamily: Fonts.PoppinsMedium,
  },
});
