import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/types/Router';
import {commonStyle} from '@/styles/common';
import ButtonBottomSheet from '../common/ButtonBottomSheet';
import EmptyResult from '../common/EmptyResult';
import {getMyInquirysSpb} from '@/supabase/SettingSpb';

import PulsSvg from '@/assets/icons/plus.svg';
import MoreSvg from '@/assets/icons/more.svg';

interface Inquiry {
  id: number;
  subject: string;
  contents: string;
  email: string;
  inquiry_date: string;
  response: string | null;
  response_date: string | null;
}

const HelpHistory = () => {
  const [moreShow, setMoreShow] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inquiryList, setInquiryList] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetchInquirys();
    console.log(inquiryList);
  }, []);

  // 문의 리스트 조회
  const fetchInquirys = async () => {
    // TODO: uid 전역에서 가져와서 넣어주기
    const res = await getMyInquirysSpb('7b4a9f58-028f-40cb-9600-7dbf8f3744b3');
    if (res) {
      setInquiryList(res);
    }
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const gotoDetail = () => {
    if (selectedId) {
      navigation.navigate('HelpDetail', {id: selectedId});
    }
  };
  const gotoDesk = () => {
    navigation.navigate('HelpDesk');
  };

  const handleMorePress = (id: string) => {
    setSelectedId(id);
    setMoreShow(true);
  };

  const handleDeleteHelp = () => {
    console.log(`TODO: 삭제 API 호출`);
    setMoreShow(false);
  };

  const createButtonList = () => {
    const buttons: Array<{
      text: string;
      theme?: 'sub' | 'primary' | 'outline' | undefined;
      onPress: () => void | Promise<void>;
    }> = [
      {
        text: '삭제',
        onPress: handleDeleteHelp,
      },
    ];

    return buttons;
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={commonStyle.CONTAINER}>
        {inquiryList && inquiryList.length > 0 ? (
          inquiryList.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              style={styles.itemWrapper}
              onPress={gotoDetail}>
              <View style={styles.subjectWrapper}>
                <Text style={commonStyle.REGULAR_33_18}>
                  {item.subject
                    ? item.subject.length > 22
                      ? `${item.subject.substring(0, 20)}...`
                      : item.subject
                    : '제목이 없습니다.'}
                </Text>
                <TouchableOpacity
                  style={styles.moreButton}
                  activeOpacity={0.8}
                  onPress={() => handleMorePress(item.id.toString())}>
                  <MoreSvg width={20} height={20} color={'#555'} />
                </TouchableOpacity>
              </View>
              <Text style={commonStyle.REGULAR_33_14}>
                {item.contents && item.contents.length > 20
                  ? `${item.contents.substring(0, 28)}...`
                  : item.contents || '내용이 없습니다.'}
              </Text>
              <View style={styles.itemAnswer}>
                <Text style={commonStyle.REGULAR_77_14}>
                  {item.inquiry_date
                    ? new Date(item.inquiry_date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                    : '날짜 정보 없음'}
                </Text>
                <Text style={commonStyle.REGULAR_AA_14}>
                  {item.response ? '답변완료' : '답변 대기'}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.empty}>
            <EmptyResult
              reason="등록된 문의 내역이 없어요."
              solution="문의할 내용이 있나요?"
            />
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.plusBtn}
        onPress={gotoDesk}>
        <PulsSvg color="#ED423F" />
      </TouchableOpacity>

      <ButtonBottomSheet
        isShow={moreShow}
        setIsShow={setMoreShow}
        buttons={createButtonList()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    paddingVertical: 18,
  },
  itemAnswer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  plusBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 48,
    height: 48,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ED423F',
    backgroundColor: '#FFF',
    marginBottom: 30,
    marginRight: 10,
  },
  subjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moreButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  empty: {marginTop: 30},
});

export default HelpHistory;
