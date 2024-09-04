import {useEffect, useState} from 'react';

const useAppointmentTimer = (appointmentDate: string) => {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const appointmentTime = new Date(appointmentDate);
      const timeDiff = appointmentTime.getTime() - now.getTime();
      const minutesLeft = timeDiff / 1000 / 60;

      if (minutesLeft <= 10 && timeDiff > 0) {
        setRemainingTime(timeDiff / 1000); // 남은 시간을 초로 설정
      } else {
        setRemainingTime(null);
      }
    };

    checkTime(); // 훅이 처음 호출될 때 바로 체크

    const interval = setInterval(() => {
      checkTime();
    }, 1000); // 1초마다 남은 시간 체크

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 타이머 정리
  }, [appointmentDate]);

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
