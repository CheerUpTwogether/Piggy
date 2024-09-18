import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Button from '../common/Button';
import {color_primary, commonStyle} from '@/styles/common';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/types/Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {useUserStore} from '@/store/store';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';
import LinearGradient from 'react-native-linear-gradient';

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {userData} = useUserStore();
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.myInfoBox}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#ef4444', '#dc2626']}>
        <View style={styles.flexRow}>
          <View style={styles.flexRow}>
            {userData.profile_img_url ? (
              <Image
                source={{uri: userData.profile_img_url}}
                style={styles.profileImg}
                alt="peofileImage"
              />
            ) : (
              <View style={styles.emptyProfileImg}>
                <BasicProfileSvg width={5} height={40} />
              </View>
            )}

            <View>
              <Text style={commonStyle.REGULAR_FF_18}>{userData.nickname}</Text>
              <Text style={commonStyle.BOLD_FF_22}>{userData.piggy} Piggy</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('PiggyUsage')}>
            <Text style={styles.btn}>사용내역</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  myInfoBox: {
    backgroundColor: color_primary,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyProfileImg: {
    borderRadius: 100,
    backgroundColor: '#fff',
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  profileImg: {
    width: 68,
    height: 68,
    borderRadius: 100,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  btn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    color: color_primary,
  },
});

export default Profile;
