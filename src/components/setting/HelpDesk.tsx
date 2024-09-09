import React, {useState} from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/Router';
import {commonStyle} from '@/styles/common';
import {setInquiryImages, setInquirySpb} from '@/supabase/SettingSpb';
import {useToastStore, useUserStore} from '@/store/store';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';

import InputBox from '../common/InputBox';
import NickNameSvg from '@/assets/icons/nickname.svg';
import EditSvg from '@/assets/icons/edit.svg';
import PlusSvg from '@/assets/icons/X.svg';
import Button from '../common/Button';

const HelpDesk = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [imageList, setImageList] = useState<
    {
      uri: string;
      type: string;
      name: string;
    }[]
  >([]);

  const addToast = useToastStore(state => state.addToast);
  const userData = useUserStore(state => state.userData);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const validateInput = (
    value: string,
    fieldName: string,
    errorMessage: string,
    validationFn?: (value: string) => boolean,
  ) => {
    if (!value) {
      addToast({
        success: false,
        text: `${fieldName} 입력`,
        multiText: `${errorMessage} 입력해주세요.`,
      });
      return false;
    }

    if (validationFn && !validationFn(value)) {
      addToast({
        success: false,
        text: `${fieldName} 형식 오류`,
        multiText: `${errorMessage} 올바르게 입력해주세요.`,
      });
      return false;
    }

    return true;
  };

  const checkValid = async () => {
    const validateEmail = (emailAddress: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
    const validateSubject = (subjectText: string) => subjectText.length >= 5;
    const validateContent = (contentText: string) => contentText.length >= 10;

    if (!validateInput(email, '이메일', '올바른 이메일을', validateEmail)) {
      return;
    }
    if (!validateInput(subject, '제목', '문의 제목을', validateSubject)) {
      return;
    }
    if (
      !validateInput(
        content,
        '내용',
        '최소 10자 이상의 내용을',
        validateContent,
      )
    ) {
      return;
    }

    addImages();
  };

  // 이미지 선택
  const selectImage = async () => {
    const images = [...imageList];
    const res = await ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      maxFiles: 3 - imageList.length,
    });

    res.forEach(el => {
      images.push({
        uri: el.path,
        type: el.mime,
        name: `${uuid.v4()}`,
      });
    });

    setImageList(images);
  };

  // 이미지 생성
  const addImages = async () => {
    try {
      const list: string[] = [];
      for (const image of imageList) {
        const result = await setInquiryImages(image);
        if (result?.data?.publicUrl) {
          list.push(result?.data?.publicUrl);
        }
      }

      addInquiry(list);
    } catch {
      addToast({
        success: true,
        text: '네트워크를',
        multiText: '확인해주세요.',
      });
      return;
    }
  };

  // 문의 생성
  const addInquiry = async (imageUrlList: string[]) => {
    const res = await setInquirySpb(
      userData.id,
      subject,
      content,
      email,
      imageUrlList,
    );

    if (res) {
      addToast({
        success: true,
        text: '문의 전송 완료',
        multiText: '문의가 성공적으로 전송되었습니다.',
      });
      navigation.navigate('HelpHistory');
    } else {
      addToast({
        success: false,
        text: '전송 실패',
        multiText: '문의 전송에 실패했습니다. 다시 시도해주세요.',
      });
    }
  };

  const deleteImage = uri => {
    setImageList(prev => prev.filter(el => el.uri !== uri));
  };

  return (
    <ScrollView style={commonStyle.CONTAINER}>
      <View style={{marginVertical: 14, gap: 20}}>
        <View style={{gap: 8}}>
          <Text style={commonStyle.MEDIUM_33_16}>이메일</Text>

          <InputBox
            value={email}
            setValue={setEmail}
            placeholder={'문의자의 이메일을 입력해주세요.'}
            icon={NickNameSvg}
            isLarge={true}
          />
        </View>
        <View style={{gap: 8}}>
          <Text style={commonStyle.MEDIUM_33_16}>문의 제목</Text>

          <InputBox
            value={subject}
            setValue={setSubject}
            placeholder={'문의하실 제목을 입력해주세요.'}
            icon={EditSvg}
            isLarge={true}
          />
        </View>
        <View style={{marginVertical: 8, gap: 8}}>
          <Text style={commonStyle.MEDIUM_33_16}>문의 내용</Text>

          <TextInput
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            importantForAutofill="no"
            placeholderTextColor="#AAA"
            placeholder={'문의하실 제목을 입력해주세요.'}
            value={content}
            onChangeText={setContent}
            style={styles.contentContainer}
            multiline={true}
          />
        </View>
      </View>
      <View style={{marginVertical: 8, gap: 14}}>
        <View style={{gap: 8}}>
          <View style={{flexDirection: 'row', gap: 12}}>
            {imageList.length < 3 && (
              <TouchableOpacity
                style={styles.imgAddContainer}
                onPress={selectImage}>
                <PlusSvg width={24} height={24} rotation={45} color="#777" />
              </TouchableOpacity>
            )}
            {imageList.map(item => (
              <TouchableOpacity
                key={item.name}
                onPress={() => deleteImage(item.uri)}>
                {item.uri && (
                  <Image
                    source={{uri: item.uri}}
                    style={styles.itemContainer}
                    alt="helpDeskImage"
                  />
                )}
                <View style={styles.deleteBtn}>
                  <PlusSvg width={12} height={12} color="#333" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{marginVertical: 50}}>
          <Button text="보내기" onPress={checkValid} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: 162,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#AAA',
    textAlignVertical: 'top',
  },
  imgAddContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#AAA',
  },
  itemContainer: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#AAA',
  },
  deleteBtn: {
    backgroundColor: '#ddd',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    position: 'absolute',
    right: -4,
    top: -4,
  },
});

export default HelpDesk;
