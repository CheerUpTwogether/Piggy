import {useCallback, useEffect, useState} from 'react';
import {FriendProp} from '@/types/friend';
import {useFocusEffect} from '@react-navigation/native';
import {getSearchFriendsSpb} from '@/supabase/FriendsSpb';
import {useAppointmentForm, useToastStore, useUserStore} from '@/store/store';
import useDebounce from '@/hooks/useDebounce';

const useAppointmentFriendHooks = () => {
  const [friends, setFriends] = useState<FriendProp[]>([]);
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 100);
  const {appointmentForm, setAppointmentFormByKey} = useAppointmentForm();
  const addToast = useToastStore(state => state.addToast);
  const {userData} = useUserStore();

  // debouncedKeyword가 변경될 때 라디오 상태 초기화 (선택된 친구는 유지)
  useEffect(() => {
    setKeyword(debouncedKeyword);
    getFriends();
  }, [debouncedKeyword]);

  useFocusEffect(
    useCallback(() => {
      getFriends();
    }, []),
  );

  const getFriends = async () => {
    try {
      const data = await getSearchFriendsSpb(userData.id, keyword);
      setFriends(data);
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
      setAppointmentFormByKey('appointment_participants_list', [
        friend,
        ...(appointmentForm?.appointment_participants_list || []),
      ]);
    }
  };

  const handleFriendDelete = (friend: FriendProp) => {
    setAppointmentFormByKey(
      'appointment_participants_list',
      appointmentForm?.appointment_participants_list?.filter(
        item => item.id !== friend.id,
      ) || [],
    );
  };

  // 제목변경
  const changeTitle = (subject: string) => {
    setAppointmentFormByKey('subject', subject);
  };

  return {
    friends,
    changeTitle,
    keyword,
    setKeyword,
    handleFriendPress,
    handleFriendDelete,
    appointmentForm,
  };
};

export default useAppointmentFriendHooks;
