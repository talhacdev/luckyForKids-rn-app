import React, {useRef} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
const BottomSheet = ({sheet, data, onPress}) => {
  return (
    <RBSheet
      ref={sheet}
      height={440}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          marginTop: 10,
          paddingBottom: 20,
        },
      }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{margin: 10, paddingTop: 10}}
              onPress={onPress}>
              <Text>Hi there</Text>
            </TouchableOpacity>
          );
        }}
      />
    </RBSheet>
  );
};
export default BottomSheet;
