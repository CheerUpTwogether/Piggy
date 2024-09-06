export function parseKoreanDate(koreanDate: string) {
  const dateRegex = /(\d{4})년 (\d{1,2})월 (\d{1,2})일 (\d{1,2}):(\d{2})/;
  const match = koreanDate.match(dateRegex);

  if (!match) {
    throw new Error('잘못된 날짜 형식입니다.');
  }

  const [_, year, month, day, hour, minute] = match.map(Number);

  return new Date(year, month - 1, day, hour, minute);
}

export function formatKoreanDate(timestamp: string) {
  // Supabase에서 받은 timestamp를 JavaScript의 Date 객체로 변환
  const date = new Date(timestamp);

  // 년, 월, 일, 시간, 분 추출
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줌
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 2자리로 맞춤

  // 원하는 형식으로 반환
  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
}

export function daysAgo(koreanDate: string) {
  const currentDate = new Date();
  const targetDate = parseKoreanDate(koreanDate);

  const differenceInTime = currentDate.getTime() - targetDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  if (differenceInDays > 30) {
    return koreanDate;
  }
  if (differenceInDays === 0) {
    const differenceInHours = Math.floor(differenceInTime / (1000 * 3600));
    if (differenceInHours === 0) {
      const differenceInMinute = Math.floor(differenceInTime / (1000 * 60));
      return `${Math.floor(differenceInMinute)}분 전`;
    }
    return `${Math.floor(differenceInHours)}시간 전`;
  }
  return `${differenceInDays}일전`;
}
