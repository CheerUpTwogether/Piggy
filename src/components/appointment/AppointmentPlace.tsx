import React from 'react';
import uuid from 'react-native-uuid';
import {commonStyle} from '@/styles/common';

import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputBox from '../common/InputBox';
import {Search} from '@/mock/Place/type';

import SearchSvg from '@/assets/icons/search.svg';
import PlaceSvg from '@/assets/icons/location.svg';
import LocationRoad from '@/assets/icons/locationRoad.svg';
import {useLocation} from '@/hooks/useLocation';
import {SearchKeywordPlace} from '@/types/Common';
import EmptyResult from '../common/EmptyResult';
import {calculateDistance} from '@/utils/distance';
import useAppointmentPlace from '@/hooks/useAppointmentPlace';

const {height: screenHeight} = Dimensions.get('screen');

const AppointmentPlace = () => {
  const {location} = useLocation(); // 커스텀 훅 호출
  const {
    keyword,
    setKeyword,
    keywordHistories,
    isShow,
    isStartSearch,
    places,
    handlePlacePress,
    selectPlace,
    handleSubmitEditing,
    searchPlace,
  } = useAppointmentPlace(location || {latitude: 0, longitude: 0});

  const renderSearchItem = ({item}: {item: Search}) => (
    <TouchableOpacity
      style={styles.searchContainer}
      onPress={() => searchPlace(item.content)}>
      <View style={styles.searchWrapper}>
        <SearchSvg width={18} height={18} color={'#333'} />
        <Text style={commonStyle.REGULAR_33_16}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPlaceItem = ({item}: {item: SearchKeywordPlace}) => {
    const isSelected = item.id === selectPlace.id;

    return (
      <TouchableOpacity
        style={styles.placeContainer}
        onPress={() => handlePlacePress(item)}>
        <LocationRoad
          width={18}
          height={18}
          color={isSelected ? '#ED423F' : '#333'}
        />
        <View style={styles.placeWrapper}>
          <Text
            style={[
              commonStyle.MEDIUM_33_16,
              isSelected && {color: '#ED423F'},
            ]}>
            {item.place_name ? item.place_name : item.address_name}
          </Text>
          <Text style={commonStyle.REGULAR_77_12}>
            {item.place_name ? item.address_name : item.road_address_name}
          </Text>
        </View>
        <Text style={styles.distanceText}>
          {item.distance
            ? (Number(item.distance) * 0.001).toFixed(1)
            : calculateDistance(
                Number(item.y),
                Number(item.x),
                Number(location?.latitude),
                Number(location?.longitude),
              )}
          km
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={{marginBottom: 18, gap: 8}}>
        <Text style={commonStyle.MEDIUM_33_16}>장소</Text>
        <InputBox
          value={keyword}
          setValue={setKeyword}
          onSubmitEditing={handleSubmitEditing}
          placeholder="약속 장소를 입력해주세요."
          icon={PlaceSvg}
        />
      </View>

      {isShow && (
        <View style={{marginHorizontal: -16}}>
          <FlatList
            data={keywordHistories}
            renderItem={renderSearchItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      <View
        style={{marginHorizontal: -16, height: 5, backgroundColor: '#EFEFEF'}}
      />
      <View
        style={
          keywordHistories.length
            ? {height: screenHeight * 0.28 + 45 * (5 - keywordHistories.length)}
            : {height: screenHeight * 0.56}
        }>
        <FlatList
          data={places}
          renderItem={renderPlaceItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyResult
              reason={
                isStartSearch ? '검색 결과가 없어요 😂' : '어디서 만나시겠어요?'
              }
              solution={
                isStartSearch
                  ? '옳바른 장소 또는 주소를 입력해주세요!'
                  : '원하시는 장소 또는 주소를 입력해주세요!'
              }
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    marginHorizontal: 16,
  },
  placeContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 18,
  },
  placeWrapper: {
    width: '80%',
    gap: 1,
  },
  distanceText: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    ...commonStyle.REGULAR_77_12,
  },
});

export default AppointmentPlace;
