import {GestureResponderEvent, KeyboardTypeOptions} from 'react-native';
import {SvgProps} from 'react-native-svg';

export interface CheckBoxProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  onPress?: () => void;
  activeColor?: string;
}

export interface RadioButtonProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  onPress?: () => void;
  activeColor?: string;
}

export interface ToggleProps {
  initialState: boolean;
  onToggle: (newState: boolean) => void;
  loading?: boolean;
}

export interface UserStore {
  userData: {isAgree: {service: boolean; payment: boolean}};
  setIsAgree: (key: keyof UserStore['userData']['isAgree']) => void;
  gotoProfile: () => void;
  setGotoProfile: (func: () => void) => void;
}

export interface ToastStore {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => void;
  removeToast: (id: number) => void;
}

export interface ToastProps {
  id: number;
  success?: boolean;
  text: string;
  multiText?: string;
  duration?: number;
}
export interface ToastItemProps extends ToastProps {
  onRemove: (id: number) => void;
  index: number;
}

export interface BottomSheetProps {
  component?: (props: {closeModal: () => void}) => React.ReactNode;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  size: number;
  onClose?: () => void;
  minHeight?: number;
}

export interface EmptyProps {
  reason: string;
  solution: string;
}

export interface LeftItemProps {
  name: string;
  headerLeftLabelVisible: boolean;
}

export interface ButtonProps {
  text: string;
  onPress?: ((event: GestureResponderEvent) => void) & (() => void);
  theme?: 'primary' | 'sub' | 'outline';
  size?: 'full' | 'lg' | 'md' | 'sm';
  disable?: boolean;
  icon?: React.ReactNode;
  style?: object;
}

export interface ButtonCoupleProps {
  onPressLeft: ((event: GestureResponderEvent) => void) & (() => void);
  onPressRight: ((event: GestureResponderEvent) => void) & (() => void);
  textLeft: string;
  textRight: string;
  theme?: 'primary' | 'sub' | 'outline';
  disableLeft?: boolean;
  disableRight?: boolean;
  style?: object;
}

export interface ModalProps {
  title: string;
  isOpen: boolean;
  text: string;
  onPress?: ((event: GestureResponderEvent) => void) & (() => void);
  content?: string;
  onPressCancel?: ((event: GestureResponderEvent) => void) & (() => void);
  textCancel?: string;
  disable?: boolean;
}

// ModalStore 타입
export interface ModalState {
  text: string;
  title: string;
  isOpen: boolean;
  content: string;
}

export interface ModalStore {
  modal: ModalState;
  openModal: (modal: Omit<ModalState, 'isOpen'>) => void;
  closeModal: () => void;
}


export interface InputBoxProps {
  value: string;
  setValue: (text: string) => void;
  onSubmitEditing?: ((event: GestureResponderEvent) => void) & (() => void);
  onFocus?: ((event: GestureResponderEvent) => void) & (() => void);
  placeholder: string;
  isLarge?: boolean;
  icon: React.FC<SvgProps>;
  goBack?: boolean;
  disable?: boolean;
  label?: string;
  msg?: string;
  msgColor?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  readOnly?: boolean;

  style?: object;
  btn?: {
    btnText: string;
    onPress: ((event: GestureResponderEvent) => void) & (() => void);
    disable: boolean;
  };
}

export interface SideSlideModalProps {
  title?: string;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  //component?: React.ReactElement;
  children?: React.ReactElement;
  size?: number;
}
export interface TabBarProps {
  categories: {label: string; value: string}[];
  active: string;
  onChange: (value: string) => void;
}
export type KeyPadItemType =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '00'
  | '0'
  | 'deleteButton';
export interface KeyPadProps {
  onPress: (item: KeyPadItemType) => void;
}

export interface ProgressBarProps {
  totalStep: number;
  nowStep: number;
  progress?: boolean;
}

export interface SearchKeywordPlace {
  id?: string;
  place_name?: string;
  address_name?: string;
  road_address_name?: string;
  x?: string;
  y?: string;
  distance?: string;
  phone?: string;
  place_url?: string;
  category_group_code?: string;
  category_group_name?: string;
  category_name?: string;
}

export interface SearchAddressPlaceObjectOld {
  address_name: string;
  x: string;
  y: string;
}
export interface SearchAddressPlaceObjectNew {
  address_name: string;
  zone_no: string;
}

export interface SearchAddressPlace {
  address: SearchAddressPlaceObjectOld;
  road_address: SearchAddressPlaceObjectNew;
}

export interface ButtonBottomSheetProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  buttons: Array<{
    text: string;
    theme?: 'sub' | 'primary' | 'outline' | undefined;
    onPress: () => void | Promise<void>;
  }>;
}
