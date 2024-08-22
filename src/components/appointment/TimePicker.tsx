import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const TimePicker = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginTop: 12,
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 12,
  },
});

export default TimePicker;
