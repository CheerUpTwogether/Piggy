import {useCallback, useEffect, useState} from 'react';
import {FriendProp} from '@/types/friend';
import {useFocusEffect} from '@react-navigation/native';
import {getUsersSpb} from '@/supabase/FriendsSpb';
import {useAppointmentForm, useToastStore} from '@/store/store';
import useDebounce from '@/hooks/useDebounce';

const useAppointmentFriend = () => {
  const [users, setUsers] = useState<FriendProp[]>([]);
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 100);
  const {appointmentForm, setAppointmentForm} = useAppointmentForm();
  const addToast = useToastStore(state => state.addToast);

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
    try {
      const data = await getUsersSpb(
        '8b9f1998-084e-447f-b586-d18c72cf1db4',
        keyword,
      );
      setUsers(data);
    } catch {
      addToast({
        success: false,
        text: '친구리스트를 불러오지 못했어요',
      });
    }
  };

  const handleFriendPress = (friend: FriendProp) => {
    const isSelected = appointmentForm?.appointment_participants_list?.some(
      item => item.id === friend.id,
    );

    if (isSelected) {
      // 이미 선택된 친구일 경우 선택 해제
      handleFriendDelete(friend);
    } else {
      // 새로운 친구 선택
      setAppointmentForm('appointment_participants_list', [
        friend,
        ...(appointmentForm?.appointment_participants_list || []),
      ]);
    }
  };

  const handleFriendDelete = (friend: FriendProp) => {
    setAppointmentForm(
      'appointment_participants_list',
      appointmentForm?.appointment_participants_list?.filter(
        item => item.id !== friend.id,
      ) || [],
    );
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
    changeTitle,
    appointmentForm,
  };
};

export default useAppointmentFriend;
