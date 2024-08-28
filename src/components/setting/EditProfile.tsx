import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '@/types/Router';
import {useRoute, RouteProp} from '@react-navigation/native';
import {commonStyle} from '@/styles/common';
import Button from '../common/Button';
import InputBox from '../common/InputBox';
import NickNameSvg from '@/assets/icons/nickname.svg';
import CameraSvg from '@/assets/icons/camera.svg';

const EditProfile = () => {
  const [nickNameValue, setNickNameValue] = useState('');
  const [iserror, setIsError] = useState(true);
  const route = useRoute<RouteProp<RootStackParamList, 'EditProfile'>>();
  const {nick_name, profile_image_path} = route.params;

  useEffect(() => {
    setNickNameValue(nick_name);
  }, []);

  return (
    <View style={commonStyle.CONTAINER}>
      <View>
        <View style={{alignItems: 'center', marginVertical: 48}}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.profileImgContainer}>
            <Image
              source={{uri: profile_image_path}}
              style={styles.profileImg}
              alt="profileImage"
            />
            <View style={styles.cameraContainer}>
              <CameraSvg />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{gap: 8}}>
          <Text style={commonStyle.MEDIUM_33_16}>닉네임</Text>

          <InputBox
            value={nickNameValue}
            setValue={setNickNameValue}
            placeholder={'수정하실 닉네임을 입력해주세요.'}
            icon={NickNameSvg}
            isLarge={true}
          />
        </View>
        {iserror && (
          <Text style={{...commonStyle.MEDIUM_PRIMARY_12, marginVertical: 8}}>
            *닉네임은 8글자까지 설정할 수 있습니다
          </Text>
        )}
      </View>
      <View style={{marginTop: 232, gap: 14, marginHorizontal: 8}}>
        <Button text="저장" onPress={() => console.log('저장')} />
        <Button
          text="로그 아웃"
          theme="sub"
          onPress={() => console.log('로그 아웃')}
        />
        <TouchableOpacity>
          <Text style={{...commonStyle.REGULAR_AA_14, textAlign: 'center'}}>
            회원탈퇴
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImgContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 120,
    marginVertical: 30,
  },
  cameraContainer: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 24,
    backgroundColor: '#333',
  },
});

export default EditProfile;
