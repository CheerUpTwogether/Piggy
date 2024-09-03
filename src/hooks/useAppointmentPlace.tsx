import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDebounce from './useDebounce';
import uuid from 'react-native-uuid';
import {Search} from '@/types/place';
import {SearchAddressPlace, SearchKeywordPlace} from '@/types/Common';
import {searchAddress, searchLocation} from '@/api/kakao/map';
import {useLocation} from './useLocation';
import {useAppointmentForm} from '@/store/store';

const place = {
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
};
const useAppointmentPlace = () => {
  const [keyword, setKeyword] = useState('');
  const [prevKeyword, setPrevKeyword] = useState<Search[]>([]); //전에 검색했던 키워드
  const [isStartSearch, setIsStartSearch] = useState(false); // 검색 서치 한번이라이도 했을때 변경
  const [isShow, setIsShow] = useState(false);
  const [places, setPlaces] = useState<SearchKeywordPlace[]>([]);
  const [selectPlace, setSelectPlace] = useState<SearchKeywordPlace>(place);
  const debouncedKeyword = useDebounce(keyword, 100);
  const {location} = useLocation(); // 커스텀 훅 호출
  const {appointmentForm, setAppointmentForm} = useAppointmentForm();
  useEffect(() => {
    getkeywordHistories();
    setIsShow(keywordHistories.length > 0);
  }, [debouncedKeyword]);

  // 최근 키워드 불러오기 함수
  const getkeywordHistories = async () => {
    const res = await AsyncStorage.getItem('recentKeyword');
    if (res) {
      const parseRecentKeyword = JSON.parse(res);
      setPrevKeyword(parseRecentKeyword);
    }
  };

  // 검색어기반 장소검색
  const searchPlace = async (keyword: string) => {
    setKeyword(keyword);
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
      setPlaces(keywordData);
      return;
    } else {
      const addressData: SearchAddressPlace[] = await searchAddress(keyword);

      if (addressData.length > 0) {
        const parseData = addressData.map(item => ({
          id: String(uuid.v4),
          address_name: item.address.address_name,
          road_address_name: item.road_address.address_name,
          x: item.address.x,
          y: item.address.y,
        }));
        setPlaces(parseData);
        return;
      }
    }
  };

  //최근 검색어 리스트
  const keywordHistories = debouncedKeyword
    ? prevKeyword
        .filter(search =>
          search.content.toLowerCase().includes(keyword.toLowerCase()),
        )
        .sort((a, b) => {
          const nameA = a.content.toLowerCase();
          const nameB = b.content.toLowerCase();
          return nameA.localeCompare(nameB, 'ko');
        })
    : [];

  // 지금 검색어 저장
  const handlePlacePress = (item: SearchKeywordPlace) => {
    setSelectPlace(item);
    if (item.x) {
      setAppointmentForm('longitude', item.x);
    }
    if (item.y) {
      setAppointmentForm('latitude', item.y);
    }
    if (item.address_name) {
      setAppointmentForm('address', item.address_name);
    }
    if (item.place_name) {
      setAppointmentForm('place_name', item.place_name);
    }
  };

  const handleSubmitEditing = async () => {
    // 빈 문자 입력 제한
    if (keyword.trim()) {
      // 입력된 키워드 검색
      await searchPlace(keyword);
      // 검색어 로컬 스토리지에 저장
      await handleSaveSearchKeyword();
      setKeyword(keyword);
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

  return {
    keyword,
    setKeyword,
    debouncedKeyword,
    setPrevKeyword,
    keywordHistories,
    isShow,
    setIsShow,
    isStartSearch,
    searchPlace,
    setSelectPlace,
    places,
    handlePlacePress,
    selectPlace,
    handleSubmitEditing,
    location,
    appointmentForm,
  };
};

export default useAppointmentPlace;
