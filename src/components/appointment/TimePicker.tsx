import React, {useMemo} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import {debounce} from 'lodash';
import {
  getCenterPositionFromIndex,
  getIndexFromOffset,
  fillEmpty,
  isPM,
  MERIDIEM_ITEMS,
  MINUTE_ITEMS,
  HOUR_ITEMS,
  BUTTON_HEIGHT,
  GAP,
  ITEMS,
} from '@/utils/timePicker';
import uuid from 'react-native-uuid';
import {commonStyle} from '@/styles/common';

const TimePicker = ({value, onChange, width, buttonHeight, visibleCount}) => {
  if (visibleCount % 2 === 0) {
    throw new Error('visibleCount must be odd');
  }
  const dateString = value.toTimeString();

  const refs = React.useRef(
    Array.from({length: 3}).map(() => React.createRef()),
  );
  const animatedValues = React.useRef(
    Array.from({length: 3}).map(() => new Animated.Value(0)),
  );

  const getScrollProps = (index, key, items) => {
    const onScrollStop = debounce(
      offsetY => {
        const date = new Date(value.getTime());
        const itemIdx = getIndexFromOffset(offsetY);

        if (key === 'meridiem') {
          const currValueIsPM = isPM(date);
          const nextValueIsPM = MERIDIEM_ITEMS[itemIdx] === '오후';
          if (currValueIsPM && !nextValueIsPM) {
            date.setHours(date.getHours() - 12);
          }
          if (!currValueIsPM && nextValueIsPM) {
            date.setHours(date.getHours() + 12);
          }
        }
        if (key === 'hour') {
          const hour = Number(HOUR_ITEMS[itemIdx]);

          if (isPM(date)) {
            date.setHours(hour === 12 ? 12 : hour + 12);
          } else {
            date.setHours(hour === 12 ? 0 : hour);
          }
        }

        if (key === 'minute') {
          date.setMinutes(Number(MINUTE_ITEMS[itemIdx]));
        }

        onChange(date);
      },
      200,
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
      onScrollEndDrag: e => {
        onScrollStop.cancel();
        onScrollStop(e.nativeEvent.contentOffset.y);
      },
      onMomentumScrollBegin: () => {
        onScrollStop.cancel();
      },
      onMomentumScrollEnd: e => {
        onScrollStop.cancel();
        onScrollStop(e.nativeEvent.contentOffset.y);
      },
      getOnPress: item => () => {
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
  }, [dateString]);

  React.useEffect(() => {
    const meridiem = isPM(value) ? '오후' : '오전';
    const hour = String(
      isPM(value) ? value.getHours() - 12 : value.getHours(),
    ).padStart(2, '0');
    const minute = String(value.getMinutes()).padStart(2, '0');

    const matchIndex = [
      MERIDIEM_ITEMS.indexOf(meridiem),
      HOUR_ITEMS.indexOf(hour),
      MINUTE_ITEMS.indexOf(minute),
    ];

    scrollProps.forEach((props, index) => {
      props.ref.current.scrollTo({
        y: getCenterPositionFromIndex(matchIndex[index]),
      });
    });
  }, [dateString]);

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
