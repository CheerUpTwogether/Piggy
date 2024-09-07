import {ImageSourcePropType, Animated} from 'react-native';

export interface IntroDataType {
  id: string;
  image: ImageSourcePropType;
  backgroundColor: string;
}

export interface IntroItemProps {
  item: IntroDataType;
  totalItems: number;
  currentIndex: number;
}

export interface PaginatorProps {
  data: IntroDataType[];
  scrollX: Animated.Value;
}

export const introData: IntroDataType[] = [
  {
    id: '1',
    image: require('@/assets/images/intro_1.png'),
    backgroundColor: '#E87D7B',
  },
  {
    id: '2',
    image: require('@/assets/images/intro_2.png'),
    backgroundColor: '#F69D9C',
  },
  {
    id: '3',
    image: require('@/assets/images/intro_3.png'),
    backgroundColor: '#FFC3C2',
  },
  {
    id: '4',
    image: require('@/assets/images/intro_4.png'),
    backgroundColor: '#FFD9D8',
  },
];
