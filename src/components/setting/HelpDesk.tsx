import React, {useState} from 'react';

import {
  Image,
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
import {setInquirySpb} from '@/supabase/SettingSpb';
import {useToastStore} from '@/store/store';

import InputBox from '../common/InputBox';
import NickNameSvg from '@/assets/icons/nickname.svg';
import EditSvg from '@/assets/icons/edit.svg';
import PlusSvg from '@/assets/icons/X.svg';
import Button from '../common/Button';

const HelpDesk = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [imageList, setImageList] = useState(['https://i.pravatar.cc/250']);
  const addToast = useToastStore(state => state.addToast);

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

  const handleAddInquiry = async () => {
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
    const res = await setInquirySpb(
      // TODO: uid 전역에서 호출
      '7b4a9f58-028f-40cb-9600-7dbf8f3744b3',
      subject,
      content,
      email,
    );

    console.log('res data ====> ', res);

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

  return (
    <View style={commonStyle.CONTAINER}>
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
                onPress={() =>
                  setImageList([...imageList, 'https://i.pravatar.cc/250'])
                }>
                <PlusSvg width={24} height={24} rotation={45} />
              </TouchableOpacity>
            )}
            {imageList.map(item => (
              <Image
                source={{uri: item}}
                style={styles.itemContainer}
                alt="helpDeskImage"
              />
            ))}
          </View>
        </View>
        <View style={{marginVertical: 50}}>
          <Button text="보내기" onPress={handleAddInquiry} />
        </View>
      </View>
    </View>
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
});

export default HelpDesk;
