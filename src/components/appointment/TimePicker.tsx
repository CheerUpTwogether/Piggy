import React, {useMemo, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {debounce} from 'lodash';
import {
  getCenterPositionFromIndex,
  getIndexFromOffset,
  fillEmpty,
  MERIDIEM_ITEMS,
  MINUTE_ITEMS,
  HOUR_ITEMS,
  BUTTON_HEIGHT,
  GAP,
  ITEMS,
} from '@/utils/timePicker';
import uuid from 'react-native-uuid';
import {commonStyle} from '@/styles/common';
import dayjs from 'dayjs';
import {TimePickerProps} from '@/types/appointment';

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  width,
  buttonHeight,
  visibleCount,
}) => {
  const [isAm, setIsAm] = useState(true);
  if (visibleCount % 2 === 0) {
    throw new Error('visibleCount must be odd');
  }

  const refs = React.useRef(
    Array.from({length: 3}).map(() => React.createRef<ScrollView>()),
  );
  const animatedValues = React.useRef(
    Array.from({length: 3}).map(() => new Animated.Value(0)),
  );

  const getScrollProps = (index: number, key: string, items: string[]) => {
    const onScrollStop = debounce(
      offsetY => {
        const date = dayjs();
        const [hourValue, minuteValue] = value.split(':').map(Number);
        let updatedDate = date
          .set('hour', hourValue)
          .set('minute', minuteValue);

        const itemIdx = getIndexFromOffset(offsetY);

        if (key === 'meridiem') {
          const meridiem = MERIDIEM_ITEMS[itemIdx] === '오전';
          setIsAm(meridiem);
          if (meridiem && updatedDate.hour() > 12) {
            updatedDate = updatedDate.set('hour', updatedDate.hour() - 12);
          }
          if (!meridiem && updatedDate.hour() <= 12) {
            updatedDate = updatedDate.set('hour', updatedDate.hour() + 12);
          }
        }

        if (key === 'hour') {
          const hour = Number(HOUR_ITEMS[itemIdx]);
          if (isAm) {
            updatedDate = updatedDate.set('hour', hour === 12 ? 0 : hour);
          } else {
            updatedDate = updatedDate.set('hour', hour === 12 ? 12 : hour + 12);
          }
        }

        if (key === 'minute') {
          updatedDate = updatedDate.set(
            'minute',
            Number(MINUTE_ITEMS[itemIdx]),
          );
        }
        onChange(updatedDate.format('HH:mm'));
      },
      100,
      {leading: false, trailing: true},
    );

    return {
      key,
      index,
      items,
      showsVerticalScrollIndicator: false,
      contentContainerStyle: styles.scrollView,
      ref: refs.current[index],
      onScrollBeginDrag: () => {
        onScrollStop.cancel();
      },
      onScrollEndDrag: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        onScrollStop.cancel();
        onScrollStop(e.nativeEvent.contentOffset.y);
      },
      onMomentumScrollBegin: () => {
        onScrollStop.cancel();
      },
      onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        onScrollStop.cancel();
        onScrollStop(e.nativeEvent.contentOffset.y);
      },
      getOnPress: (item: string) => () => {
        const targetIdx = items.indexOf(item);
        if (targetIdx === -1) {
          return;
        }

        const CENTER_POSITION = getCenterPositionFromIndex(targetIdx);
        onScrollStop(CENTER_POSITION);
        onScrollStop.flush();
      },
      animatedValue: animatedValues.current[index],
      scrollEventThrottle: 16,
    };
  };

  const scrollProps = useMemo(() => {
    return ITEMS.map(({key, items}, index) =>
      getScrollProps(index, key, items),
    );
  }, [value]);

  React.useEffect(() => {
    const date = dayjs();
    const [hourValue, minuteValue] = value.split(':').map(Number);
    let updatedDate = date.set('hour', hourValue).set('minute', minuteValue);

    const meridiem = hourValue >= 12 ? '오후' : '오전';
    if (hourValue >= 12) {
      updatedDate = updatedDate.set('hour', hourValue - 12);
    }
    const hour = updatedDate.format('HH'); // 12시간제 (01-12)
    const minute = updatedDate.format('mm'); // 분

    const matchIndex = [
      MERIDIEM_ITEMS.indexOf(meridiem),
      HOUR_ITEMS.indexOf(hour),
      MINUTE_ITEMS.indexOf(minute),
    ];

    scrollProps.forEach((props, index) => {
      if (props.ref.current) {
        props.ref.current.scrollTo({
          y: getCenterPositionFromIndex(matchIndex[index]),
        });
      }
    });
  }, [value]);

  return (
    <View
      style={[styles.container, {width, height: visibleCount * buttonHeight}]}>
      {scrollProps.map(props => {
        const renderItems = fillEmpty(visibleCount, props.items);

        return (
          <ScrollView
            {...props}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: props.animatedValue}}}],
              {useNativeDriver: false},
            )}>
            {renderItems.map(item => {
              const position = getCenterPositionFromIndex(
                props.items.indexOf(item),
              );

              const opacity = props.animatedValue.interpolate({
                inputRange: [
                  position - BUTTON_HEIGHT,
                  position,
                  position + BUTTON_HEIGHT,
                ],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });

              return (
                <AnimatedPressable
                  style={{opacity}}
                  onPress={props.getOnPress(item)}
                  key={`${uuid.v4()}`}>
                  <View style={styles.button}>
                    <Text style={commonStyle.BOLD_33_16}>{item}</Text>
                  </View>
                </AnimatedPressable>
              );
            })}
          </ScrollView>
        );
      })}
      <OverlayView />
    </View>
  );
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const OverlayView = () => {
  return (
    <View
      pointerEvents={'none'}
      style={[StyleSheet.absoluteFill, styles.overlay]}>
      <View style={styles.overlayVisibleView}>
        <View style={styles.overlayVisibleViewInner} />
        <View style={styles.gap} />
        <View style={styles.overlayVisibleViewInner} />
        <View style={styles.gap}>
          <Text style={{position: 'absolute', textAlign: 'center'}}>{':'}</Text>
        </View>
        <View style={styles.overlayVisibleViewInner} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: GAP,
  },
  container: {
    //marginTop: 12,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  scrollView: {
    left: 0,
    right: 0,
    position: 'absolute',
  },
  button: {
    height: BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontWeight: 'bold',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayVisibleView: {
    width: '100%',
    height: BUTTON_HEIGHT,
    flexDirection: 'row',
  },
  overlayVisibleViewInner: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#c8c8c8',
  },
});

export default TimePicker;
