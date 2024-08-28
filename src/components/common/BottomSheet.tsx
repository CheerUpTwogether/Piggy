import {BottomSheetProps} from '@/types/Common';

import {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const BottomSheet: React.FC<BottomSheetProps> = ({
  component,
  isShow,
  setIsShow,
  onClose,
  size,
  minHeight = 0,
}) => {
  // Modal 종료 애니메이션 및 상태 변경(false)
  const closeModal = () => {
    closeBottomSheet.start(() => {
      setIsShow(false);
      if (onClose) {
        onClose();
      }
    });
  };

  // Modal 오픈 애니메이션
  useEffect(() => {
    if (isShow) {
      Animated.spring(panY, {
        toValue: 0,
        tension: 20,
        useNativeDriver: true,
      }).start();
    }
  }, [isShow]);

  const modalHeight =
    screenHeight * size < minHeight ? minHeight : screenHeight * size;
  // 모달 움직일 높이
  const panY = useRef(new Animated.Value(screenHeight * size)).current;

  //  기존 모달에서 늘리는 것을 방지
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  // 모달 초기화 애니메이션 함수
  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  // 모달 종료 애니메이션 함수
  const closeBottomSheet = Animated.timing(panY, {
    toValue: modalHeight,
    duration: 100,
    useNativeDriver: true,
  });

  // 1.5 이상 속도로 드래그 했을 때 모달 종료
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove(e, gestureState) {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease(e, gestureState) {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  return (
    <Modal
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade"
      visible={isShow}
      onRequestClose={closeModal}>
      <View style={styles.bottomSheetOverlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={{flex: 1}} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetWrapper,
            height: modalHeight,
            transform: [{translateY: translateY}],
          }}
          {...panResponder.panHandlers}>
          <View style={styles.bottomSheetTopBarWrapper}>
            <View style={styles.bottomSheetTopBar} />
          </View>
          <View style={styles.bottomSheetContentsWrapper}>
            {component ? component({closeModal}) : null}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomSheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  bottomSheetWrapper: {
    width: screenWidth,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },

  bottomSheetTopBarWrapper: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },

  bottomSheetTopBar: {
    width: 50,
    height: 4,
    backgroundColor: '#AAA',
    borderRadius: 5,
  },
  bottomSheetContentsWrapper: {height: '100%', backgroundColor: '#FFF'},
});

export default BottomSheet;
