import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@/types/Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {useUserStore} from '@/store/store';
import {splitStringByDot} from '@/utils/splitStringByDot';
import {dummyAgreementItem} from '@/mock/UserAgreement/type';
import {dummyPaymentAgreementData} from '@/mock/UserAgreement/UserAgreement';
import {commonStyle} from '@/styles/common';
import Button from '../common/Button';
import AgreementBtn from './AgreementBtn';

const topLogo = require('@/assets/icons/topLogo.png');

const PaymentAgreement = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'PaymentAgreement'>>();
  const param = route.params;
  const {userData, setIsAgree} = useUserStore();
  const [isPaymentAgree, setIsPaymentAgree] = useState(
    userData?.isAgree.payment || false,
  );

  const renderServiceAgreementItem = ({item}: {item: dummyAgreementItem}) => {
    const sentenceArray = splitStringByDot(item.content);
    return (
      <View style={{marginVertical: 20, gap: 2, width: '96%'}}>
        <Text style={commonStyle.MEDIUM_33_12}>{item.title}</Text>
        {sentenceArray.length > 1 ? (
          <View>
            {sentenceArray.map((sentence, index) => (
              <View style={{flexDirection: 'row'}} key={index}>
                <Text style={commonStyle.MEDIUM_33_12}> {index + 1}.</Text>
                <Text style={{...commonStyle.MEDIUM_33_12, lineHeight: 20}}>
                  {sentence}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={{...commonStyle.MEDIUM_33_12, lineHeight: 20}}>
            {item.content}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={commonStyle.CONTAINER}>
      <Image source={topLogo} style={styles.logo} alt="logo" />
      <Text style={styles.agreementTitle}>Piggy 결제 이용약관 동의서</Text>
      <View style={{height: 1, backgroundColor: '#EFEFEF'}} />
      {/* 이용 약관 */}
      <View style={{flex: 1}}>
        <FlatList
          data={dummyPaymentAgreementData}
          renderItem={renderServiceAgreementItem}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <AgreementBtn authData={param?.authData} type={'payment'} />
          }
        />
      </View>
      {!param?.authData && (
        <Button
          text="뒤로가기"
          theme="outline"
          onPress={() => navigation.goBack()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 12,
    marginBottom: 20,
    height: 32,
    width: 80,
  },
  agreementTitle: {
    ...commonStyle.MEDIUM_33_20,
    marginVertical: 14,
  },
});

export default PaymentAgreement;
