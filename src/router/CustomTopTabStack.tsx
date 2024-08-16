import React from 'react';
import {StackHeaderProps} from '@react-navigation/stack';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import BackSvg from '@/assets/icons/leftArrow.svg';
import AlertSvg from '@/assets/icons/alert.svg';

const LeftIcon = ({visible}: {visible: boolean}) => {
  if (!visible) {
    return <View style={styles.empty} />;
  }
  return (
    <TouchableOpacity style={styles.button}>
      <BackSvg width={24} height={24} />
    </TouchableOpacity>
  );
};

const Title = ({title}: {title: string}) => {
  if (!title) {
    return <View />;
  }
  return <Text style={styles.title}>{title}</Text>;
};

const RightIcon = ({name}: {name: string}) => {
  if (name === 'Alert') {
    return <View style={styles.empty} />;
  }
  return (
    <TouchableOpacity style={styles.button}>
      <AlertSvg width={24} height={24} />
    </TouchableOpacity>
  );
};

const CustomTopTabStack = (props: StackHeaderProps) => {
  return (
    <View style={styles.container}>
      <LeftIcon visible={props.options.headerBackTitleVisible || false} />
      <Title title={props.options.title || ''} />
      <RightIcon name={props.route.name} />
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
  },
  button: {
    padding: 12,
  },
  empty: {
    width: 48,
  },
  title: {
    color: '#333333',
    fontSize: 16,
    fontFamily: 'NotoSansKR-Medium',
  },
});
export default CustomTopTabStack;
