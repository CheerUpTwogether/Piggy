import {useCallback} from 'react';
import useIntervalValue from './useIntervalValue'; // 실제 파일 경로에 맞게 수정

const useAppointmentTimer = (appointmentDate: string) => {
  const appointmentTime = new Date(appointmentDate);

  // 남은 시간을 계산하는 함수
  const calculateRemainingTime = useCallback(() => {
    const now = new Date();
    const timeDiff = appointmentTime.getTime() - now.getTime();
    const minutesLeft = timeDiff / 1000 / 60;

    if (minutesLeft <= 10 && timeDiff > 0) {
      return timeDiff / 1000; // 남은 시간을 초로 설정
    } else {
      return null;
    }
  }, [appointmentDate]);

  // useIntervalValue 훅을 사용 -> 주기적으로 남은 시간 업데이트
  const remainingTime = useIntervalValue<number | null>(
    null,
    1000,
    calculateRemainingTime,
  );

  // 시간 포맷팅 함수
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return {
    remainingTime,
    formattedTime: remainingTime !== null ? formatTime(remainingTime) : null,
  };
};

export default useAppointmentTimer;
