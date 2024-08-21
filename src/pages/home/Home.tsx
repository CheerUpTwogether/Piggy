import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  PanResponder,
} from 'react-native';
import {commonStyle, color_ef, color_primary} from '@/styles/common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {appointments} from '@/mock/Home/Home';
import AppointmentItem from '@/components/home/AppointmentItem';
import EmptyResult from '@/components/common/EmptyResult';
import Profile from '@/components/home/Profile';
import PulsSvg from '@/assets/icons/plus.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/Router';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [sort, setSort] = useState('next');
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // 현재 활성화된 슬라이드의 인덱스
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
      if (!index) {
        navigation.navigate('AppointmentDetail', {...appointments[index]});
      }
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
      <Profile />

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

      {/* 약속 추가 버튼 */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.plusBtn}
        onPress={() => {}}>
        <PulsSvg color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  plusBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 48,
    height: 48,
    backgroundColor: color_primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
