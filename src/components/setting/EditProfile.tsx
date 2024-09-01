import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '@/types/Router';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {commonStyle} from '@/styles/common';
import Button from '../common/Button';
import InputBox from '../common/InputBox';
import NickNameSvg from '@/assets/icons/nickname.svg';
import CameraSvg from '@/assets/icons/camera.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {deleteItemSession} from '@/utils/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_IOS_API_KEY, GOOGLE_WEB_API_KEY} from '@env';

const EditProfile = () => {
  const [nickNameValue, setNickNameValue] = useState('');
  const [iserror, setIsError] = useState(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'EditProfile'>>();
  const {nick_name, profile_image_path} = route.params;

  const googleLogOut = async () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: GOOGLE_WEB_API_KEY,
      iosClientId: GOOGLE_IOS_API_KEY,
    });
    await GoogleSignin.signOut();
  };

  const handleLogout = async () => {
    await deleteItemSession();
    await googleLogOut();
    navigation.replace('Login');
  };

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
        <Button text="로그 아웃" theme="sub" onPress={() => handleLogout()} />
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
