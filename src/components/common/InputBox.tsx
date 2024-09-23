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
import {commonStyle, color_primary} from '@/styles/common';
import Button from './Button';

const InputBox: React.FC<InputBoxProps> = ({
  value,
  setValue,
  onSubmitEditing,
  onFocus,
  placeholder,
  isLarge = true,
  icon: Icon,
  goBack = false,
  disable = false,
  label,
  msg = '',
  msgColor = color_primary,
  keyboardType = 'default',
  maxLength = 1000,
  readOnly = false,
  style = {},
  btn,
}) => {
  const navigation = useNavigation();

  const handleCancel = () => {
    if (value !== '') {
      setValue('');
    } else if (goBack && value === '') {
      navigation.goBack();
    }
  };

  const filterNumber = (text: string) => {
    setValue(text.replace(/[^0-9]/g, ''));
  };

  return (
    <View style={style}>
      {label && <Text style={[styles.label]}>{label}</Text>}

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
            onChangeText={keyboardType === 'numeric' ? filterNumber : setValue}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
            style={[styles.input, commonStyle.MEDIUM_33_16]}
            editable={!disable}
            selectTextOnFocus={!disable}
            keyboardType={keyboardType}
            maxLength={maxLength}
            readOnly={readOnly}
          />
          {btn && (
            <Button
              text={btn.btnText}
              onPress={btn.onPress}
              size="sm"
              theme="outline"
              style={{marginRight: -23}}
              disable={btn.disable}
            />
          )}
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
      <View style={styles.msgContainer}>
        {msg && (
          <Text
            style={[
              commonStyle.MEDIUM_PRIMARY_12,
              {padding: 4, color: msgColor},
            ]}>
            {msg}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    ...commonStyle.MEDIUM_33_16,
    paddingBottom: 12,
  },
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
    width: '86%',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
  },
  cancelWrapper: {
    paddingHorizontal: 10,
    width: 55,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgContainer: {
    height: 24,
  },
  msg: {
    ...commonStyle.MEDIUM_PRIMARY_12,
    padding: 4,
  },
});

export default InputBox;
