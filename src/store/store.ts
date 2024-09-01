import {create} from 'zustand';
import {ModalStore, ToastStore, UserStore} from '@/types/common';
import {ModalProps} from 'react-native';
// import {setServiceTermsAgreeSpb} from '@/supabase/AuthSpb';

export const useUserStore = create<UserStore>(set => ({
  userData: {
    id: '',
    email: '',
    nickname: '',
    created_at: '',
    updated_at: '',
    service_terms_agreement: false,
    payment_terms_agreement: false,
    notification_agreement: false,
    social_login_type: '',
    profile_img_url: '',
    phone_number: '',
    isAgree: {service: false, payment: false},
  },

  setLoginProfile: (
    id: string,
    email: string,
    nickname: string,
    created_at: string,
    updated_at: string,
    service_terms_agreement: boolean,
    payment_terms_agreement: boolean,
    notification_agreement: boolean,
    social_login_type: string,
    profile_img_url: string,
    phone_number: string,
  ) =>
    set(state => ({
      userData: {
        ...state.userData,
        id,
        email,
        nickname,
        created_at,
        updated_at,
        service_terms_agreement,
        payment_terms_agreement,
        notification_agreement,
        social_login_type,
        profile_img_url,
        phone_number,
      },
    })),
  setNickName: (nickname: string) =>
    set(state => ({
      userData: {
        ...state.userData,
        nickname,
      },
    })),
  setProfileImgUrl: (profile_img_url: string) =>
    set(state => ({
      userData: {
        ...state.userData,
        profile_img_url,
      },
    })),
  setServiceTermsAgreement: (service_terms_agreement: boolean) =>
    set(state => ({
      userData: {
        ...state.userData,
        service_terms_agreement,
      },
    })),
  setPaymentTermsAgreement: (payment_terms_agreement: boolean) =>
    set(state => ({
      userData: {
        ...state.userData,
        payment_terms_agreement,
      },
    })),
  setPhoneNumber: (phone_number: string) =>
    set(state => ({
      userData: {
        ...state.userData,
        phone_number,
      },
    })),

  setIsAgree: (key: 'service' | 'payment') =>
    set(state => ({
      userData: {
        ...state.userData,
        isAgree: {
          ...state.userData.isAgree,
          [key]: !state.userData.isAgree[key],
        },
      },
    })),

  gotoProfile: () => {},

  setGotoProfile: func => set(() => ({gotoProfile: func})),
}));

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
}));
