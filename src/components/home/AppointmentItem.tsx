import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {commonStyle} from '@/styles/common';
import FlatItemsFriends from '../common/FlatItemsFriends';
import MoreSvg from '@/assets/icons/more.svg';
import PinSvg from '@/assets/icons/pin.svg';

const AppointmentItem = ({
  item,
}: {
  item: {
    appointment_id: number;
    subject: string;
    location: string;
    date: string;
    time: string;
    penalty: number;
    friends: {
      uid: number;
      url: string;
    }[];
  };
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <FlatItemsFriends images={item.friends.map(el => el.url)} />
      </View>

      <View style={styles.wrapper}>
        <View style={styles.subject}>
          <Text style={commonStyle.MEDIUM_33_16}>{item.subject}</Text>
          <View style={styles.svgContainer}>
            <TouchableOpacity style={styles.svgBtn}>
              <PinSvg color="#777" style={styles.svg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.svgBtn}>
              <MoreSvg color="#777" style={styles.svg} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={commonStyle.REGULAR_77_14}>{item.location}</Text>
          <Text style={commonStyle.REGULAR_77_14}>
            {item.date}
            {item.time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    paddingRight: 12,
    flex: 1,
    marginLeft: -8,
  },
  subject: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  svgContainer: {
    flexDirection: 'row',
  },
  svgBtn: {
    padding: 6,
  },
  svg: {
    width: 20,
    height: 20,
    marginBottom: 4,
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  contentContainer: {},
});

export default AppointmentItem;
