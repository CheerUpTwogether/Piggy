import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemSession = async (
  access_token: string,
  refresh_token: string,
) => {
  await AsyncStorage.setItem(
    'session_token',
    JSON.stringify({access_token, refresh_token}),
  );
};

export const getItemSession = async () => {
  const res = await AsyncStorage.getItem('session_token');
  return res ? JSON.parse(res) : '';
};

export const deleteItemSession = async () => {
  await AsyncStorage.removeItem('session_token');
};
