import React, {useState} from 'react';
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
import {dummy_Help_list} from '@/mock/Help/Help';
import ButtonBottomSheet from '../common/ButtonBottomSheet';

import PulsSvg from '@/assets/icons/plus.svg';
import MoreSvg from '@/assets/icons/more.svg';

const HelpHistory = () => {
  const [moreShow, setMoreShow] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const gotoDetail = (id: string) => {
    navigation.navigate('HelpDetail', {id});
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
        {dummy_Help_list.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={styles.itemWrapper}
            onPress={() => gotoDetail(item.id.toString())}>
            <View style={styles.subjectWrapper}>
              <Text style={commonStyle.REGULAR_33_18}>
                {item.subject.length > 22
                  ? `${item.subject.substring(0, 20)}...`
                  : item.subject}
              </Text>
              <TouchableOpacity
                style={styles.moreButton}
                activeOpacity={0.8}
                onPress={() => handleMorePress(item.id)}>
                <MoreSvg width={20} height={20} color={'#555'} />
              </TouchableOpacity>
            </View>
            <Text style={commonStyle.REGULAR_33_14}>
              {item.contents.length > 20
                ? `${item.contents.substring(0, 28)}...`
                : item.contents}
            </Text>

            <View style={styles.itemAnswer}>
              <Text style={commonStyle.REGULAR_77_14}>{item.date}</Text>
              <Text style={commonStyle.REGULAR_AA_14}>
                {item.response ? '답변완료' : '답변 대기'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
});

export default HelpHistory;
