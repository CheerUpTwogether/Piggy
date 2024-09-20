import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const ShopScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            적립하신 피기로 상품을 구매해보세요
          </Text>
        </View>

        <View style={styles.productCard}>
          <Image
            source={{uri: 'https://example.com/hutgaesoo.jpg'}}
            style={styles.productImage}
          />
          <Text style={styles.productBrand}>CU</Text>
          <Text style={styles.productName}>HK)헛개수P500ml</Text>
          <Text style={styles.productPrice}>2,200 P</Text>
        </View>

        <View style={styles.giftCard}>
          <Image
            source={{uri: 'https://example.com/compose_coffee_logo.jpg'}}
            style={styles.giftCardLogo}
          />
          <Text style={styles.giftCardTitle}>COMPOSE COFFEE</Text>
          <Text style={styles.giftCardSubtitle}>No.1 Take-out Coffee</Text>
          <Text style={styles.giftCardDescription}>
            컴포즈커피 모바일 금액권
          </Text>
          <Text style={styles.giftCardPrice}>5,000원</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4444',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  points: {
    marginRight: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 16,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: '#44b700',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 16,
  },
  bannerIcon: {
    marginRight: 8,
  },
  bannerText: {
    fontSize: 14,
  },
  productCard: {
    padding: 16,
    marginBottom: 16,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4444',
  },
  giftCard: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  giftCardLogo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  giftCardTitle: {
    color: '#ffd700',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  giftCardSubtitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  giftCardDescription: {
    color: '#fff',
    fontSize: 16,
  },
  giftCardPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

export default ShopScreen;
