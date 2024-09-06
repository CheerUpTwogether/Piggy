import React, {useEffect, useState, useCallback} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {StackHeaderProps, StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/Router';
import {LeftItemProps} from '@/types/Common';
import {commonStyle} from '@/styles/common';
import {
  getUnConfirmNotificationSpb,
  subcribeUnConfirmNotification,
} from '@/supabase/alarm';
import {useUserStore} from '@/store/store';
import {getPiggySpb} from '@/supabase/AuthSpb';
import AlertSvg from '@/assets/icons/alert.svg';
import SearchSvg from '@/assets/icons/search.svg';
import GoodsBoxSvg from '@/assets/icons/goodsBox.svg';
import BackSvg from '@/assets/icons/leftArrow.svg';
import EditSvg from '@/assets/icons/edit.svg';
import GiftSvg from '@/assets/icons/gift.svg';

const topLogo = require('@/assets/icons/topLogo.png');

const LeftItem = ({name, headerLeftLabelVisible}: LeftItemProps) => {
  const navigation = useNavigation();
  const mainName = ['Home', 'Friends', 'Goods', 'Settings'];

  if (mainName.includes(name)) {
    return <Image source={topLogo} style={styles.logo} alt="topLogo" />;
  }

  if (headerLeftLabelVisible) {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <BackSvg width={32} height={32} color={'#555'} />
      </TouchableOpacity>
    );
  }

  return <View style={styles.empty} />;
};

const Title = ({title}: {title: string}) => {
  return !title ? (
    <View />
  ) : (
    <Text style={commonStyle.MEDIUM_33_18}>{title}</Text>
  );
};

const Alarm = ({isUnConfirmAlarm}: {isUnConfirmAlarm: {value: boolean}}) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      style={styles.icon}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Alarm')}>
      {isUnConfirmAlarm.value && (
        <View style={styles.alarmConfirmWrapper}></View>
      )}
      <AlertSvg width={24} height={24} />
    </TouchableOpacity>
  );
};

type NavigationProp = StackNavigationProp<RootStackParamList>;
const RightItems = ({name}: {name: string}) => {
  const navigation = useNavigation<NavigationProp>();
  const {userData, gotoProfile, setUserDataByKey} = useUserStore();
  const [isUnConfirmAlarm, setIsUnConfirmAlarm] = useState({value: false});
  const handle = async () => {
    const isUnConfirm = await getUnConfirmNotificationSpb(userData.id);
    setIsUnConfirmAlarm({value: isUnConfirm});
  };
  useEffect(() => {
    handle();
    subcribeUnConfirmNotification(userData.id, handle);
  }, []);

  const updatePiggy = async () => {
    if (userData) {
      const data = await getPiggySpb(userData.id);

      if (data) {
        const piggy = data.latest_piggy_count;
        setUserDataByKey('piggy', piggy);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      updatePiggy();
    }, []),
  );

  switch (name) {
    case 'Home':
      return (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate('GiftFriend')}>
            <GiftSvg style={styles.svg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <GoodsBoxSvg style={styles.svg} />
          </TouchableOpacity>

          <Alarm isUnConfirmAlarm={isUnConfirmAlarm} />
        </View>
      );
    case 'Friends':
      return (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              navigation.navigate('FriendSearch', {
                previousScreen: 'Friends',
              })
            }>
            <SearchSvg style={styles.svg} />
          </TouchableOpacity>
          <Alarm isUnConfirmAlarm={isUnConfirmAlarm} />
        </View>
      );
    case 'Goods':
    case 'GoodsDetail':
      return (
        <View style={styles.iconContainer}>
          <View style={[styles.directionRow, styles.icon]}>
            <Text style={styles.text}>{userData.piggy}</Text>
            <Text style={[styles.text, styles.colorRed]}>P</Text>
          </View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate('GoodsStorage')}>
            <GoodsBoxSvg style={styles.svg} />
          </TouchableOpacity>
          <Alarm isUnConfirmAlarm={isUnConfirmAlarm} />
        </View>
      );
    case 'Settings':
      return (
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon} onPress={gotoProfile}>
            <EditSvg style={styles.svg} />
          </TouchableOpacity>
          <Alarm isUnConfirmAlarm={isUnConfirmAlarm} />
        </View>
      );
    case 'Alert':
      return <View style={styles.empty} />;
    default:
      return <Alarm isUnConfirmAlarm={isUnConfirmAlarm} />;
  }
};

const TopTab = ({route, options}: BottomTabHeaderProps | StackHeaderProps) => {
  return (
    <SafeAreaView style={{backgroundColor: '#FFF'}}>
      <View style={styles.container}>
        <LeftItem
          name={route.name}
          headerLeftLabelVisible={options?.headerLeftLabelVisible || false}
        />
        <Title title={options.title || ''} />
        <RightItems name={route.name} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  logo: {
    height: 32,
    width: 80,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: 8,
    color: '#555',
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'medium',
    fontFamily: 'NotoSansKR-Medium',
    lineHeight: 24,
  },
  colorRed: {
    color: '#ED423F',
  },
  directionRow: {
    flexDirection: 'row',
  },
  empty: {
    width: 48,
  },
  button: {
    padding: 8,
    margin: -8,
  },
  svg: {
    width: 24,
    height: 24,
    color: '#555',
  },
  alarmConfirmWrapper: {
    position: 'absolute',
    zIndex: 2,
    top: 6,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#04BF8A',
  },
});
export default TopTab;
