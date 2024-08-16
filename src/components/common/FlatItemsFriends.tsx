import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const FlatItemsFriends: React.FC<{images: string[]}> = ({images}) => {
  const mainImage = images.length > 0 ? images[0] : '';
  const additionalImages = images.slice(1, 3);
  const moreCount = images.length > 3 ? images.length - 3 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.mainProfileContainer}>
        <Image source={{uri: mainImage}} style={styles.mainProfile} />
      </View>

      <View style={styles.additionalProfiles}>
        {additionalImages.map((image, index) => (
          <Image
            key={index}
            source={{uri: image}}
            style={[
              additionalImages.length === 1
                ? styles.additionalProfileOne
                : styles.additionalProfile,
              index !== 0 && styles.additionalProfileOffset,
            ]}
          />
        ))}

        {moreCount > 0 && (
          <View style={styles.moreContainer}>
            <Text style={styles.moreText}>+{moreCount}</Text>
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
    borderRadius: 35,
    overflow: 'hidden',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    zIndex: 1,
  },
  mainProfile: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
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
  },
  additionalProfileOne: {
    width: 40,
    height: 40,
    borderRadius: 35,
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
  moreContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C4C4C4',
    borderWidth: 2,
    marginLeft: -10,
    zIndex: 1,
  },
  moreText: {
    color: '#333',
    fontSize: 12,
  },
});

export default FlatItemsFriends;
