import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {commonStyle} from '@/styles/common';
import {HelpDetailRouteParams} from '@/types/setting';
import {getInquiryDetailSpb} from '@/supabase/SettingSpb';
import {InquiryDetail} from '@/types/setting';

const HelpDetail = () => {
  const route = useRoute<RouteProp<HelpDetailRouteParams, 'HelpDetail'>>();
  const {id} = route.params;
  const [helpItem, setHelpItem] = useState<InquiryDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInquiryDetailSpb(id);
      console.log(data);
      setHelpItem(data);
    };

    fetchData();
  }, [id]);

  return (
    <ScrollView style={commonStyle.CONTAINER}>
      <View style={styles.subjectWrapper}>
        <Text style={commonStyle.MEDIUM_33_18}>{helpItem?.subject}</Text>
        <Text style={commonStyle.REGULAR_77_14}>{helpItem?.contents}</Text>
      </View>

      <View style={styles.contentWrapper}>
        <Text style={[commonStyle.REGULAR_33_16, styles.contentText]}>
          {helpItem?.contents?.replace(/\n/g, '\n')}
        </Text>

        <View style={styles.imageContainer}>
          {helpItem?.img_url &&
            helpItem.img_url.map((url, index) => (
              <TouchableOpacity key={index} style={styles.imageWrapper}>
                <Image
                  source={{uri: url}}
                  style={styles.image}
                  alt="helpItemImage"
                />
              </TouchableOpacity>
            ))}
        </View>
      </View>

      <View style={styles.answerWrapper}>
        <Text style={commonStyle.MEDIUM_33_18}>답변</Text>
        {helpItem?.response ? (
          <View style={{gap: 12}}>
            <Text style={[commonStyle.REGULAR_33_16, {lineHeight: 24}]}>
              {helpItem.response_date}
            </Text>
            <Text style={commonStyle.REGULAR_77_14}>
              {helpItem.response_date}
            </Text>
          </View>
        ) : (
          <Text style={commonStyle.REGULAR_99_14}>
            답변은 순차적으로 처리되며, 보통 영업일 기준 1~2일 소요됩니다.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  subjectWrapper: {
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
    paddingVertical: 16,
    gap: 12,
  },
  contentWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 8,
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
    gap: 20,
    minHeight: 200,
  },
  contentText: {lineHeight: 24},
  imageContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#AAA',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  itemContainer: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#AAA',
  },
  answerWrapper: {marginVertical: 26, marginLeft: 16, gap: 20, lineHeight: 24},
});

export default HelpDetail;
