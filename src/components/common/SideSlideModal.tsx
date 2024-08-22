import {SideSlideModalProps} from '@/types/Common';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {commonStyle} from '@/styles/common';
import CancleSvg from '@/assets/icons/X.svg';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const SideSlideModal: React.FC<SideSlideModalProps> = ({
  title,
  isShow,
  setIsShow,
  size = 0.7,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(isShow);
  const slideAnimValue = useRef(new Animated.Value(screenWidth * size)).current;
  const fadeAnimValue = useRef(new Animated.Value(0)).current;

  // 화면 fade , 모달 slide 애니메이션
  useEffect(() => {
    if (isShow) {
      setIsVisible(true);
      Animated.parallel([
        Animated.spring(slideAnimValue, {
          toValue: 0,
          tension: 12,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimValue, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnimValue, {
          toValue: screenWidth * size,
          tension: 12,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsVisible(false);
      });
    }
  }, [isShow]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={styles.overlayTouchable}
        activeOpacity={1}
        onPress={() => setIsShow(false)}>
        <Animated.View style={[styles.overlay, {opacity: fadeAnimValue}]} />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{translateX: slideAnimValue}],
            width: screenWidth * size,
          },
        ]}>
        <View style={styles.topBarContainer}>
          <Text style={commonStyle.REGULAR_77_18}>{title}</Text>
          <TouchableOpacity
            style={styles.cancleContainer}
            onPress={() => setIsShow(false)}>
            <CancleSvg width={18} height={18} color={'#333'} />
          </TouchableOpacity>
        </View>
        <View style={styles.componentContainer}>{children}</View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlayTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    zIndex: 1,
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
    right: 0,
    height: screenHeight,
    backgroundColor: '#fff',
  },
  topBarContainer: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 22,
    paddingRight: 22,
  },
  cancleContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  componentContainer: {height: '100%'},

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'black',
  },
});

export default SideSlideModal;
