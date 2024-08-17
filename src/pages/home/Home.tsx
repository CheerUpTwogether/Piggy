import React from 'react';
import {View} from 'react-native';
import {commonStyle} from '@/styles/common';
import Button from '@/components/common/Button';
import FriendsSvg from '@/assets/icons/addFriend.svg';
import {ScrollView} from 'react-native-gesture-handler';

const Home = () => {
  return (
    <ScrollView style={commonStyle.container}>
      <Button text={'hello'} onPress={() => {}} />
      <Button text={'hello'} onPress={() => {}} theme="sub" />
      <Button text={'hello'} onPress={() => {}} theme="outline" />
      <Button
        text={'hello'}
        onPress={() => {}}
        theme="primary"
        disable={true}
      />
      <Button
        text={'hello'}
        onPress={() => {}}
        theme="outline"
        disable={true}
      />
      <Button text={'hello'} onPress={() => {}} size="lg" />

      <Button text={'hello'} onPress={() => {}} size="lg" theme="sub" />
      <Button text={'hello'} onPress={() => {}} size="lg" theme="outline" />
      <Button
        text={'친구 추가'}
        onPress={() => {}}
        size="md"
        icon={<FriendsSvg color={'#fff'} width={18} height={18} />}
      />
      <Button
        text={'친구 추가'}
        onPress={() => {}}
        theme="sub"
        size="md"
        icon={<FriendsSvg color={'#777'} width={18} height={18} />}
      />
      <Button
        text={'친구 추가'}
        onPress={() => {}}
        theme="outline"
        size="md"
        icon={<FriendsSvg color={'#ED423F'} width={18} height={18} />}
      />
      <View>
        <Button
          text={'친구 추가'}
          onPress={() => {}}
          theme="sub"
          size="md"
          icon={<FriendsSvg color={'#777'} width={18} height={18} />}
        />
        <Button
          text={'친구 추가'}
          onPress={() => {}}
          theme="outline"
          size="md"
          icon={<FriendsSvg color={'#ED423F'} width={18} height={18} />}
        />
        <Button
          text={'친구 추가'}
          onPress={() => {}}
          theme="outline"
          size="sm"
        />
        <Button text={'친구 추가'} onPress={() => {}} size="sm" />
        <Button text={'친구 추가'} onPress={() => {}} theme="sub" size="sm" />
      </View>
    </ScrollView>
  );
};

export default Home;
