import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {Search} from '@/mock/Place/type';
import useAppointmentPlace from '@/hooks/useAppointmentPlace';
import SearchPlaceItem from './SearchPlaceItem';
import PlaceItem from './PlaceItem';
import InputBox from '../common/InputBox';
import EmptyResult from '../common/EmptyResult';
import PlaceSvg from '@/assets/icons/location.svg';

const {height: screenHeight} = Dimensions.get('screen');

const AppointmentPlace = () => {
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
    location,
  } = useAppointmentPlace();

  const reason = isStartSearch
    ? '검색 결과가 없어요 😂'
    : '어디서 만나시겠어요?';
  const solution = isStartSearch
    ? '옳바른 장소 또는 주소를 입력해주세요!'
    : '원하시는 장소 또는 주소를 입력해주세요!';

  const height = keywordHistories.length
    ? {height: screenHeight * 0.28 + 45 * (5 - keywordHistories.length)}
    : {height: screenHeight * 0.56};

  return (
    <View>
      {/* 검색어 입력 창 */}
      <InputBox
        value={keyword}
        setValue={setKeyword}
        onSubmitEditing={handleSubmitEditing}
        placeholder="약속 장소를 입력해주세요."
        icon={PlaceSvg}
        label="장소"
        style={{marginBottom: 18, gap: 8}}
      />

      {/* 이전 검색 키워드 리스트 */}
      {isShow && (
        <View style={{marginHorizontal: -16}}>
          <FlatList
            data={keywordHistories}
            renderItem={({item}: {item: Search}) => (
              <SearchPlaceItem item={item} searchPlace={searchPlace} />
            )}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {/* 슬라이더 */}
      <View style={styles.hr} />

      {/* 검색 결과 */}
      <FlatList
        data={places}
        renderItem={({item}) => (
          <PlaceItem
            item={item}
            location={location}
            selectPlace={selectPlace}
            handlePlacePress={handlePlacePress}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyResult reason={reason} solution={solution} />}
        style={height}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hr: {marginHorizontal: -16, height: 5, backgroundColor: '#EFEFEF'},
});

export default AppointmentPlace;
