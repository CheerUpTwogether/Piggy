export const gradeList = [
  {
    id: 1,
    grade: '약속 베이비',
    explain: '아직 정보가 부족해요.',
    gradeColor: '#333',
  },
  {
    id: 2,
    grade: '프로 약속 탈주러',
    explain: '관심과 노력이 필요해요...',
    gradeColor: '#ED423F',
  },
  {
    id: 3,
    grade: '약속 수행러',
    explain: '약속을 잘 지키는 편이에요!',
    gradeColor: '#FEE500',
  },
  {
    id: 4,
    grade: '프로 약속 이행러',
    explain: '약속은 그 무엇보다 소중해요!',
    gradeColor: '#04BF8A',
  },
];

// 등급 구하는 함수
export const determineGrade = (
  totalAppointments: number,
  completedAppointments: number,
) => {
  const completionRate = (completedAppointments / totalAppointments) * 100;

  switch (true) {
    case totalAppointments < 5:
      return {grade: '약속 베이비', gradeColor: '#333'};
    case completionRate < 33.3:
      return {grade: '프로 약속 탈주러', gradeColor: '#ED423F'};
    case completionRate < 66.6:
      return {grade: '약속 수행러', gradeColor: '#FEE500'};
    default:
      return {grade: '프로 약속 이행러', gradeColor: '#04BF8A'};
  }
};
