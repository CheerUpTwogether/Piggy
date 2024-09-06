import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Location} from '@/types/place';
import {requestLocationPermission} from '@/utils/permission';

export const useLocation = () => {
  const [location, setLocation] = useState<Location>();
  const [error, setError] = useState(null);

  // 현재 위치 정보 받아오기
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => {
        console.log(error.code, error.message);
        setError(error.message);
        Alert.alert('위치 정보를 가져올 수 없습니다.', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // 초기 로딩 시 권한 요청 및 위치 정보 가져오기
  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        getCurrentLocation();
      } else {
        setError('위치 권한이 허용되지 않았습니다.');
      }
    };
    fetchLocation();
  }, []);

  return {location, error};
};
