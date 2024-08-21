import {useNavigation} from '@react-navigation/native';
import {dummyAgreementItem} from '@/mock/UserAgreement/type';
import {dummyServiceAgreementData} from '@/mock/UserAgreement/UserAgreement';
import {commonStyle} from '@/styles/common';
import {splitStringByDot} from '@/utils/splitStringByDot';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Button from '../common/Button';
import {RootStackParamList} from '@/types/Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import {useUserStore} from '@/store/store';

const topLogo = require('@/assets/icons/topLogo.png');

const ServiceAgreement = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {userData, setIsAgree} = useUserStore();
  const [isServiceAgree, setIsServiceAgree] = useState(
    userData?.isAgree.service || false,
  );
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
    return isServiceAgree ? (
      <View style={{marginVertical: 20, gap: 20}}>
        <Button disable text="동의함" onPress={() => console.log('비활성화')} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            text="철회"
            size="lg"
            theme="outline"
            onPress={() => {
              setIsAgree('service');
              navigation.replace('LoginDetail');
            }}
          />
          <Button
            text="뒤로가기"
            size="lg"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    ) : (
      <View style={{marginVertical: 20, gap: 20}}>
        <Button
          text="동의하기"
          onPress={() => {
            setIsAgree('service');
            navigation.replace('LoginDetail');
          }}
        />
        <Button
          text="뒤로가기"
          onPress={() => navigation.replace('LoginDetail')}
        />
      </View>
    );
  };

  return (
    <View style={commonStyle.CONTAINER}>
      <Image source={topLogo} style={styles.logo} />
      <Text style={styles.agreementTitle}>Piggy 서비스 이용약관 동의서</Text>
      <View style={{height: 1, backgroundColor: '#EFEFEF'}} />
      {/* 이용 약관 */}
      <View style={{flex: 1}}>
        <FlatList
          data={dummyServiceAgreementData}
          renderItem={renderServiceAgreementItem}
          keyExtractor={item => item.id.toString()}
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

export default ServiceAgreement;
