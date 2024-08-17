import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useModalStore} from '@/store/store';
import Button from './Button';
import ButtonCouple from './ButtonCouple';

const ModalDefault = () => {
  const {modal, closeModal} = useModalStore();
  if (!modal.isOpen) {
    return;
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{modal.title}</Text>
        <Text style={styles.content}>{modal.content}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
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
