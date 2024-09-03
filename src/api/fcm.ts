import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://www.piggynative.kro.kr:8080',
});

const fetchBackEnd = (uid_list: string[], title: string, body: string) => {
  for (const uid of uid_list) {
    try {
      instance.post(
        '/sendNotification',
        {
          id: uid,
          message: {title, body},
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (err) {
      console.error(`해당 유저에게 알림을 못전달했습니다. uid: ${uid}`, err);
    }
  }
};

// type Category = 'invite' | 'accept' | 'expire' | 'gift' | 'remind' | 'result';

export const sendInviteNotificationAPI = async (
  uid_list: string[],
  subject: string,
) => {
  fetchBackEnd(uid_list, `약속에 초대 되었어요`, `약속명: ${subject}`);
};

export const sendAcceptNotificationAPI = async (
  uid_list: string[],
  accept_user: string,
) => {
  fetchBackEnd(uid_list, `약속 수락`, `${accept_user} 님이 약속을 수락했어요!`);
};

export const sendExpireNotificationAPI = async (
  uid_list: string[],
  subject: string,
) => {
  fetchBackEnd(uid_list, `약속이 성사되지 않았어요😭`, `약속명: ${subject}`);
};
