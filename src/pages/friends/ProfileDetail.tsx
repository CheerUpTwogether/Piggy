import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {commonStyle} from '@/styles/common';
import {ProfileDetailProps} from '@/mock/Friends/type';
import {gradeList, determineGrade} from '@/utils/grade';
import {ProfileDetailNavigationProp} from './type';

import GradeSvg from '@/assets/icons/grade.svg';
import GiftSvg from '@/assets/icons/gift.svg';
import TrashSvg from '@/assets/icons/trash.svg';
import AddFriendSvg from '@/assets/icons/addFriend.svg';
import EditSvg from '@/assets/icons/edit.svg';
import UTurnSvg from '@/assets/icons/uTurn.svg';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';

const {height: screenHeight} = Dimensions.get('window');

const ProfileDetail: React.FC<ProfileDetailProps> = ({
  uuid,
  nick_name,
  total_appointments,
  completed_appointments,
  profile_image_path,
  friend,
  closeModal,
}) => {
  const [gradeListShow, setGradeListShow] = useState(false);
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const navigation = useNavigation<ProfileDetailNavigationProp>();

  const {grade, gradeColor} = determineGrade(
    total_appointments,
    completed_appointments,
  );

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: gradeListShow ? 0 : screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [gradeListShow, slideAnim]);

  const handleMoveToGift = (
    uuid: string,
    nick_name: string,
    profile_image_path: string,
  ) => {
    navigation.navigate('GiftAmount', {
      uuid: uuid,
      nick_name: nick_name,
      profile_image_path: profile_image_path,
    });
    closeModal();
  };

  const handleEditProfile = () => {
    console.log('TODO: 프로필 수정 api 호출');
    closeModal();
  };

  const handleDeleteFriend = () => {
    console.log('TODO: 친구 삭제 api 호출');
    closeModal();
  };

  const handleAddFriend = () => {
    console.log('TODO: 친구 추가 api 호출');
    closeModal();
  };

  const iconShow = () => {
    if (uuid === '1000') {
      return (
        <TouchableOpacity
          style={styles.rightIconWrapper}
          activeOpacity={0.8}
          onPress={handleEditProfile}>
          <EditSvg style={styles.rightIcon} />
        </TouchableOpacity>
      );
    } else if (friend) {
      return (
        <View style={{flexDirection: 'row', gap: 8}}>
          <TouchableOpacity
            style={styles.rightIconWrapper}
            activeOpacity={0.8}
            onPress={() =>
              handleMoveToGift(uuid, nick_name, profile_image_path)
            }>
            <GiftSvg style={styles.rightIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightIconWrapper}
            activeOpacity={0.8}
            onPress={handleDeleteFriend}>
            <TrashSvg style={styles.rightIcon} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.rightIconWrapper}
          activeOpacity={0.8}
          onPress={handleAddFriend}>
          <AddFriendSvg style={styles.rightIcon} />
        </TouchableOpacity>
      );
    }
  };

  const handleGradeToggle = () => {
    setGradeListShow(!gradeListShow);
  };

  return (
    <View style={commonStyle.CONTAINER}>
      {profile_image_path ? (
        <Image
          source={{uri: profile_image_path}}
          style={styles.profile}
          alt="profile"
        />
      ) : (
        <View style={styles.emptyProfileWrapper}>
          <BasicProfileSvg width={220} height={220} />
        </View>
      )}

      <View style={styles.introduceContainer}>
        <View style={styles.introduceWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleGradeToggle}
            style={
              gradeListShow ? styles.uTurnIconWrapper : styles.gradeWrapper
            }>
            {gradeListShow ? (
              <UTurnSvg style={styles.uTurnIcon} />
            ) : (
              <GradeSvg
                style={styles.gradeStyle}
                color={gradeColor as string}
              />
            )}
          </TouchableOpacity>
          <View style={styles.nickNameWrapper}>
            <Text style={commonStyle.BOLD_33_20}>{nick_name}</Text>
            <Text style={commonStyle.MEDIUM_99_14}>{grade}</Text>
          </View>
        </View>
        {iconShow()}
      </View>

      <Animated.View
        style={[
          styles.gradeListContainer,
          {transform: [{translateX: slideAnim}]},
        ]}>
        <View>
          {gradeList.map(item => (
            <View key={item.id} style={styles.explainWrapper}>
              <View style={styles.gradeWrapper}>
                <GradeSvg style={styles.gradeStyle} color={item.gradeColor} />
              </View>
              <View style={{gap: 4}}>
                <Text style={commonStyle.MEDIUM_33_18}>{item.grade}</Text>
                <Text style={commonStyle.REGULAR_99_16}>{item.explain}</Text>
              </View>
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    width: '100%',
    height: '72%',
    resizeMode: 'cover',
  },
  emptyProfileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '72%',
    backgroundColor: '#EFEFEF',
  },
  introduceContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
  },
  introduceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  nickNameWrapper: {gap: 6},
  gradeStyle: {width: 24, height: 24},
  gradeWrapper: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  rightIconWrapper: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {width: 28, height: 28, color: '#555'},
  uTurnIconWrapper: {
    borderColor: '#EFEFEF',
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uTurnIcon: {
    width: 20,
    height: 20,
    color: '#ED423F',
    marginBottom: 4,
  },
  gradeListContainer: {
    position: 'absolute',
    top: 16,
    bottom: 0,
    left: 0,
    right: 0,
    height: '72%',
    marginHorizontal: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#EFEFEF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradeListContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  explainWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    gap: 14,
  },
});

export default ProfileDetail;
