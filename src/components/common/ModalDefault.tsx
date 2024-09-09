import React from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import {useModalStore} from '@/store/store';
import Button from './Button';
import {commonStyle} from '@/styles/common';

const ModalDefault = () => {
  const {modal, closeModal} = useModalStore();

  return (
    <Modal animationType="slide" visible={modal.isOpen} transparent={true}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{modal.title}</Text>
          {modal.content ? (
            <Text style={styles.content}>{modal.content}</Text>
          ) : (
            <View style={{paddingBottom: 12}} />
          )}
          {modal.textCancel ? (
            <View style={{flexDirection: 'row', height: 60}}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={modal.onPressCancel || closeModal}
                style={[
                  styles.buttonWrapper,
                  {backgroundColor: '#EFEFEF', borderBottomLeftRadius: 10},
                ]}>
                <Text style={commonStyle.MEDIUM_77_16}>{modal.textCancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={modal.onPress || closeModal}
                style={[
                  styles.buttonWrapper,
                  {backgroundColor: '#ED423F', borderBottomRightRadius: 10},
                ]}>
                <Text style={commonStyle.MEDIUM_FF_16}>{modal.text}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Button onPress={closeModal} text={modal.text} theme="sub" />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
  },
  wrapper: {
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: 28,
  },
  title: {
    ...commonStyle.BOLD_33_18,
    marginTop: 36,
    paddingHorizontal: 40,
    textAlign: 'center',
  },
  content: {
    ...commonStyle.REGULAR_77_14,
    textAlign: 'center',
    marginTop: 18,
    paddingHorizontal: 42,
    paddingBottom: 28,
  },
  buttonWrapper: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalDefault;
