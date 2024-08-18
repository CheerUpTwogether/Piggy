import React from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import {useModalStore} from '@/store/store';
import Button from './Button';
import ButtonCouple from './ButtonCouple';

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
            <ButtonCouple
              onPressRight={modal.onPress || closeModal}
              textRight={modal.text}
              onPressLeft={modal.onPressCancel || closeModal}
              textLeft={modal.textCancel}
              disableRight={modal.disable}
              theme="sub"
            />
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
    padding: 20,
  },
  title: {
    fontFamily: 'NotoSansKR-Bold',
    fontWeight: 'bold',
    color: '#333',
    fontSize: 18,
    paddingBottom: 12,
  },
  content: {
    fontSize: 14,
    color: '#777777',
    fontFamily: 'NotoSansKR-Regular',
    paddingBottom: 28,
  },
});

export default ModalDefault;
