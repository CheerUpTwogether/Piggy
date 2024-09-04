import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '@/store/store';
import Button from '@/components/common/Button';

const AgreementBtn = ({authData, type}) => {
  const navigation = useNavigation();
  const {userData, setIsAgree} = useUserStore();
  const [isServiceAgree, setIsServiceAgree] = useState(
    userData?.isAgree.service || false,
  );
  return (
    <View style={{marginVertical: 20, gap: 20}}>
      {authData && (
        <View>
          {isServiceAgree ? (
            <Button
              disable
              text="동의함"
              onPress={() => console.log('비활성화')}
            />
          ) : (
            <Button
              text="동의하기"
              onPress={() => {
                setIsAgree(type);
                navigation.replace('LoginDetail', {authData: authData});
              }}
            />
          )}
          <Button
            style={{marginTop: 8}}
            text="뒤로가기"
            theme="outline"
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    </View>
  );
};

export default AgreementBtn;
