import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {ToastProps} from '@/types/Common';

import SuccessIcon from '@/assets/icons/success.svg';
import WarningIcon from '@/assets/icons/warning.svg';

const Toast: React.FC<ToastProps> = ({
  success,
  text,
  multiText,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(true);
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
      ]).start(() => setVisible(false));
    }, duration);

    return () => clearTimeout(timer);
  }, [fadeAnim, translateY, duration]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {opacity: fadeAnim, transform: [{translateY}]},
      ]}>
      <View style={[styles.wrapper, {height: multiText ? 60 : 40}]}>
        {success ? (
          <SuccessIcon width={16} height={16} color={'#04BF8A'} />
        ) : (
          <WarningIcon width={16} height={16} color={'#FEE583'} />
        )}
        <View>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
  text: {color: '#FFF'},
});

export default Toast;
