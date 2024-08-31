import {useState} from 'react';

export const useButtonBottomSheet = () => {
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  // 고정 event
  const handleFixUser = () => {
    setBottomSheetShow(false);
  };

  // 삭제 envent
  const handleDeleteUser = () => {
    setBottomSheetShow(false);
  };
  const createButtonList = () => {
    const buttons: Array<{
      text: string;
      theme?: 'sub' | 'primary' | 'outline' | undefined;
      onPress: () => void | Promise<void>;
    }> = [
      {
        text: '고정',
        onPress: handleFixUser,
        theme: 'outline',
      },
      {
        text: '삭제',
        onPress: handleDeleteUser,
      },
    ];

    return buttons;
  };

  return {
    createButtonList,
    bottomSheetShow,
    setBottomSheetShow,
  };
};
