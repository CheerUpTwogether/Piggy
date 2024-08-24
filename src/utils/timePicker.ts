import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');
export const BUTTON_HEIGHT = 50;
export const VIEW_WIDTH = width - 52;
export const GAP = 12;
export const MERIDIEM_ITEMS = ['오전', '오후'];

export const HOUR_ITEMS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];
export const MINUTE_ITEMS = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
];
export const ITEMS = [
  {
    key: 'meridiem',
    items: MERIDIEM_ITEMS,
  },
  {
    key: 'hour',
    items: HOUR_ITEMS,
  },
  {
    key: 'minute',
    items: MINUTE_ITEMS,
  },
];

export const isPM = date => date.getHours() >= 12;

export const getCenterPosition = offsetY => {
  return getIndexFromOffset(offsetY) * BUTTON_HEIGHT;
};
export const getCenterPositionFromIndex = index => {
  return index * BUTTON_HEIGHT;
};
export const getIndexFromOffset = offsetY => {
  return Math.round(offsetY / BUTTON_HEIGHT);
};
export const fillEmpty = (visibleCount, [...values]) => {
  const fillCount = (visibleCount - 1) / 2;
  for (let i = 0; i < fillCount; i++) {
    values.unshift('');
    values.push('');
  }
  return values;
};

export const asPickerFormat = (date: Date) => {
  const _date = new Date(date.getTime());
  const hour = _date.getHours();
  const min = _date.getMinutes();
  _date.setTime(Date.now());
  _date.setHours(hour);
  _date.setMinutes(min + (5 - (min % 5)));
  _date.setSeconds(0);
  _date.setMilliseconds(0);
  return _date;
};
