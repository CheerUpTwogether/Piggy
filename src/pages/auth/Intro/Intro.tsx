import React, {useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  ViewToken,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import IntroItem from './IntroItem';
import Paginator from './Paginator';
import {introData, IntroDataType} from '@/types/intro';
const {width, height} = Dimensions.get('window');

const Intro = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef(null);

  const viewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const renderItem = ({item}: {item: IntroDataType}) => (
    <View style={{backgroundColor: item.backgroundColor}}>
      <IntroItem
        item={item}
        currentIndex={currentIndex}
        totalItems={introData.length}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={introData}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={sliderRef}
      />
      <Paginator data={introData} scrollX={scrollX} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  itemContainer: {flex: 1, width, height},
  image: {
    justifyContent: 'center',
    width,
    height,
    resizeMode: 'contain',
  },
});

export default Intro;
