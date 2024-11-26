import React, { ReactNode } from 'react';
import { 
  Modal, 
  StyleSheet, 
  Text, 
  View, 
  Dimensions 
} from 'react-native';
import IconButtonCustom from './IconButtonCustom';
import ButtonCustom from './ButtonCustom';

type ModalCustomProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
  title?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmTitle?: string;
  cancelTitle?: string;
  confirmIsLoading?: boolean;
}

export default function ModalCustom({ 
  modalVisible, 
  setModalVisible, 
  children, 
  title = 'Hello World!',
  onConfirm,
  onCancel,
  confirmTitle = 'Confirm',
  cancelTitle = 'Cancel',
  confirmIsLoading = false
}: ModalCustomProps) {
  const closeModal = () => {
    setModalVisible(false);
  }

  const handleConfirm = () => {
    onConfirm?.();
    closeModal();
  }

  const handleCancel = () => {
    onCancel?.();
    closeModal();
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.closeButtonContainer}>
            <IconButtonCustom 
              icon='close' 
              onPress={closeModal} 
            />
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            <View style={styles.childrenContainer}>
              {children}
            </View>
            {(onConfirm || onCancel) && (
              <View style={styles.buttonContainer}>
                {onCancel && (
                  <ButtonCustom 
                    title={cancelTitle}
                    onPress={handleCancel} 
                    variant='outline'
                  />
                )}
                {onConfirm && (
                  !confirmIsLoading ?
                  <ButtonCustom 
                    title={confirmTitle} 
                    onPress={handleConfirm} 
                  /> : <ButtonCustom 
                    title={confirmTitle} 
                    onPress={handleConfirm} 
                    disabled
                  />
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#eee',
    borderRadius: 16,
    padding: 0,
    width: Dimensions.get('window').width - 32,
    maxHeight: '80%',
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 1,
  },
  modalContent: {
    padding: 24,
  },
  modalTitle: {
    marginBottom: 12,
    textAlign: 'left',
    fontSize: 18,
    width: '100%',
  },
  childrenContainer: {
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    marginTop: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
});