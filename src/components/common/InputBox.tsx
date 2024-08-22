import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {InputBoxProps} from 'types/Common';
import {commonStyle} from '@/styles/common';

const InputBox: React.FC<InputBoxProps> = ({
  value,
  setValue,
  placeholder,
  isLarge = true,
  icon: Icon,
  goBack = false,
}) => {
  const navigation = useNavigation();

  const handleCancel = () => {
    if (value !== '') {
      setValue('');
    } else if (goBack && value === '') {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.View}>
      <View
        style={[
          styles.container,
          isLarge ? styles.largeContainer : styles.mediumContainer,
        ]}>
        <Icon width={18} height={18} color={'#333'} />
        <TextInput
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          importantForAutofill="no"
          placeholderTextColor="#AAA"
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          style={[styles.input, commonStyle.MEDIUM_33_16]}
        />
      </View>
      {!isLarge && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.cancelWrapper}
          onPress={handleCancel}>
          <Text style={commonStyle.MEDIUM_PRIMARY_16}>취소</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: 48,
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    gap: 12,
  },
  largeContainer: {
    width: '100%',
  },
  mediumContainer: {
    width: '90%',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
  },
  cancelWrapper: {paddingHorizontal: 10},
});

export default InputBox;
