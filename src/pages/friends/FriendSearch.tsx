import React, {useState} from 'react';
import {Text, View} from 'react-native';
// import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {commonStyle} from '@/styles/common';
import InputBox from '@/components/common/InputBox';

import SearchFriendSvg from '@/assets/icons/searchFriend.svg';

const FriendSearch = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <View style={commonStyle.CONTAINER}>
      <InputBox
        value={keyword}
        setValue={setKeyword}
        placeholder="친구를 검색해보세요."
        icon={SearchFriendSvg}
        isLarge={false}
        goBack={true}
      />
    </View>
  );
};

export default FriendSearch;
