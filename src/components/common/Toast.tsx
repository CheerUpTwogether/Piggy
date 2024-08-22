import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
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

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -50,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => onRemove(id));
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, translateY, id, onRemove]);

  return (
    <Animated.View
      style={[
        styles.toast,
        {opacity: fadeAnim, transform: [{translateY}], marginTop: index * 67},
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
    marginTop: 20,
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
