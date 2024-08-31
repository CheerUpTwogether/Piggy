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
