import React, {useEffect} from 'react';
import {
  Linking,
  Alert,
  Platform,
  SafeAreaView,
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

const RedirectKakaoMap = () => {
  const route = useRoute();
  const {myLatitude, myLongitude, placeLatitude, placeLongitude} = route.params;
  const kakaoMapUrl = `kakaomap://route?sp=${myLatitude},${myLongitude}&ep=${placeLatitude},${placeLongitude}&by=FOOT`;
  const kakaoAppPlayStoreUrl = 'market://details?id=net.daum.android.map';
  const kakaoAppAppStoreUrl =
    'https://apps.apple.com/kr/app/kakaomap/id304608425';

  useEffect(() => {
    const openKakaoMap = async () => {
      const supported = await Linking.canOpenURL(kakaoMapUrl);

      if (supported) {
        // 카카오 앱이 설치되어 있으면 카카오 맵 오픈
        await Linking.openURL(kakaoMapUrl);
      } else {
        // 카카오 앱이 설치되어 있지 않은 경우
        Alert.alert(
          '카카오맵이 설치되어 있지 않습니다',
          '카카오맵을 설치하러 이동하시겠습니까?',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '설치하러 가기',
              onPress: () => {
                if (Platform.OS === 'android') {
                  // 안드로이드에서는 구글 플레이 스토어로 이동
                  Linking.openURL(kakaoAppPlayStoreUrl);
                } else if (Platform.OS === 'ios') {
                  // iOS에서는 앱 스토어로 이동
                  Linking.openURL(kakaoAppAppStoreUrl);
                }
              },
            },
          ],
        );
      }
    };

    openKakaoMap();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 18, textAlign: 'center'}}>
        계속하시려면 뒤로 가주세요.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});

export default RedirectKakaoMap;
