import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {InputBoxProps} from 'types/Common';

const InputBox: React.FC<InputBoxProps> = ({
  value,
  setValue,
  placeholder,
  isLarge = true,
  icon: Icon,
}) => {
  const handleCancel = () => {
    if (value !== '') {
      setValue('');
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
          style={styles.input}
        />
      </View>
      {!isLarge && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.cancelWrapper}
          onPress={handleCancel}>
          <Text style={styles.cancelText}>취소</Text>
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
    width: '95%',
  },
  mediumContainer: {
    width: '85%',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
    textAlignVertical: 'center',
  },
  cancelWrapper: {paddingHorizontal: 10},
  cancelText: {color: '#ED423F', fontFamily: 'NotoSansKR-Medium'},
});

export default InputBox;
