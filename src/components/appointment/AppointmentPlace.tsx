import useDebounce from '@/hooks/useDebounce';
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
import {dummy_place_data, dummy_search_data} from '@/mock/Place/Place';
import {Place, Search} from '@/mock/Place/type';

import SearchSvg from '@/assets/icons/search.svg';
import PlaceSvg from '@/assets/icons/location.svg';
import LocationRoad from '@/assets/icons/locationRoad.svg';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const AppointmentPlace = () => {
  const [keyword, setKeyword] = useState('');
  const [selectPlace, setSelectPlace] = useState<Place>({
    id: '',
    name: '',
    address: '',
    latitude: '',
    longitude: '',
  });

  const debouncedKeyword = useDebounce(keyword, 100);
  const sortedSearchData = debouncedKeyword
    ? dummy_search_data
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

  useEffect(() => {
    if (sortedSearchData.length > 0) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [debouncedKeyword]);

  const handleSearchPress = () => {
    setKeyword('');
    setIsShow(false);
  };

  const handlePlacePress = (item: Place) => {
    setSelectPlace(item);
  };

  const renderSearchItem = ({item}: {item: Search}) => (
    <TouchableOpacity
      style={styles.searchContainer}
      onPress={() => handleSearchPress()}>
      <View style={styles.searchWrapper}>
        <SearchSvg width={18} height={18} color={'#333'} />
        <Text style={commonStyle.REGULAR_33_16}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPlaceItem = ({item}: {item: Place}) => {
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
            {item.name}
          </Text>
          <Text style={commonStyle.REGULAR_77_12}>{item.address}</Text>
        </View>
        <Text style={styles.distanceText}>22km</Text>
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
          data={dummy_place_data}
          renderItem={renderPlaceItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
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
