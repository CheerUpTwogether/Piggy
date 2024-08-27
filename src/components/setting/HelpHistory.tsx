import React from 'react';
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

import PulsSvg from '@/assets/icons/plus.svg';

const HelpHistory = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const gotoDetail = (id: string) => {
    navigation.navigate('HelpDetail', {id});
  };

  const gotoDesk = () => {
    navigation.navigate('HelpDesk');
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
            <Text style={commonStyle.REGULAR_33_18}>{item.subject}</Text>
            <Text style={commonStyle.REGULAR_33_14}>
              {item.contents.length > 20
                ? `${item.contents.substring(0, 30)}...`
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
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    paddingVertical: 18,
    gap: 6,
  },
  itemAnswer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export default HelpHistory;
