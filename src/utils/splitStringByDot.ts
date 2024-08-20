export const splitStringByDot = (inputString: string) => {
  if (typeof inputString !== 'string') {
    throw new Error('스트링 값이 아닙니다.');
  }

  // 문자열을 '.' 기준으로 나누고, 각 요소에 '.'을 추가하며, 빈 문자열을 제외
  return inputString
    .split('.')
    .filter(item => item.trim() !== '')
    .map(item => item.trim() + '.');
};
