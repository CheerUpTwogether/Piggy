export type CheckBoxProps = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  activeColor?: string;
};

export interface ToggleProps {
  initialState: boolean;
  onToggle: (newState: boolean) => void;
  loading?: boolean;
}
