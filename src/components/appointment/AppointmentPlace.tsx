import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {Search} from '@/mock/Place/type';
import useAppointmentPlace from '@/hooks/useAppointmentPlace';
import SearchPlaceItem from './SearchPlaceItem';
import PlaceItem from './PlaceItem';
import InputBox from '../common/InputBox';
import EmptyResult from '../common/EmptyResult';
import PlaceSvg from '@/assets/icons/location.svg';
import SearchSvg from '@/assets/icons/search.svg';
import {color_ef, commonStyle} from '@/styles/common';

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
    appointmentForm,
  } = useAppointmentPlace();

  const reason = isStartSearch
    ? '검색 결과가 없어요 😂'
    : '어디서 만나시겠어요?';
  const solution = isStartSearch
    ? '올바른 장소 또는 주소를 입력해주세요!'
    : '원하시는 장소 또는 주소를 입력해주세요!';

  return (
    <View style={{flex: 1}}>
      {/* 설정된 장소 */}
      <View style={styles.selectLocation}>
        <PlaceSvg
          width={16}
          height={16}
          color={
            appointmentForm.place_name || appointmentForm.address
              ? '#333'
              : '#AAA'
          }
          style={styles.searchIcon}
        />
        {appointmentForm.place_name || appointmentForm.address ? (
          <Text style={commonStyle.MEDIUM_33_16}>
            {appointmentForm.place_name || appointmentForm.address}
          </Text>
        ) : (
          <Text style={commonStyle.MEDIUM_AA_16}>
            약속 장소를 설정해주세요.
          </Text>
        )}
      </View>

      {/* 슬라이더 */}
      <View style={styles.hr} />

      {/* 검색어 입력 창 */}
      <View>
        <InputBox
          value={keyword}
          setValue={setKeyword}
          onSubmitEditing={handleSubmitEditing}
          placeholder="약속 장소를 검색해주세요."
          icon={SearchSvg}
          style={{paddingTop: 20}}
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
      </View>

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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hr: {marginHorizontal: -16, height: 5, backgroundColor: '#EFEFEF'},
  selectLocation: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 8,
  },
  dropdown: {
    borderWidth: 0,
    maxWidth: 80,
    marginTop: 8,
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    zIndex: 10,
    maxWidth: 80,
    borderColor: color_ef,
  },
});

export default AppointmentPlace;
