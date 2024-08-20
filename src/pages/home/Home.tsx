import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Animated,
  PanResponder,
} from 'react-native';
import {commonStyle, color_primary, color_ef} from '@/styles/common';
import Button from '@/components/common/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppointmentItem from '@/components/home/AppointmentItem';
import {dummy_profile} from '@/mock/Friends/Friends';
import {appointments} from '@/mock/Home/Home';
import EmptyResult from '@/components/common/EmptyResult';

const Home = () => {
  const [sort, setSort] = useState('next');
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // 현재 활성화된 슬라이드의 인덱스
  const tabText = (value: string) => {
    if (value === sort) {
      return commonStyle.MEDIUM_PRIMARY_16;
    }
    return commonStyle.REGULAR_77_16;
  };
  const animations = useRef(
    appointments.map(() => new Animated.ValueXY({x: 0, y: 0})),
  ).current;

  const resetOthers = (index: number) => {
    animations.forEach((anim, i) => {
      if (i !== index) {
        Animated.spring(anim.x, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    });
  };

  const panResponders = animations.map((anim, index) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setActiveIndex(index);
        resetOthers(index);
      },
      onPanResponderMove: Animated.event([null, {dx: anim.x}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -100) {
          Animated.spring(anim.x, {
            toValue: -200,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(anim.x, {
            toValue: 0,
            useNativeDriver: false,
          }).start(() => {
            setActiveIndex(null);
          });
        }
      },
    }),
  );

  return (
    <SafeAreaView style={commonStyle.CONTAINER}>
      {/* 사용자 프로필 */}
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
            onPress={() => {}}
            theme="outline"
            size="sm"
          />
          <Button
            text="충전하기"
            onPress={() => {}}
            theme="outline"
            size="sm"
          />
        </View>
      </View>

      {/* 약속 정렬 탭 */}
      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => setSort('next')}
          activeOpacity={0.8}>
          <Text style={tabText('next')}>미래 약속</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => setSort('prev')}
          activeOpacity={0.8}>
          <Text style={tabText('prev')}>지난 약속</Text>
        </TouchableOpacity>
      </View>

      {/* 약속 리스트 */}
      {appointments.length ? (
        <Animated.FlatList
          data={appointments}
          keyExtractor={item => String(item.appointment_id)}
          renderItem={({item, index}) => (
            <View style={{height: 100}}>
              <Animated.View
                style={[{transform: animations[index].getTranslateTransform()}]}
                {...panResponders[index].panHandlers}>
                <AppointmentItem item={item} />
              </Animated.View>
            </View>
          )}
          style={{marginHorizontal: -16}}
        />
      ) : (
        <View style={{flex: 1, paddingTop: 40}}>
          <EmptyResult
            reason={'아직 약속이 없어요'}
            solution={'친구들과의 약속을 등록해보세요!'}
          />
        </View>
      )}
    </SafeAreaView>
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
  tab: {
    marginTop: 40,
    flexDirection: 'row',
    borderBlockColor: color_ef,
    borderBottomWidth: 1,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  tabBtn: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  deleteButton: {
    width: 100,
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
