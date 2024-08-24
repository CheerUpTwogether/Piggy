import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import {asPickerFormat} from '@/utils/date';
import {BUTTON_HEIGHT, VIEW_WIDTH} from '@/utils/date';

import ClockSvg from '@/assets/icons/clock.svg';
import CalendarSvg from '@/assets/icons/calendar.svg';

import {commonStyle} from '@/styles/common';
import TimePicker from './TimePicker';

LocaleConfig.locales.ko = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['월', '화', '수', '목', '금', '토', '일'],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';

const AppointmentCalendar = () => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState(asPickerFormat(new Date()));
  const fadeAnimCalendar = useRef(new Animated.Value(1)).current;
  const fadeAnimInput = useRef(new Animated.Value(1)).current;

  const handleInput = () => {
    if (showCalendar) {
      Animated.timing(fadeAnimCalendar, {
        toValue: showCalendar ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowCalendar(false);
        Animated.timing(fadeAnimInput, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      Animated.timing(fadeAnimInput, {
        toValue: showCalendar ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowCalendar(true);
        //setShowNextInput(true);
        Animated.timing(fadeAnimCalendar, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleDateSelect = date => {
    setSelectedDate(date.dateString);
    handleInput();
  };

  return (
    <View>
      <Text style={styles.label}>날짜</Text>
      <TouchableOpacity
        onPress={handleInput}
        activeOpacity={0.8}
        style={styles.input}>
        <CalendarSvg style={styles.svg} />
        <Text
          style={
            selectedDate ? commonStyle.REGULAR_33_14 : commonStyle.REGULAR_77_14
          }>
          {selectedDate ? selectedDate : '날짜를 선택해주세요'}
        </Text>
      </TouchableOpacity>
      {showCalendar && (
        <Animated.View style={{...styles.calendar, opacity: fadeAnimCalendar}}>
          <CalendarList
            onDayPress={handleDateSelect}
            pastScrollRange={0}
            futureScrollRange={12}
            scrollEnabled={true}
            showScrollIndicator={true}
            style={{marginLeft: -16}}
          />
        </Animated.View>
      )}
      {!showCalendar && (
        <Animated.View style={{opacity: fadeAnimInput, marginTop: 12}}>
          <Text style={styles.label}>시간</Text>
          <View style={styles.input}>
            <ClockSvg style={styles.svg} />
            <Text style={commonStyle.REGULAR_33_14}>sdf</Text>
          </View>

          <TimePicker
            value={time}
            onChange={setTime}
            width={VIEW_WIDTH}
            buttonHeight={BUTTON_HEIGHT}
            visibleCount={3}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    ...commonStyle.BOLD_33_14,
    padding: 4,
  },
  input: {
    flexDirection: 'row',
    height: 48,
    borderColor: '#aaa',
    borderRadius: 100,
    borderWidth: 1,
    alignItems: 'center',
  },
  svg: {
    width: 18,
    height: 18,
    color: '#aaa',
    padding: 4,
    margin: 8,
  },
  calendar: {
    height: '85%',
  },
});
export default AppointmentCalendar;
