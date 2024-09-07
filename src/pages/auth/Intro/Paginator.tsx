import React from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import {PaginatorProps} from '@/types/intro';

const {width: screenWidth} = Dimensions.get('window');

const Paginator: React.FC<PaginatorProps> = ({data, scrollX}) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const inputRange = [
          (index - 1) * screenWidth,
          index * screenWidth,
          (index + 1) * screenWidth,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={index.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E87D7B',
    marginHorizontal: 8,
  },
});

export default Paginator;
