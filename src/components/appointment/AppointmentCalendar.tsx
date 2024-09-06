import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {localeConfigKr} from '@/utils/timePicker';
import {BUTTON_HEIGHT, VIEW_WIDTH} from '@/utils/timePicker';
import {commonStyle} from '@/styles/common';
import ClockSvg from '@/assets/icons/clock.svg';
import CalendarSvg from '@/assets/icons/calendar.svg';
import TimePicker from './TimePicker';
import {useAppointmentForm} from '@/store/store';
import dayjs from 'dayjs';
import {color_primary} from '../../styles/common';

LocaleConfig.locales.ko = localeConfigKr;
LocaleConfig.defaultLocale = 'ko';

const AppointmentCalendar = () => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {appointmentForm, setAppointmentFormByKey} = useAppointmentForm();
  const fadeAnimCalendar = useRef(new Animated.Value(1)).current;
  const fadeAnimInput = useRef(new Animated.Value(1)).current;
  const arr = [1, 2];
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

  const onEndReached = () => {
    if (arr.length === 13) {
      return;
    }
    arr.push(arr.length + 1);
  };

  const handleDateSelect = date => {
    setAppointmentFormByKey('date', date.dateString);
    handleInput();
  };

  const renderFooter = () => {
    return arr.length === 13 ? (
      <></>
    ) : (
      <ActivityIndicator
        size="large"
        color={color_primary}
        style={{marginVertical: 52}}
      />
    );
  };

  return (
    <View>
      <Text style={styles.label}>날짜</Text>
      <TouchableOpacity
        onPress={handleInput}
        activeOpacity={0.8}
        style={styles.input}>
        <CalendarSvg style={styles.svg} />
        <Text style={commonStyle.MEDIUM_33_16}>{appointmentForm.date}</Text>
      </TouchableOpacity>
      <Text style={[commonStyle.REGULAR_PRIMARY_12, {marginVertical: 8}]}>
        *현재보다 최소 2시간 이후의 약속만 생성할 수 있어요
      </Text>
      {showCalendar && (
        <Animated.View style={{...styles.calendar, opacity: fadeAnimCalendar}}>
          <FlatList
            data={arr}
            renderItem={({_, index}) => (
              <Calendar
                onDayPress={handleDateSelect}
                current={dayjs().format('YYYY-MM-DD')}
                minDate={dayjs().format('YYYY-MM-DD')}
                maxDate={dayjs().add(1, 'year').format('YYYY-MM-DD')}
                initialDate={dayjs().add(index, 'month').format('YYYY-MM-DD')}
                hideArrows={true}
                monthFormat={'yyyy년 MM월'}
                markedDates={{
                  [appointmentForm.date]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedDotColor: 'orange',
                  },
                }}
                key={index}
              />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
            ListFooterComponent={renderFooter}
          />
        </Animated.View>
      )}
      {!showCalendar && (
        <Animated.View style={{opacity: fadeAnimInput, marginTop: 12}}>
          <Text style={styles.label}>시간</Text>
          <View style={styles.input}>
            <ClockSvg style={styles.svg} />
            <Text style={commonStyle.MEDIUM_33_16}>{appointmentForm.time}</Text>
          </View>

          <TimePicker
            value={appointmentForm.time}
            onChange={date => setAppointmentFormByKey('time', date)}
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
