import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const topLogo = require('@/assets/icons/topLogo.png');

const CustomMainHeader = ({route}) => {
  return (
    <View style={styles.container}>
      <Image source={topLogo} style={styles.logo} />
      <View style={styles.icons}>
        <Text>{route.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  logo: {
    height: 32,
    width: 80,
  },
  icons: {
    flexDirection: 'row',
  },
});
export default CustomMainHeader;
