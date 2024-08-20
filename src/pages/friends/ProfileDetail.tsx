import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {commonStyle} from '@/styles/common';
import {ProfileDetailProps} from '@/mock/Friends/type';

import GradeSvg from '@/assets/icons/grade.svg';
import GiftSvg from '@/assets/icons/gift.svg';
import TrashSvg from '@/assets/icons/trash.svg';
import AddFriendSvg from '@/assets/icons/addFriend.svg';
import EditSvg from '@/assets/icons/edit.svg';
import UTurnSvg from '@/assets/icons/uTurn.svg';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';

const {height: screenHeight} = Dimensions.get('window');

const GRADE_LIST = [
  {
    id: 1,
    grade: '약속 베이비',
    explain: '아직 정보가 부족해요.',
    gradeColor: '#333',
  },
  {
    id: 2,
    grade: '프로 약속 탈주러',
    explain: '관심과 노력이 필요해요...',
    gradeColor: '#ED423F',
  },
  {
    id: 3,
    grade: '약속 수행러',
    explain: '약속을 잘 지키는 편이에요!',
    gradeColor: '#FEE500',
  },
  {
    id: 4,
    grade: '프로 약속 이행러',
    explain: '약속은 그 무엇보다 소중해요!',
    gradeColor: '#04BF8A',
  },
];

// 등급 구하는 함수
const determineGrade = (
  total_appointments: number,
  completed_appointments: number,
) => {
  const completionRate = (completed_appointments / total_appointments) * 100;

  if (total_appointments < 5) return GRADE_LIST[0];
  if (completionRate < 33.3) return GRADE_LIST[1];
  if (completionRate < 66.6) return GRADE_LIST[2];
  return GRADE_LIST[3];
};

const ProfileDetail: React.FC<ProfileDetailProps> = ({
  uuid,
  nick_name,
  total_appointments,
  completed_appointments,
  profile_image_path,
  friend,
}) => {
  const [gradeListShow, setGradeListShow] = useState(false);
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  const {grade, gradeColor} = determineGrade(
    total_appointments,
    completed_appointments,
  );

  const toggleGradeList = () => {
    Animated.timing(slideAnim, {
      toValue: gradeListShow ? screenHeight : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setGradeListShow(!gradeListShow));
  };

  const getActionIcons = () => {
    if (uuid === '1000') {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log('TODO: 내 정보 수정')}>
          <EditSvg style={styles.rightIcon} />
        </TouchableOpacity>
      );
    }

    return friend ? (
      <View style={styles.iconRow}>
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
    ) : (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => console.log('TODO: 친구 추가')}>
        <AddFriendSvg style={styles.rightIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={commonStyle.CONTAINER}>
      {profile_image_path ? (
        <Image source={{uri: profile_image_path}} style={styles.profile} />
      ) : (
        <View style={styles.emptyProfileWrapper}>
          <BasicProfileSvg width={220} height={220} />
        </View>
      )}

      <View style={styles.introduceContainer}>
        <View style={styles.introduceWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleGradeList}
            style={
              gradeListShow ? styles.uTurnIconWrapper : styles.gradeWrapper
            }>
            {gradeListShow ? (
              <UTurnSvg style={styles.uTurnIcon} />
            ) : (
              <GradeSvg style={styles.gradeStyle} color={gradeColor} />
            )}
          </TouchableOpacity>
          <View style={styles.nickNameWrapper}>
            <Text style={commonStyle.BOLD_33_20}>{nick_name}</Text>
            <Text style={commonStyle.MEDIUM_99_14}>{grade}</Text>
          </View>
        </View>
        {getActionIcons()}
      </View>

      <Animated.View
        style={[
          styles.gradeListContainer,
          {transform: [{translateX: slideAnim}]},
        ]}>
        <View>
          {GRADE_LIST.map(({id, grade, explain, gradeColor}) => (
            <View key={id} style={styles.explainWrapper}>
              <View style={styles.gradeWrapper}>
                <GradeSvg style={styles.gradeStyle} color={gradeColor} />
              </View>
              <View style={styles.explainTextWrapper}>
                <Text style={commonStyle.MEDIUM_33_18}>{grade}</Text>
                <Text style={commonStyle.REGULAR_99_16}>{explain}</Text>
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
    height: 380,
  },
  emptyProfileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 380,
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
    height: 380,
    marginHorizontal: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#EFEFEF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  explainWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    gap: 14,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 8,
  },
  explainTextWrapper: {
    gap: 4,
  },
});

export default ProfileDetail;
