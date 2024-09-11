import React from 'react';
import {View, StyleSheet, Modal, ActivityIndicator} from 'react-native';

const LoadingCircle = ({isVisible}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={isVisible}>
      <View style={styles.modalOverlay}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingCircle;
