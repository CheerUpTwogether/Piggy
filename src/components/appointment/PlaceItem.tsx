import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {calculateDistance} from '@/utils/distance';
import {SearchKeywordPlace} from '@/types/Common';
import {Location} from '@/types/place';
import {commonStyle} from '@/styles/common';
import LocationRoad from '@/assets/icons/locationRoad.svg';

const PlaceItem = ({
  item,
  selectPlace,
  location,
  handlePlacePress,
}: {
  item: SearchKeywordPlace;
  selectPlace: SearchKeywordPlace;
  location: Location | undefined;
  handlePlacePress: (item: SearchKeywordPlace) => void;
}) => {
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
          style={[commonStyle.MEDIUM_33_16, isSelected && {color: '#ED423F'}]}>
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

const styles = StyleSheet.create({
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
export default PlaceItem;
