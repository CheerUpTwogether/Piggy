import {PermissionsAndroid, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// 위치 권한 요청 함수
export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한 요청',
          message: '이 앱은 위치 접근 권한이 필요합니다.',
          buttonNeutral: '나중에',
          buttonNegative: '거부',
          buttonPositive: '허용',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } // ios는 테스트 필요
    else if (Platform.OS === 'ios') {
      const permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const result = await check(permission);
      if (result === RESULTS.DENIED) {
        const requestResult = await request(permission);
        return requestResult === RESULTS.GRANTED;
      } else if (result === RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
