import {useCallback, useEffect, useState} from 'react';
import {FriendProp} from '@/types/friend';
import {useFocusEffect} from '@react-navigation/native';
import {getUsersSpb} from '@/supabase/FriendsSpb';
import {useAppointmentForm, useToastStore} from '@/store/store';
import useDebounce from '@/hooks/useDebounce';

const useAppointmentFriend = () => {
  const [users, setUsers] = useState<FriendProp[]>([]);
  const [keyword, setKeyword] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<FriendProp[]>([]);
  const addToast = useToastStore(state => state.addToast);
  const debouncedKeyword = useDebounce(keyword, 100);
  const {appointmentForm, setAppointmentForm} = useAppointmentForm();
  // debouncedKeyword가 변경될 때 라디오 상태 초기화 (선택된 친구는 유지)
  useEffect(() => {
    setKeyword(debouncedKeyword);
    getUsers();
  }, [debouncedKeyword]);

  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, []),
  );

  const getUsers = async () => {
    const {data, error} = await getUsersSpb(
      '8b9f1998-084e-447f-b586-d18c72cf1db4',
      keyword,
    );
    if (error) {
      addToast({
        success: false,
        text: '친구리스트를 불러오지 못했어요',
      });
      return;
    }

    setUsers(data.filter((el: FriendProp) => el.is_friend));
  };

  const handleFriendPress = (friend: FriendProp) => {
    const isSelected = selectedFriends.some(item => item.id === friend.id);

    if (isSelected) {
      // 이미 선택된 친구일 경우 선택 해제
      setSelectedFriends(prev =>
        prev.filter((item: FriendProp) => item.id !== friend.id),
      );
    } else {
      // 새로운 친구 선택
      setSelectedFriends([friend, ...selectedFriends]);
    }
  };

  const handleFriendDelete = (friend: FriendProp) => {
    setSelectedFriends(selectedFriends.filter(item => item.id !== friend.id));
  };

  // 제목변경
  const changeTitle = (subject: string) => {
    setAppointmentForm('subject', subject);
  };

  return {
    users,
    getUsers,
    keyword,
    setKeyword,
    handleFriendPress,
    handleFriendDelete,
    selectedFriends,
    changeTitle,
    appointmentForm,
  };
};

export default useAppointmentFriend;
