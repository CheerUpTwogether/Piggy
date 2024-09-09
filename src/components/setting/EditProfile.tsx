import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '@/types/Router';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {commonStyle} from '@/styles/common';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {deleteItemSession} from '@/utils/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_IOS_API_KEY, GOOGLE_WEB_API_KEY} from '@env';
import {initFcmTokenSpb} from '@/supabase/auth';
import {useToastStore, useUserStore} from '@/store/store';
import {
  deleteProfileSpb,
  setMyProfileImageSpb,
  setMyProfileNicknameSpb,
} from '@/supabase/SettingSpb';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../common/Button';
import InputBox from '../common/InputBox';
import NickNameSvg from '@/assets/icons/nickname.svg';
import CameraSvg from '@/assets/icons/camera.svg';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';

const EditProfile = () => {
  const [nickNameValue, setNickNameValue] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {userData, setUserDataByKey} = useUserStore();
  const addToast = useToastStore(state => state.addToast);

  useEffect(() => {
    setNickNameValue(userData.nickname);
  }, []);

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
    await initFcmTokenSpb(userData.id);
    navigation.replace('Login');
  };

  // 프로필 이미지 선택
  const selectImage = async () => {
    const file = await ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
    });
    updateImage(file);
  };

  // 프로필 이미지 업데이트
  const updateImage = async file => {
    try {
      const image = {
        uri: file.path,
        type: file.mime,
        name: `${file.modificationDate}${file.path.slice(-4)}`,
      };
      const profileimagepath = await setMyProfileImageSpb(userData, image);

      if (profileimagepath) {
        setUserDataByKey('profile_img_url', profileimagepath?.profile_img_url);
      }

      addToast({
        success: true,
        text: '프로필 사진을 변경했어요',
      });
    } catch {
      addToast({
        success: false,
        text: '프로필 사진 변경에 실패했어요',
      });
    }
  };

  // 닉네임 변경
  const changeNickname = async () => {
    try {
      const {error} = await setMyProfileNicknameSpb(userData.id, nickNameValue);
      if (error) {
        if (error.code === '23505') {
          addToast({
            success: false,
            text: '이미 등록되어 있는 닉네임이에요',
          });
        } else {
          addToast({
            success: false,
            text: '닉네임 변경에 실패했어요',
          });
        }

        return;
      }

      addToast({
        success: true,
        text: '닉네임을 변경했어요',
      });
      setUserDataByKey('nickname', nickNameValue);
    } catch (e) {
      addToast({
        success: false,
        text: '네트워크를 확인해주세요',
      });
    }
  };

  // 기본 이미지로 선택
  const resetImage = async () => {
    try {
      const res = await deleteProfileSpb(userData);
      if (res) {
        addToast({
          success: true,
          text: '프로필 사진을 변경했어요',
        });
        setUserDataByKey('profile_img_url', '');
      }
    } catch {
      addToast({
        success: false,
        text: '프로필 사진 변경에 실패했어요',
      });
    }
  };

  return (
    <ScrollView style={[commonStyle.CONTAINER, {flex: 1}]}>
      <View>
        <View style={{alignItems: 'center', marginVertical: 48}}>
          <TouchableOpacity
            onPress={selectImage}
            activeOpacity={0.8}
            style={styles.profileImgContainer}>
            {userData.profile_img_url ? (
              <Image
                source={{uri: userData.profile_img_url}}
                style={styles.profileImg}
                alt="profileImage"
              />
            ) : (
              <View style={[styles.profileImg, styles.profileEmptyImg]}>
                <BasicProfileSvg width={60} />
              </View>
            )}
            <View style={styles.cameraContainer}>
              <CameraSvg />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{textDecorationLine: 'underline'}}
              onPress={resetImage}>
              기본이미지로 변경
            </Text>
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
            msg={
              nickNameValue.length > 8
                ? '*닉네임은 8글자까지 설정할 수 있습니다'
                : ''
            }
          />
        </View>
      </View>
      <View style={{flex: 1, gap: 8, justifyContent: 'flex-end'}}>
        <Button text="저장" onPress={changeNickname} />
        <Button text="로그 아웃" theme="sub" onPress={() => handleLogout()} />
        <TouchableOpacity>
          <Text style={{...commonStyle.REGULAR_AA_14, textAlign: 'center'}}>
            회원탈퇴
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  profileEmptyImg: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditProfile;
