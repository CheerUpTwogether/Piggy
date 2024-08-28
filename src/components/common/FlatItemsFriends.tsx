import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {commonStyle} from '@/styles/common';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';

const FlatItemsFriends: React.FC<{images: string[]}> = ({images}) => {
  const mainImage = images.length > 0 ? images[0] : '';
  const additionalImages = images.slice(1, 3);
  const moreCount = images.length > 3 ? images.length - 3 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.mainProfileContainer}>
        {mainImage ? (
          <Image
            source={{uri: mainImage}}
            style={styles.mainProfile}
            alt={'profile'}
          />
        ) : (
          <View style={styles.mainBasicProfile}>
            <BasicProfileSvg width={40} height={40} />
          </View>
        )}
      </View>

      <View style={styles.additionalProfiles}>
        {additionalImages.map((image, index) =>
          image ? (
            <Image
              key={index}
              source={{uri: image}}
              style={[
                additionalImages.length === 1
                  ? styles.additionalProfileOne
                  : styles.additionalProfile,
                index !== 0 && styles.additionalProfileOffset,
              ]}
              alt={`profile${index}`}
            />
          ) : (
            <View
              key={index}
              style={[
                additionalImages.length === 1
                  ? styles.additionalProfileOne
                  : styles.additionalProfile,
                index !== 0 && styles.additionalProfileOffset,
                styles.additionalProfileSvgContainer,
              ]}>
              <BasicProfileSvg
                width={additionalImages.length === 1 ? 30 : 20}
                height={additionalImages.length === 1 ? 30 : 20}
              />
            </View>
          ),
        )}

        {moreCount > 0 && (
          <View style={styles.moreContainer}>
            <Text style={commonStyle.MEDIUM_33_12}>+{moreCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainProfileContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  mainProfile: {
    width: '100%',
    height: '100%',
  },
  mainBasicProfile: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
  },
  additionalProfiles: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  additionalProfile: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    position: 'relative',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  additionalProfileOne: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'relative',
    zIndex: 1,
    left: 25,
    bottom: 10,
    borderColor: '#C4C4C4',
    borderWidth: 1,
  },
  additionalProfileOffset: {
    marginLeft: -10,
    zIndex: 1,
  },
  additionalProfileSvgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  moreContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#efefef',
    borderWidth: 2,
    marginLeft: -10,
    zIndex: 3,
  },
});

export default FlatItemsFriends;
