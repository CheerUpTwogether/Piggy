import {FreindRow} from '@/types/friend';
import {useState} from 'react';

const useFriendSelect = () => {
  const [selectedFriendList, setSelectedFriendList] = useState<FreindRow[]>([]);

  const handleFriendPress = (friend: FreindRow) => {
    const isSelected = selectedFriendList.some(item => item.id === friend.id);

    if (isSelected) {
      // 이미 선택된 친구일 경우 선택 해제
      setSelectedFriendList(prev => prev.filter(item => item.id !== friend.id));
    } else {
      // 새로운 친구 선택
      setSelectedFriendList([friend, ...selectedFriendList]);
    }
  };

  const handleFriendPress = friend => {
    const isSelected = selectedFriendList.some(item => item.id === friend.id);

    if (isSelected) {
      // 이미 선택된 친구일 경우 선택 해제
      setSelectedFriendList(prev => prev.filter(item => item.id !== friend.id));
    } else {
      // 새로운 친구 선택
      setSelectedFriendList([friend, ...selectedFriendList]);
    }

    // 라디오 상태 업데이트 (uuid 기준으로 상태 관리)
    setRadioState(prevState => ({
      ...prevState,
      [friend.uuid]: !prevState[friend.uuid],
    }));
  };

  return {
    handleFriendPress,
    selectedFriendList,
    setSelectedFriendList,
    handleFriendPress,
  };
};

export default useFriendSelect;
