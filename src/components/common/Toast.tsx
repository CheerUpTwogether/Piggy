import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  PanResponder,
} from 'react-native';
import {useToastStore} from '@/store/store';
import {ToastItemProps} from '@/types/Common';
import {commonStyle} from '@/styles/common';

import SuccessIconSvg from '@/assets/icons/success.svg';
import WarningIconSvg from '@/assets/icons/warning.svg';

const Toast = () => {
  const {toasts, removeToast} = useToastStore();

  return (
    <View style={styles.container}>
      {toasts.map((toast, index) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          success={toast.success}
          text={toast.text}
          multiText={toast.multiText}
          onRemove={removeToast}
          index={index}
        />
      ))}
    </View>
  );
};

const ToastItem: React.FC<ToastItemProps> = ({
  id,
  success = true,
  text,
  multiText,
  onRemove,
  index,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-50)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  // PanResponder - 밀어올리는 제스처 감지
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: Animated.event([null, {dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) {
          // 사용자가 위로 스와이프하면 토스트를 제거
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: -50,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => onRemove(id));
        } else {
          // 스와이프가 충분하지 않으면 원위치
          Animated.spring(pan.y, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // 2.5초 뒤에 사라지게 설정
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => onRemove(id));
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [fadeAnim, translateY, id, onRemove]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.toast,
        {
          opacity: fadeAnim,
          transform: [
            {translateY: Animated.add(translateY, pan.y)},
            //{translateX: index * 10}, // 우측으로 조금 이동
          ],
          marginTop: index * 10,
        },
      ]}>
      <View style={styles.wrapper}>
        {success ? (
          <SuccessIconSvg width={20} height={20} color={'#04BF8A'} />
        ) : (
          <WarningIconSvg width={20} height={20} color={'#FEE583'} />
        )}
        <View style={styles.textWrapper}>
          <Text style={commonStyle.MEDIUM_FF_14}>{text}</Text>
          {multiText && (
            <Text style={commonStyle.REGULAR_FF_14}>{multiText}</Text>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 9999,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
  },
  toast: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#666',
    width: 300,
    height: 65,
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  textWrapper: {gap: 2},
});

export default Toast;
