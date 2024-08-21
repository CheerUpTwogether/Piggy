import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Button from '../common/Button';
import {dummy_profile} from '@/mock/Friends/Friends';
import {color_primary, commonStyle} from '@/styles/common';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/types/Router';
import {StackNavigationProp} from '@react-navigation/stack';

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.myInfoBox}>
      <View style={styles.flexRow}>
        <Image
          source={{
            uri: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
          }}
          style={styles.profileImg}
        />
        <View>
          <Text style={commonStyle.REGULAR_FF_14}>
            {dummy_profile.nick_name}
          </Text>
          <Text style={commonStyle.MEDIUM_FF_20}>
            {dummy_profile.piggy} Piggy
          </Text>
        </View>
      </View>
      <View style={styles.btnArea}>
        <Button
          text="사용내역"
          onPress={() => navigation.navigate('PiggyUsage')}
          theme="outline"
          size="sm"
        />
        <Button text="충전하기" onPress={() => {}} theme="outline" size="sm" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myInfoBox: {
    borderRadius: 10,
    backgroundColor: color_primary,
    height: 140,
    padding: 16,
  },
  flexRow: {
    flexDirection: 'row',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 8,
  },
  btnArea: {
    flexDirection: 'row',
    paddingTop: 28,
    justifyContent: 'flex-end',
    gap: 4,
  },
});

export default Profile;
