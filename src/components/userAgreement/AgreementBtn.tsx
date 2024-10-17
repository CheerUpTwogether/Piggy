import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useUserStore} from '@/store/store';
import Button from '@/components/common/Button';
import {RootStackParamList} from '@/types/Router';
import {AgreementBtnProps} from '@/types/setting';

const AgreementBtn: React.FC<AgreementBtnProps> = ({authData, type}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {userData, setIsAgree} = useUserStore();
  const [isServiceAgree, setIsServiceAgree] = useState(
    userData?.isAgree.service || false,
  );

  return (
    <View style={{marginVertical: 20, gap: 20}}>
      {authData && (
        <View>
          {isServiceAgree ? (
            <Button disable text="동의함" onPress={() => {}} />
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
