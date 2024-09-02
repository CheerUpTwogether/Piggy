import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import {changeDateText, localeConfigKr} from '@/utils/timePicker';
import {BUTTON_HEIGHT, VIEW_WIDTH} from '@/utils/timePicker';
import {commonStyle} from '@/styles/common';
import ClockSvg from '@/assets/icons/clock.svg';
import CalendarSvg from '@/assets/icons/calendar.svg';
import TimePicker from './TimePicker';
import {useAppointmentForm} from '@/store/store';

LocaleConfig.locales.ko = localeConfigKr;
LocaleConfig.defaultLocale = 'ko';

const AppointmentCalendar = () => {
  const [showCalendar, setShowCalendar] = useState(true);
  const {appointmentForm, setAppointmentForm} = useAppointmentForm();
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
    console.log(date);
    setAppointmentForm('date', date.dateString);
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
            appointmentForm.date
              ? commonStyle.MEDIUM_33_16
              : commonStyle.MEDIUM_AA_16
          }>
          {appointmentForm.date ? appointmentForm.date : '날짜를 선택해주세요'}
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
            markedDates={{
              [appointmentForm.date]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
          />
        </Animated.View>
      )}
      {!showCalendar && (
        <Animated.View style={{opacity: fadeAnimInput, marginTop: 12}}>
          <Text style={styles.label}>시간</Text>
          <View style={styles.input}>
            <ClockSvg style={styles.svg} />
            <Text style={commonStyle.MEDIUM_33_16}>
              {`${changeDateText(
                appointmentForm.time.getHours(),
              )} : ${changeDateText(appointmentForm.time.getMinutes())}`}
            </Text>
          </View>

          <TimePicker
            value={appointmentForm.time}
            onChange={date => setAppointmentForm('time', date)}
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
    //padding: 12,
  },
  label: {
    ...commonStyle.MEDIUM_33_16,
    paddingBottom: 8,
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
    color: '#333',
    padding: 4,
    margin: 8,
    paddingHorizontal: 22,
  },
  calendar: {
    height: '85%',
  },
});
export default AppointmentCalendar;
