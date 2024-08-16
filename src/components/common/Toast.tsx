import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import useToastStore from '@/store/store';
import {ToastItemProps} from '@/types/Common';

import SuccessIcon from '@/assets/icons/success.svg';
import WarningIcon from '@/assets/icons/warning.svg';

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
        {opacity: fadeAnim, transform: [{translateY}], marginTop: index * 62},
      ]}>
      <View style={styles.wrapper}>
        {success ? (
          <SuccessIcon width={16} height={16} color={'#04BF8A'} />
        ) : (
          <WarningIcon width={16} height={16} color={'#FEE583'} />
        )}
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{text}</Text>
          {multiText && <Text style={styles.text}>{multiText}</Text>}
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
    width: 240,
    height: 60,
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  textWrapper: {gap: 2},
  text: {color: '#FFF'},
});

export default Toast;
