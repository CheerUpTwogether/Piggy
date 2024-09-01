import {create} from 'zustand';
import {
  AppointmentFormStore,
  ModalStore,
  ToastStore,
  UserStore,
} from '@/types/common';
import {ModalProps} from 'react-native';

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
    nick_name: string,
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
        nick_name,
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
  setNickName: (nick_name: string) =>
    set(state => ({
      userData: {
        ...state.userData,
        nick_name,
      },
    })),
  setProfileImgUrl: (profile_img_url: string) =>
    set(state => ({
      userData: {
        ...state.userData,
        profile_img_url,
      },
    })),
  setServiceTermsAgreement: (service_terms_agreement: string) =>
    set(state => ({
      userData: {
        ...state.userData,
        service_terms_agreement,
      },
    })),
  setPaymentTermsAgreement: (payment_terms_agreement: string) =>
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

export const useAppointmentForm = create<AppointmentFormStore>(set => ({
  appointmentForm: {
    address: '',
    appointment_agreement_deadline_date: null,
    appointment_date: '',
    appointment_status: '',
    contents: '',
    created_at: null,
    deal_piggy_count: 0,
    latitude: null,
    longitude: null,
    participant_count: 0,
    place_name: '',
    proposer_id: '',
    subject: '',
    appointment_participants_list: [],
  },
  appointmentParticipants: [],
  resetAppointmentForm: () => {
    set(() => ({
      appointmentForm: {
        address: '',
        appointment_agreement_deadline_date: null,
        appointment_date: '',
        appointment_status: '',
        contents: '',
        created_at: null,
        deal_piggy_count: 0,
        latitude: null,
        longitude: null,
        participant_count: 0,
        place_name: '',
        proposer_id: '',
        subject: '',
        appointment_participants_list: [],
      },
    }));
  },
  setAppointmentForm: (key, value) =>
    set(state => ({
      appointmentForm: {
        ...state.appointmentForm,
        [key]: value,
      },
    })),
  setAppointmentParticipants: () =>
    set(state => ({
      appointmentParticipants: {
        ...state.appointmentParticipants,
      },
    })),
}));
