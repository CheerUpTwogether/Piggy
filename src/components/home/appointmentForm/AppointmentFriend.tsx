import InputBox from '@/components/common/InputBox';
import {commonStyle} from '@/styles/common';
import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useDebounce from '@/hooks/useDebounce';
import {dummy_friends_data} from '@/mock/Friends/Friends';
import {Friend} from '@/mock/Friends/type';

import RoundHandShake from '@/assets/icons/roundHandshake.svg';
import SearchFriendSvg from '@/assets/icons/searchFriend.svg';
import EmptyResult from '@/components/common/EmptyResult';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';
import {useToastStore} from '@/store/store';

const AppointmentFriend = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 100);
  const [selectedFriendList, setSelectedFriendList] = useState<Friend[]>([]);
  const [title, setTitle] = useState('');
  const addToast = useToastStore(state => state.addToast);

  const sortedUsersData = debouncedKeyword
    ? dummy_friends_data
        .filter(friend =>
          friend.nick_name.toLowerCase().includes(keyword.toLowerCase()),
        )
        .sort((a, b) => {
          const nameA = a.nick_name.toLowerCase();
          const nameB = b.nick_name.toLowerCase();
          return nameA.localeCompare(nameB, 'ko');
        })
    : [];

  const sortedFriendsData = sortedUsersData.filter(friend => friend.friend);

  // uuid를 키로 가지는 라디오 상태 객체 생성
  const [radioState, setRadioState] = useState<{[key: string]: boolean}>({});

  // debouncedKeyword가 변경될 때 라디오 상태 초기화 (선택된 친구는 유지)
  useEffect(() => {
    const initialRadioState: {[key: string]: boolean} = {};
    sortedFriendsData.forEach(friend => {
      initialRadioState[friend.uuid] = selectedFriendList.some(
        selected => selected.uuid === friend.uuid,
      );
    });
    setRadioState(initialRadioState);
  }, [debouncedKeyword]);

  console.log(radioState);

  const handleFriendPress = (friend: Friend, index: number) => {
    const isSelected = selectedFriendList.some(
      item => item.uuid === friend.uuid,
    );

    if (isSelected) {
      // 이미 선택된 친구일 경우 선택 해제
      const newSelectedFriendList = selectedFriendList.filter(
        item => item.uuid !== friend.uuid,
      );
      setSelectedFriendList(newSelectedFriendList);
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

  const handleFriendDelete = (friend: Friend) => {
    const newSelectedFriendList = selectedFriendList.filter(
      item => item.uuid !== friend.uuid,
    );
    setSelectedFriendList(newSelectedFriendList);

    // 선택된 친구에서 제거할 경우 라디오 상태 해제
    setRadioState(prevState => ({
      ...prevState,
      [friend.uuid]: false,
    }));
  };

  const renderSelectFriendItem = ({item}: {item: Friend}) => (
    <TouchableOpacity
      style={styles.firendSelectWrapper}
      onPress={() => handleFriendDelete(item)}>
      {item.profile_image_path ? (
        <Image
          source={{uri: item.profile_image_path}}
          style={styles.friendSelectProfile}
        />
      ) : (
        <View style={[styles.friendEmptyProfile, styles.friendSelectProfile]}>
          <BasicProfileSvg width={24} height={24} />
        </View>
      )}
      <Text style={commonStyle.REGULAR_33_12}>{item.nick_name}</Text>
    </TouchableOpacity>
  );

  const renderFriendItem = ({item, index}: {item: Friend; index: number}) => (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.friendContainer,
        radioState[item.uuid] && {borderColor: '#ED423F'},
      ]}
      onPress={() => handleFriendPress(item, index)}>
      <View style={styles.friendWrapper}>
        {item.profile_image_path ? (
          <Image
            source={{uri: item.profile_image_path}}
            style={styles.friendProfile}
          />
        ) : (
          <View style={[styles.friendEmptyProfile, styles.friendProfile]}>
            <BasicProfileSvg width={24} height={24} />
          </View>
        )}
        <Text style={commonStyle.MEDIUM_33_14}>{item.nick_name}</Text>
      </View>

      <View
        style={[
          styles.radioContainer,
          radioState[item.uuid] && styles.radioSelected,
        ]}>
        {radioState[item.uuid] && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={{marginVertical: 18, gap: 8}}>
        <Text style={commonStyle.MEDIUM_33_16}>약속 제목</Text>
        <InputBox
          value={title}
          setValue={setTitle}
          placeholder="약속 제목을 입력해주세요."
          icon={RoundHandShake}
        />
      </View>
      <View style={{marginVertical: 18, gap: 8}}>
        <Text style={commonStyle.MEDIUM_33_16}>함께할 친구</Text>
        <InputBox
          value={keyword}
          setValue={setKeyword}
          placeholder="함께할 친구"
          icon={SearchFriendSvg}
        />
      </View>
      <View style={styles.firendSelectContainer}>
        <FlatList
          data={selectedFriendList}
          horizontal
          renderItem={renderSelectFriendItem}
          keyExtractor={item => item.uuid.toString()}
        />
      </View>
      <FlatList
        data={sortedFriendsData}
        renderItem={renderFriendItem}
        keyExtractor={item => item.uuid.toString()}
        ListEmptyComponent={
          !keyword ? (
            <View />
          ) : (
            <EmptyResult
              reason="검색 결과가 없어요."
              solution="올바른 닉네임을 검색해보세요."
            />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  friendContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    zIndex: 1,
    borderBottomWidth: 0.5,
    borderColor: '#EFEFEF',
  },
  friendWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  friendProfile: {
    width: 34,
    height: 34,
    borderRadius: 34,
  },
  friendSelectProfile: {
    width: 48,
    height: 48,
    borderRadius: 30,
  },
  friendEmptyProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  firendSelectContainer: {
    marginHorizontal: 8,
  },
  firendSelectWrapper: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  radioContainer: {
    width: 14,
    height: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#AAA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#ED423F',
    backgroundColor: '#ED423F',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default AppointmentFriend;
