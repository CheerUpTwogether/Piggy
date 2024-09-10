import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/types/Router';
import {commonStyle} from '@/styles/common';
import ButtonBottomSheet from '../common/ButtonBottomSheet';
import EmptyResult from '../common/EmptyResult';
import {useToastStore, useModalStore, useUserStore} from '@/store/store';
import {getMyInquirysSpb, deleteInquirySpb} from '@/supabase/SettingSpb';
import {Inquiry} from '@/types/setting';

import PulsSvg from '@/assets/icons/plus.svg';
import MoreSvg from '@/assets/icons/more.svg';

const HelpHistory = () => {
  const [moreShow, setMoreShow] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inquiryList, setInquiryList] = useState<Inquiry[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const addToast = useToastStore(state => state.addToast);
  const {openModal, closeModal} = useModalStore();
  const userData = useUserStore(state => state.userData);

  // 화면이 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    useCallback(() => {
      fetchInquirys();
    }, []),
  );

  // 문의 리스트 조회
  const fetchInquirys = async () => {
    if (userData.id) {
      const res = await getMyInquirysSpb(userData.id);

      if (res) {
        const sortedList = res.sort(
          (a, b) =>
            new Date(b.inquiry_date).getTime() -
            new Date(a.inquiry_date).getTime(),
        );
        setInquiryList(sortedList);
      } else {
        addToast({
          success: false,
          text: '문의 내역을 불러오지 못했습니다.',
        });
      }
    }
  };

  // 문의 내역 삭제
  const removeInquiry = async () => {
    if (selectedId) {
      const res = await deleteInquirySpb(selectedId);
      if (!res) {
        addToast({
          success: false,
          text: '문의 내역 삭제 실패',
          multiText: '다시 시도해주세요.',
        });
        return;
      }
      addToast({
        success: true,
        text: '삭제 완료',
        multiText: '문의 내역이 성공적으로 삭제되었습니다.',
      });
      fetchInquirys();
      closeModal();
    } else {
      addToast({
        success: false,
        text: '삭제할 항목이 없습니다.',
      });
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
    if (selectedId) {
      setMoreShow(false);
      openModal({
        title: '문의 내역을 정말 삭제하시겠습니까?',
        content: '삭제할 경우 다시 확인할 수 없습니다.',
        text: '삭제하기',
        onPress: () => removeInquiry(),
        textCancel: '취소',
      });
    }
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
      <ScrollView style={[commonStyle.CONTAINER, {paddingVertical: 0}]}>
        {inquiryList && inquiryList.length > 0 ? (
          inquiryList.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              style={styles.itemWrapper}
              onPress={() =>
                navigation.navigate('HelpDetail', {id: String(item.id)})
              }>
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
