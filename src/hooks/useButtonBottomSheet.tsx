import {useState} from 'react';

export const useButtonBottomSheet = (
  onPressFix: () => void,
  onPressDelete: () => void,
) => {
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  // 고정 event
  const handleFix = () => {
    onPressFix();
    setBottomSheetShow(false);
  };

  // 삭제 envent
  const handleDelete = () => {
    onPressDelete();
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
        onPress: handleFix,
        theme: 'outline',
      },
      {
        text: '삭제',
        onPress: handleDelete,
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
