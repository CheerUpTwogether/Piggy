import React from 'react';
import {Search} from '@/types/place';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {commonStyle} from '@/styles/common';
import SearchSvg from '@/assets/icons/search.svg';

const SearchPlaceItem = ({
  item,
  searchPlace,
}: {
  item: Search;
  searchPlace: (content: string) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.searchContainer}
      onPress={() => searchPlace(item.content)}>
      <View style={styles.searchWrapper}>
        <SearchSvg width={18} height={18} color={'#333'} />
        <Text style={commonStyle.REGULAR_33_16}>{item.content}</Text>
      </View>
    </TouchableOpacity>
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
});
export default SearchPlaceItem;
