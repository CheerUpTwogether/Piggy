import {GestureResponderEvent} from 'react-native';

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

export interface SlideModalProps {
  component?: React.ReactElement;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
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
  style?: object | object[];
}
