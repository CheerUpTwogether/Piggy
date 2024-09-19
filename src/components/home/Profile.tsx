import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {color_primary, commonStyle} from '@/styles/common';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/types/Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {useUserStore} from '@/store/store';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';
import LinearGradient from 'react-native-linear-gradient';
import ButtonCouple from '../common/ButtonCouple';

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

        <ButtonCouple
          onPressLeft={() => navigation.navigate('GiftFriend')}
          onPressRight={() => navigation.navigate('PiggyUsage')}
          textLeft={'선물하기'}
          textRight={'사용내역'}
          theme="outline"
          themeRight="outline"
          style={{marginTop: 20}}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  myInfoBox: {
    // backgroundColor: color_primary,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
