import React, {useEffect, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/Router';
import {IntroItemProps} from '@/types/intro';
import {commonStyle} from '@/styles/common';
import PiggyIconSvg from '@/assets/icons/piggyIcon.svg';
import RightArrowSbg from '@/assets/icons/rightArrow.svg';

const startImg = require('@/assets/images/piggyStart.png');
const {width, height} = Dimensions.get('window');

const IntroItem = ({item, currentIndex, totalItems}: IntroItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const buttonAnimation = useRef(new Animated.Value(0)).current;

  const handleStart = () => {
    navigation.replace('Main', {screen: 'Home'});
  };

  // 애니메이션 실행
  useEffect(() => {
    if (currentIndex === totalItems - 1) {
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [currentIndex, totalItems, buttonAnimation]);

  // 애니메이션 opacity, scale 값 설정
  const buttonOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const buttonScale = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <View style={styles.container}>
      {currentIndex === totalItems - 1 ? (
        <Animated.View
          style={[
            styles.startWrapper,
            {
              opacity: buttonOpacity,
              transform: [{scale: buttonScale}],
            },
          ]}>
          <TouchableOpacity onPress={handleStart} activeOpacity={0.6}>
            <Image source={startImg} style={styles.startImage} />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <TouchableOpacity
          style={styles.skipWrapper}
          onPress={handleStart}
          activeOpacity={0.6}>
          <Text style={[commonStyle.MEDIUM, styles.skipText]}>skip</Text>
          <RightArrowSbg
            width={width * 0.05}
            height={width * 0.05}
            color={'#333'}
          />
        </TouchableOpacity>
      )}
      <PiggyIconSvg
        width={width * 0.2}
        height={width * 0.2}
        style={styles.icon}
      />
      <Image source={item.image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, width, height},
  image: {
    justifyContent: 'center',
    width,
    height,
    resizeMode: 'contain',
  },
  icon: {
    position: 'absolute',
    zIndex: 2,
    top: 26,
    left: 30,
  },
  startWrapper: {
    position: 'absolute',
    bottom: 190,
    right: 100,
    width: 160,
    height: 160,
    zIndex: 3,
  },
  startImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  skipWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    top: width * 0.04,
    right: width * 0.02,
    width: 52,
    height: 52,
  },
  skipText: {
    color: '#555',
    fontSize: width * 0.04,
  },
});

export default IntroItem;
