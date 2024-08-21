import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {dummyAgreementItem} from '@/mock/UserAgreement/type';
import {dummyPaymentAgreementData} from '@/mock/UserAgreement/UserAgreement';
import {commonStyle} from '@/styles/common';
import {splitStringByDot} from '@/utils/splitStringByDot';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Button from '../common/Button';
import {RootStackParamList} from '@/types/Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';

const topLogo = require('@/assets/icons/topLogo.png');

const PaymentAgreement = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'PaymentAgreement'>>();
  const {isAgreeProps} = route.params;
  const [isAgree, setIsAgree] = useState(false);

  useEffect(() => {
    if (isAgreeProps) {
      setIsAgree(isAgreeProps);
    }
  }, []);

  const renderServiceAgreementItem = ({item}: {item: dummyAgreementItem}) => {
    const sentenceArray = splitStringByDot(item.content);
    return (
      <View style={{marginVertical: 20, gap: 2, width: '96%'}}>
        <Text style={commonStyle.MEDIUM_33_12}>{item.title}</Text>
        {sentenceArray.length > 1 ? (
          <View>
            {sentenceArray.map((sentence, index) => (
              <View style={{flexDirection: 'row'}}>
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

  const renderAgreementButton = () => {
    return (
      <View style={{marginVertical: 20}}>
        {!isAgree && (
          <Button text="동의하기" onPress={() => navigation.replace('Login')} />
        )}
      </View>
    );
  };

  return (
    <View style={commonStyle.CONTAINER}>
      <Image source={topLogo} style={styles.logo} />
      <Text style={styles.agreementTitle}>Piggy 결제 이용약관 동의서</Text>
      <View style={{height: 1, backgroundColor: '#EFEFEF'}} />
      {/* 이용 약관 */}
      <View style={{flex: 1}}>
        <FlatList
          data={dummyPaymentAgreementData}
          renderItem={renderServiceAgreementItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderAgreementButton}
        />
      </View>
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
