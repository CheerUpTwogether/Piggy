import {StyleSheet} from 'react-native';
import {
  Bold,
  Regular,
  Medium,
  font_primary,
  font_sub,
  font_ef,
  font_ff,
  font_aa,
  font_99,
  font_77,
  font_33,
} from '@/styles/font';

export const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  }, // 삭제 예정
  CONTAINER: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  }, // 찐
  BOLD: Bold,
  REGURAL: Regular,
  MEDIUM: Medium,
  PRIMARY: font_primary,
  SUB: font_sub,
  BOLD_PRIMARY_20: {...Bold, ...font_primary, fontSize: 20},
  BOLD_PRIMARY_18: {...Bold, ...font_primary, fontSize: 18},
  BOLD_PRIMARY_16: {...Bold, ...font_primary, fontSize: 16},
  BOLD_PRIMARY_14: {...Bold, ...font_primary, fontSize: 14},
  BOLD_PRIMARY_12: {...Bold, ...font_primary, fontSize: 12},
  MEDIUM_PRIMARY_20: {...Medium, ...font_primary, fontSize: 20},
  MEDIUM_PRIMARY_18: {...Medium, ...font_primary, fontSize: 18},
  MEDIUM_PRIMARY_16: {...Medium, ...font_primary, fontSize: 16},
  MEDIUM_PRIMARY_14: {...Medium, ...font_primary, fontSize: 14},
  MEDIUM_PRIMARY_12: {...Medium, ...font_primary, fontSize: 12},
  REGULAR_PRIMARY_20: {...Regular, ...font_primary, fontSize: 20},
  REGULAR_PRIMARY_18: {...Regular, ...font_primary, fontSize: 18},
  REGULAR_PRIMARY_16: {...Regular, ...font_primary, fontSize: 16},
  REGULAR_PRIMARY_14: {...Regular, ...font_primary, fontSize: 14},
  REGULAR_PRIMARY_12: {...Regular, ...font_primary, fontSize: 12},
  BOLD_SUB_20: {...Bold, ...font_sub, fontSize: 20},
  BOLD_SUB_18: {...Bold, ...font_sub, fontSize: 18},
  BOLD_SUB_16: {...Bold, ...font_sub, fontSize: 16},
  BOLD_SUB_14: {...Bold, ...font_sub, fontSize: 14},
  BOLD_SUB_12: {...Bold, ...font_sub, fontSize: 12},
  MEDIUM_SUB_20: {...Medium, ...font_sub, fontSize: 20},
  MEDIUM_SUB_18: {...Medium, ...font_sub, fontSize: 18},
  MEDIUM_SUB_16: {...Medium, ...font_sub, fontSize: 16},
  MEDIUM_SUB_14: {...Medium, ...font_sub, fontSize: 14},
  MEDIUM_SUB_12: {...Medium, ...font_sub, fontSize: 12},
  REGULAR_SUB_20: {...Regular, ...font_sub, fontSize: 20},
  REGULAR_SUB_18: {...Regular, ...font_sub, fontSize: 18},
  REGULAR_SUB_16: {...Regular, ...font_sub, fontSize: 16},
  REGULAR_SUB_14: {...Regular, ...font_sub, fontSize: 14},
  REGULAR_SUB_12: {...Regular, ...font_sub, fontSize: 12},
  BOLD_FF_20: {...Bold, ...font_ff, fontSize: 20},
  BOLD_FF_18: {...Bold, ...font_ff, fontSize: 18},
  BOLD_FF_16: {...Bold, ...font_ff, fontSize: 16},
  BOLD_FF_14: {...Bold, ...font_ff, fontSize: 14},
  BOLD_FF_12: {...Bold, ...font_ff, fontSize: 12},
  MEDIUM_FF_20: {...Medium, ...font_ff, fontSize: 20},
  MEDIUM_FF_18: {...Medium, ...font_ff, fontSize: 18},
  MEDIUM_FF_16: {...Medium, ...font_ff, fontSize: 16},
  MEDIUM_FF_14: {...Medium, ...font_ff, fontSize: 14},
  MEDIUM_FF_12: {...Medium, ...font_ff, fontSize: 12},
  REGULAR_FF_20: {...Regular, ...font_ff, fontSize: 20},
  REGULAR_FF_18: {...Regular, ...font_ff, fontSize: 18},
  REGULAR_FF_16: {...Regular, ...font_ff, fontSize: 16},
  REGULAR_FF_14: {...Regular, ...font_ff, fontSize: 14},
  REGULAR_FF_12: {...Regular, ...font_ff, fontSize: 12},
  BOLD_EF_20: {...Bold, ...font_ef, fontSize: 20},
  BOLD_EF_18: {...Bold, ...font_ef, fontSize: 18},
  BOLD_EF_16: {...Bold, ...font_ef, fontSize: 16},
  BOLD_EF_14: {...Bold, ...font_ef, fontSize: 14},
  BOLD_EF_12: {...Bold, ...font_ef, fontSize: 12},
  MEDIUM_EF_20: {...Medium, ...font_ef, fontSize: 20},
  MEDIUM_EF_18: {...Medium, ...font_ef, fontSize: 18},
  MEDIUM_EF_16: {...Medium, ...font_ef, fontSize: 16},
  MEDIUM_EF_14: {...Medium, ...font_ef, fontSize: 14},
  MEDIUM_EF_12: {...Medium, ...font_ef, fontSize: 12},
  REGULAR_EF_20: {...Regular, ...font_ef, fontSize: 20},
  REGULAR_EF_18: {...Regular, ...font_ef, fontSize: 18},
  REGULAR_EF_16: {...Regular, ...font_ef, fontSize: 16},
  REGULAR_EF_14: {...Regular, ...font_ef, fontSize: 14},
  REGULAR_EF_12: {...Regular, ...font_ef, fontSize: 12},
  AA_BOLD_20: {...Bold, ...font_aa, fontSize: 20},
  AA_BOLD_18: {...Bold, ...font_aa, fontSize: 18},
  AA_BOLD_16: {...Bold, ...font_aa, fontSize: 16},
  AA_BOLD_14: {...Bold, ...font_aa, fontSize: 14},
  AA_BOLD_12: {...Bold, ...font_aa, fontSize: 12},
  MEDIUM_AA_20: {...Medium, ...font_aa, fontSize: 20},
  MEDIUM_AA_18: {...Medium, ...font_aa, fontSize: 18},
  MEDIUM_AA_16: {...Medium, ...font_aa, fontSize: 16},
  MEDIUM_AA_14: {...Medium, ...font_aa, fontSize: 14},
  MEDIUM_AA_12: {...Medium, ...font_aa, fontSize: 12},
  REGULAR_AA_20: {...Regular, ...font_aa, fontSize: 20},
  REGULAR_AA_18: {...Regular, ...font_aa, fontSize: 18},
  REGULAR_AA_16: {...Regular, ...font_aa, fontSize: 16},
  REGULAR_AA_14: {...Regular, ...font_aa, fontSize: 14},
  REGULAR_AA_12: {...Regular, ...font_aa, fontSize: 12},
  BOLD_99_20: {...Bold, ...font_99, fontSize: 20},
  BOLD_99_18: {...Bold, ...font_99, fontSize: 18},
  BOLD_99_16: {...Bold, ...font_99, fontSize: 16},
  BOLD_99_14: {...Bold, ...font_99, fontSize: 14},
  BOLD_99_12: {...Bold, ...font_99, fontSize: 12},
  MEDIUM_99_20: {...Medium, ...font_99, fontSize: 20},
  MEDIUM_99_18: {...Medium, ...font_99, fontSize: 18},
  MEDIUM_99_16: {...Medium, ...font_99, fontSize: 16},
  MEDIUM_99_14: {...Medium, ...font_99, fontSize: 14},
  MEDIUM_99_12: {...Medium, ...font_99, fontSize: 12},
  REGULAR_99_20: {...Regular, ...font_99, fontSize: 20},
  REGULAR_99_18: {...Regular, ...font_99, fontSize: 18},
  REGULAR_99_16: {...Regular, ...font_99, fontSize: 16},
  REGULAR_99_14: {...Regular, ...font_99, fontSize: 14},
  REGULAR_99_12: {...Regular, ...font_99, fontSize: 12},
  BOLD_77_20: {...Bold, ...font_77, fontSize: 20},
  BOLD_77_18: {...Bold, ...font_77, fontSize: 18},
  BOLD_77_16: {...Bold, ...font_77, fontSize: 16},
  BOLD_77_14: {...Bold, ...font_77, fontSize: 14},
  BOLD_77_12: {...Bold, ...font_77, fontSize: 12},
  MEDIUM_77_20: {...Medium, ...font_77, fontSize: 20},
  MEDIUM_77_18: {...Medium, ...font_77, fontSize: 18},
  MEDIUM_77_16: {...Medium, ...font_77, fontSize: 16},
  MEDIUM_77_14: {...Medium, ...font_77, fontSize: 14},
  MEDIUM_77_12: {...Medium, ...font_77, fontSize: 12},
  REGULAR_77_20: {...Regular, ...font_77, fontSize: 20},
  REGULAR_77_18: {...Regular, ...font_77, fontSize: 18},
  REGULAR_77_16: {...Regular, ...font_77, fontSize: 16},
  REGULAR_77_14: {...Regular, ...font_77, fontSize: 14},
  REGULAR_77_12: {...Regular, ...font_77, fontSize: 12},
  BOLD_33_20: {...Bold, ...font_33, fontSize: 20},
  BOLD_33_18: {...Bold, ...font_33, fontSize: 18},
  BOLD_33_16: {...Bold, ...font_33, fontSize: 16},
  BOLD_33_14: {...Bold, ...font_33, fontSize: 14},
  BOLD_33_12: {...Bold, ...font_33, fontSize: 12},
  MEDIUM_33_20: {...Medium, ...font_33, fontSize: 20},
  MEDIUM_33_18: {...Medium, ...font_33, fontSize: 18},
  MEDIUM_33_16: {...Medium, ...font_33, fontSize: 16},
  MEDIUM_33_14: {...Medium, ...font_33, fontSize: 14},
  MEDIUM_33_12: {...Medium, ...font_33, fontSize: 12},
  REGULAR_33_20: {...Regular, ...font_33, fontSize: 20},
  REGULAR_33_18: {...Regular, ...font_33, fontSize: 18},
  REGULAR_33_16: {...Regular, ...font_33, fontSize: 16},
  REGULAR_33_14: {...Regular, ...font_33, fontSize: 14},
  REGULAR_33_12: {...Regular, ...font_33, fontSize: 12},
});
