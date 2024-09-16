import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Button from '../common/Button';
import {color_primary, commonStyle} from '@/styles/common';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/types/Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {useUserStore} from '@/store/store';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {userData} = useUserStore();
  return (
    <View style={styles.container}>
      <View style={styles.myInfoBox}>
        <View style={styles.flexRow}>
          {userData.profile_img_url ? (
            <Image
              source={{uri: userData.profile_img_url}}
              style={styles.profileImg}
              alt="peofileImage"
            />
          ) : (
            <View style={styles.emptyProfileImg}>
              <BasicProfileSvg width={40} height={40} />
            </View>
          )}

          <View>
            <Text style={commonStyle.REGULAR_FF_16}>{userData.nickname}</Text>
            <Text style={commonStyle.MEDIUM_FF_20}>{userData.piggy} Piggy</Text>
          </View>
        </View>
        <View style={styles.btnArea}>
          <Button
            text="사용내역"
            onPress={() => navigation.navigate('PiggyUsage')}
            theme="outline"
            size="md"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  myInfoBox: {
    borderRadius: 10,
    backgroundColor: color_primary,
    height: 140,
    padding: 16,
  },
  flexRow: {
    flexDirection: 'row',
  },
  emptyProfileImg: {
    borderRadius: 100,
    backgroundColor: '#fff',
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  profileImg: {
    width: 52,
    height: 52,
    borderRadius: 100,
    marginRight: 8,
  },
  btnArea: {
    flexDirection: 'row',
    paddingTop: 8,
    justifyContent: 'flex-end',
    gap: 4,
  },
});

export default Profile;
