import {FC} from 'react';

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

export interface ToastProps {
  success: boolean;
  text: string;
  multiText?: string;
  duration?: number;
}

export interface SlideModalProps {
  component?: React.ReactElement;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}
