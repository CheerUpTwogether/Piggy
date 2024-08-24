import useDebounce from '@/hooks/useDebounce';
import uuid from 'react-native-uuid';
import {commonStyle} from '@/styles/common';
import {useEffect, useState} from 'react';
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
import {searchAddress, searchLocation} from '@/api/kakao/map';
import {useLocation} from '@/hooks/useLocation';
import {SearchAddressPlace, SearchKeywordPlace} from '@/types/Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyResult from '../common/EmptyResult';
import {calculateDistance} from '@/utils/distance';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const AppointmentPlace = () => {
  const {location, error} = useLocation(); // 커스텀 훅 호출
  const [recentKeyword, setRecnetKeyword] = useState<Search[]>([]);
  const [keyword, setKeyword] = useState('');
  const [isStartSearch, setIsStartSearch] = useState(false); // 검색 서치 한번이라이도 했을때 변경
  const [searchPlace, setSearchPlace] = useState<SearchKeywordPlace[]>([]);
  const [selectPlace, setSelectPlace] = useState<SearchKeywordPlace>({
    id: '',
    place_name: '',
    address_name: '',
    road_address_name: '',
    x: '',
    y: '',
    distance: '',
    phone: '',
    place_url: '',
    category_group_code: '',
    category_group_name: '',
    category_name: '',
  });

  const debouncedKeyword = useDebounce(keyword, 100);

  const sortedSearchData = debouncedKeyword
    ? recentKeyword
        .filter(search =>
          search.content.toLowerCase().includes(keyword.toLowerCase()),
        )
        .sort((a, b) => {
          const nameA = a.content.toLowerCase();
          const nameB = b.content.toLowerCase();
          return nameA.localeCompare(nameB, 'ko');
        })
    : [];
  const [isShow, setIsShow] = useState(false);

  // 최근 키워드 불러오기 함수
  const getRecentKeyword = async () => {
    const res = await AsyncStorage.getItem('recentKeyword');
    if (res) {
      const parseRecentKeyword = JSON.parse(res);
      setRecnetKeyword(parseRecentKeyword);
    }
  };

  useEffect(() => {
    getRecentKeyword();

    if (sortedSearchData.length > 0) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [debouncedKeyword]);

  const handleSubmitEditing = async () => {
    // 빈 문자 입력 제한
    if (keyword.trim()) {
      // 입력된 키워드 검색
      await handleSearchPress(keyword);
      // 검색어 로컬 스토리지에 저장
      await handleSaveSearchKeyword();
    }
  };

  const handleSaveSearchKeyword = async () => {
    const prev = await AsyncStorage.getItem('recentKeyword');
    if (prev === null) {
      await AsyncStorage.setItem(
        'recentKeyword',
        JSON.stringify([{id: uuid.v4(), content: keyword}]),
      );
      return;
    }

    const parsePrev = JSON.parse(prev);

    if (parsePrev.some((item: Search) => item.content === keyword)) {
      return;
    }

    // 검색어가 5개 이상일 때, 가장 오래된 검색어 제거 (FIFO 방식)
    if (parsePrev.length >= 5) {
      parsePrev.shift(); // 첫 번째 검색어(가장 오래된 것)를 제거
    }

    await AsyncStorage.setItem(
      'recentKeyword',
      JSON.stringify([...parsePrev, {id: uuid.v4(), content: keyword}]),
    );
  };

  const handleSearchPress = async (keyword: string) => {
    setKeyword('');
    setIsShow(false);
    setIsStartSearch(true);
    if (!location) {
      console.log('위치정보 없음');
      return;
    }

    const keywordData: SearchKeywordPlace[] = await searchLocation(
      keyword,
      location.latitude,
      location.longitude,
    );

    if (keywordData.length > 0) {
      setSearchPlace(keywordData);
      return;
    } else {
      const addressData: SearchAddressPlace[] = await searchAddress(keyword);

      if (addressData.length > 0) {
        const parseData = addressData.map(item => ({
          id: uuid.v4,
          address_name: item.address.address_name,
          road_address_name: item.road_address.address_name,
          x: item.address.x,
          y: item.address.y,
        }));
        console.log(parseData);
        setSearchPlace(parseData);
        return;
      }
    }
  };

  const handlePlacePress = (item: SearchKeywordPlace) => {
    setSelectPlace(item);
  };

  const renderSearchItem = ({item}: {item: Search}) => (
    <TouchableOpacity
      style={styles.searchContainer}
      onPress={() => handleSearchPress(item.content)}>
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
                Number(location.latitude),
                Number(location.longitude),
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
            data={sortedSearchData}
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
          sortedSearchData.length
            ? {height: screenHeight * 0.28 + 45 * (5 - sortedSearchData.length)}
            : {height: screenHeight * 0.56}
        }>
        <FlatList
          data={searchPlace}
          renderItem={renderPlaceItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !isStartSearch ? (
              <EmptyResult
                reason="어디서 만나시겠어요?"
                solution="원하시는 장소 또는 주소를 입력해주세요!"
              />
            ) : (
              <EmptyResult
                reason="검색 결과가 없어요 😂"
                solution="옳바른 장소 또는 주소를 입력해주세요!"
              />
            )
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
