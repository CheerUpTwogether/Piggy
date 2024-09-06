import {useState} from 'react';

export const useButtonBottomSheet = (
  onPressFix: () => void,
  onPressDelete: () => void,
  text?: string,
  disable?: boolean,
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
      disable?: boolean;
    }> = [
      {
        text: '고정',
        onPress: handleFix,
        theme: 'outline',
      },
      {
        text: text || '삭제',
        onPress: handleDelete,
        disable,
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
