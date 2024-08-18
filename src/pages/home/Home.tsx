import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {commonStyle} from '@/styles/common';
import InputBox from '@/components/common/InputBox';

import NickNameIconSvg from '@/assets/icons/nickname.svg';

const Home = () => {
  const [text, setText] = useState('');

  return (
    <View style={commonStyle.container}>
      <Text>home</Text>
      <InputBox
        value={text}
        setValue={setText}
        placeholder={'친구를 검색해보세요.'}
        icon={NickNameIconSvg}
      />
    </View>
  );
};

export default Home;
