import {GestureResponderEvent} from 'react-native';
import {SvgProps} from 'react-native-svg';

export interface CheckBoxProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  activeColor?: string;
}

export interface RadioButtonProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  activeColor?: string;
}

export interface ToggleProps {
  initialState: boolean;
  onToggle: (newState: boolean) => void;
  loading?: boolean;
}

export interface UserStore {
  userData: any[];
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
  component?: React.ReactElement;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  size: number;
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
  onPress: ((event: GestureResponderEvent) => void) & (() => void);
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
export interface ModalStore {
  modal: ModalProps;
  openModal: (modal: Omit<ModalProps, 'isOpen'>) => void;
  closeModal: () => void;
}
export interface InputBoxProps {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  isLarge?: boolean;
  icon: React.FC<SvgProps>;
  goBack?: boolean;
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
  categories: {label: string; value: number | boolean | string}[];
  active: string;
  onChange: (value: number | boolean | string) => void;
}
