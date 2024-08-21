import {commonStyle} from '@/styles/common';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import InputBox from '../common/InputBox';
import {useState} from 'react';
import NickNameSvg from '@/assets/icons/nickname.svg';
import EditSvg from '@/assets/icons/edit.svg';

import PlusSvg from '@/assets/icons/X.svg';
import Button from '../common/Button';

const HelpDesk = () => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageList, setImageList] = useState(['https://i.pravatar.cc/250']);

  const [isEmailError, setIsEmailError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isContentError, setIsContentError] = useState(false);
  const [isImageError, setIsImageError] = useState(true);

  return (
    <View style={commonStyle.CONTAINER}>
      <View style={{marginVertical: 14, gap: 20}}>
        <View style={{gap: 8}}>
          <Text style={commonStyle.MEDIUM_33_16}>이메일</Text>

          <InputBox
            value={email}
            setValue={setEmail}
            placeholder={'문의하실 이메일을 입력해주세요.'}
            icon={NickNameSvg}
            isLarge={true}
          />

          {isEmailError && (
            <Text style={{...commonStyle.MEDIUM_PRIMARY_12, marginLeft: 10}}>
              *옳바르지 않은 이메일입니다.
            </Text>
          )}
        </View>
        <View style={{gap: 8}}>
          <Text style={commonStyle.MEDIUM_33_16}>문의 제목</Text>

          <InputBox
            value={title}
            setValue={setTitle}
            placeholder={'문의하실 제목을 입력해주세요.'}
            icon={EditSvg}
            isLarge={true}
          />

          {isTitleError && (
            <Text style={{...commonStyle.MEDIUM_PRIMARY_12, marginLeft: 10}}>
              *최소 5자 이상의 문의 제목이 필요합니다.
            </Text>
          )}
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
          {isContentError && (
            <Text style={{...commonStyle.MEDIUM_PRIMARY_12, marginLeft: 10}}>
              * 최소 10자 이상의 내용이 필요합니다.
            </Text>
          )}
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
              <Image source={{uri: item}} style={styles.itemContainer} />
            ))}
          </View>
          {isImageError && (
            <Text style={{...commonStyle.MEDIUM_PRIMARY_12, marginLeft: 10}}>
              *사진은 3장까지 추가할 수 있습니다.
            </Text>
          )}
        </View>
        <View style={{marginVertical: 50}}>
          <Button text="보내기" onPress={() => console.log('보내기')} />
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
