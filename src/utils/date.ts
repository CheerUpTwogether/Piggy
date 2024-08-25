export function parseKoreanDate(koreanDate: string) {
  const dateRegex = /(\d{4})년 (\d{1,2})월 (\d{1,2})일 (\d{1,2}):(\d{2})/;
  const match = koreanDate.match(dateRegex);

  if (!match) {
    throw new Error('잘못된 날짜 형식입니다.');
  }

  const [_, year, month, day, hour, minute] = match.map(Number);

  return new Date(year, month - 1, day, hour, minute);
}

export function daysAgo(koreanDate: string) {
  const currentDate = new Date();
  const targetDate = parseKoreanDate(koreanDate);

  const differenceInTime = currentDate.getTime() - targetDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays < 31 ? `${differenceInDays}일전` : koreanDate;
}
