import {create} from 'zustand';
import {ModalStore, ToastStore} from '@/types/Common';
import {ModalProps} from 'react-native';

export const useToastStore = create<ToastStore>(set => ({
  toasts: [],
  addToast: newToast =>
    set(state => {
      const toasts =
        state.toasts.length >= 3 ? state.toasts.slice(1) : state.toasts;
      return {toasts: [...toasts, {...newToast, id: Date.now()}]};
    }),
  removeToast: id =>
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    })),
}));

export const useModalStore = create<ModalStore>(set => ({
  modal: {
    text: '',
    title: '',
    isOpen: false,
    content: '',
  },
  openModal: (modal: Omit<ModalProps, 'isOpen'>) =>
    set(state => ({
      modal: {
        ...state.modal,
        ...modal,
        isOpen: true, // isOpen을 명시적으로 true로 설정
      },
    })),
  closeModal: () =>
    set(() => ({
      modal: {
        text: '',
        title: '',
        isOpen: false,
        content: '',
      },
    })),
  test: () => {
    console.log('test');
  },
}));
