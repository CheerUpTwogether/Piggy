import {commonStyle} from '@/styles/common';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {dummyGoodsStorageItem} from '@/mock/GoodsStorage/types';
import {dummyGoodsStorageItemData} from '@/mock/GoodsStorage/GoodsStorage';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const GoodsStorage = () => {
  const navigation = useNavigation();

  const gotoDetail = (item: dummyGoodsStorageItem) => {
    navigation.replace('GoodsStorageDetail', {...item});
  };

  const Header = () => (
    <View style={styles.headerContainer}>
      <Text style={commonStyle.MEDIUM_33_16}>
        총{' '}
        <Text style={commonStyle.BOLD_33_18}>
          {dummyGoodsStorageItemData.length}
        </Text>
        개의 기프티콘을 가지고 있어요!
      </Text>
    </View>
  );

  const renderStorageItem = ({item}: {item: dummyGoodsStorageItem}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{marginVertical: 9, marginRight: 16, gap: 10}}
      onPress={() => {
        gotoDetail(item);
      }}>
      <View style={styles.expireDateWrapper}>
        <Text style={commonStyle.MEDIUM_FF_12}>D-29</Text>
      </View>
      <Image source={{uri: item.goods_url}} style={styles.itemImg} />
      <View style={{marginHorizontal: 10, gap: 2, width: screenWidth / 2 - 48}}>
        <Text style={commonStyle.MEDIUM_SUB_12} numberOfLines={1}>
          {item.provider}
        </Text>
        <Text style={commonStyle.MEDIUM_33_14} numberOfLines={1}>
          {item.title}원
        </Text>
        <Text style={commonStyle.MEDIUM_77_12} numberOfLines={1}>
          {item.createDate}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={{marginHorizontal: 16}}>
        <FlatList
          data={dummyGoodsStorageItemData}
          bounces={false}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={renderStorageItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={Header}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: 150,
    marginVertical: 18,
  },
  expireDateWrapper: {
    width: 44,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#ED423F',
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',

    top: 10,
    right: 10,
  },
  itemImg: {
    width: (screenWidth - 48) / 2,
    height: 156,
    borderRadius: 4,
    borderColor: '#DDD',
  },
});

export default GoodsStorage;
