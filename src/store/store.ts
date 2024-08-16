import create from 'zustand';
import {ToastStore} from '@/types/Common';

const useToastStore = create<ToastStore>(set => ({
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

export default useToastStore;
