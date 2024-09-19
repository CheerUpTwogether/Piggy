import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/types/Router';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {commonStyle} from '@/styles/common';
import {deleteItemSession} from '@/utils/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {initFcmTokenSpb} from '@/supabase/auth';
import {GOOGLE_IOS_API_KEY, GOOGLE_WEB_API_KEY} from '@env';
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
  const [profileValue, setProfileValue] = useState('');
  const [tempProfileValue, setTempProfileValue] = useState('');
  const [isImageReset, setIsImageReset] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {userData, setUserDataByKey} = useUserStore();
  const addToast = useToastStore(state => state.addToast);

  useEffect(() => {
    setNickNameValue(userData.nickname);
    setProfileValue(userData.profile_img_url);
    setTempProfileValue(userData.profile_img_url);

    return () => {
      setNickNameValue(userData.nickname);
      setTempProfileValue(userData.profile_img_url);
    };
  }, [userData]);

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

  // 프로필 이미지 선택 (로컬 상태)
  const selectImage = async () => {
    try {
      const file = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: false,
      });
      const tempImage = {
        uri: file.path,
        type: file.mime,
        name: `${file.modificationDate}${file.path.slice(-4)}`,
      };
      setTempProfileValue(tempImage.uri);
      setIsImageReset(false);
    } catch (error) {
      if (error.message === 'User cancelled image selection') {
        console.log('이미지 선택이 취소되었습니다.');
      } else {
        console.error('이미지 선택 중 에러 발생:', error);
      }
    }
  };

  // 기본 이미지로 변경 (로컬 상태)
  const resetImage = () => {
    setTempProfileValue('');
    setIsImageReset(true);
  };

  // 닉네임 변경 저장 (API 호출)
  const changeNickname = async (): Promise<boolean> => {
    try {
      const {error} = await setMyProfileNicknameSpb(userData.id, nickNameValue);
      if (error) {
        // 중복된 닉네임일 경우
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
        return false;
      }

      setUserDataByKey('nickname', nickNameValue);
      return true;
    } catch (e) {
      addToast({
        success: false,
        text: '네트워크를 확인해주세요',
      });
      return false;
    }
  };

  // 프로필 이미지 저장 (API 호출)
  const saveProfileImage = async (): Promise<boolean> => {
    try {
      if (isImageReset) {
        // 기본 이미지로 변경
        await deleteProfileSpb(userData);
        setUserDataByKey('profile_img_url', '');
      } else if (tempProfileValue && tempProfileValue !== profileValue) {
        // 이미지 변경
        const image = {
          uri: tempProfileValue,
          type: 'image/jpeg',
          name: `${Date.now()}.jpg`,
        };
        const profileimagepath = await setMyProfileImageSpb(userData, image);
        setUserDataByKey('profile_img_url', profileimagepath?.profile_img_url);
      }
      return true;
    } catch {
      addToast({
        success: false,
        text: '프로필 사진 변경에 실패했어요',
      });
      return false;
    }
  };

  const handleSave = async () => {
    // 변경 전 상태와 비교
    const isNicknameChanged = nickNameValue !== userData.nickname;
    const isProfileImageChanged =
      tempProfileValue !== profileValue || isImageReset;

    // 변경이 없을 경우
    if (!isNicknameChanged && !isProfileImageChanged) {
      navigation.goBack();
      return;
    }

    // 닉네임 변경 || 프로필 이미지 변경이 있을 경우에만 저장 실행
    const nicknameResult = isNicknameChanged ? await changeNickname() : true;
    const imageResult = isProfileImageChanged ? await saveProfileImage() : true;

    if (nicknameResult && imageResult) {
      addToast({
        success: true,
        text: '프로필 정보가 저장되었습니다.',
      });
      navigation.goBack();
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
            {tempProfileValue ? (
              <Image
                source={{uri: tempProfileValue}}
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
        <Button text="저장" onPress={handleSave} />
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
