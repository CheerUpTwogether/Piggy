import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {commonStyle} from '@/styles/common';
import {ProfileDetailProps} from '@/mock/Friends/type';

import GradeSvg from '@/assets/icons/grade.svg';
import GiftSvg from '@/assets/icons/gift.svg';
import TrashSvg from '@/assets/icons/trash.svg';
import AddFriendSvg from '@/assets/icons/addFriend.svg';
import EditSvg from '@/assets/icons/edit.svg';
import UTurnSvg from '@/assets/icons/uTurn.svg';

// 등급 구하는 함수
const determineGrade = (
  totalAppointments: number,
  completedAppointments: number,
) => {
  const completionRate = (completedAppointments / totalAppointments) * 100;

  switch (true) {
    case totalAppointments < 5:
      return {grade: '약속 베이비', gradeColor: '#333'};
    case completionRate < 33.3:
      return {grade: '프로 약속 탈주러', gradeColor: '#ED423F'};
    case completionRate < 66.6:
      return {grade: '약속 수행러', gradeColor: '#FEE500'};
    default:
      return {grade: '프로 약속 이행러', gradeColor: '#04BF8A'};
  }
};

const ProfileDetail: React.FC<ProfileDetailProps> = ({
  uuid,
  nick_name,
  totalAppointments,
  completedAppointments,
  profileImagePath,
  friend,
}) => {
  const {grade, gradeColor} = determineGrade(
    totalAppointments,
    completedAppointments,
  );

  const iconShow = () => {
    if (uuid === '1000') {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log('TODO: 내 정보 수정')}>
          <EditSvg style={styles.rightIcon} />
        </TouchableOpacity>
      );
    } else if (friend) {
      return (
        <View style={{flexDirection: 'row', gap: 8}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log('TODO: 선물하기')}>
            <GiftSvg style={styles.rightIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log('TODO: 친구 삭제')}>
            <TrashSvg style={styles.rightIcon} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log('TODO: 친구 추가')}>
          <AddFriendSvg style={styles.rightIcon} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={commonStyle.CONTAINER}>
      <Image source={{uri: profileImagePath}} style={styles.profile} />

      <View style={styles.introduceContainer}>
        <View style={styles.introduceWrapper}>
          <View style={styles.gradeWrapper}>
            <GradeSvg style={styles.gradeStyle} color={gradeColor as string} />
          </View>
          <View style={styles.nickNameWrapper}>
            <Text style={commonStyle.BOLD_33_20}>{nick_name}</Text>
            <Text style={commonStyle.MEDIUM_99_14}>{grade}</Text>
          </View>
        </View>
        {iconShow()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    width: '100%',
    height: 380,
  },
  introduceContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
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
  rightIcon: {width: 28, height: 28, color: '#555'},
});

export default ProfileDetail;
