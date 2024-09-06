import {getItemSession} from '@/utils/auth';
import axios from 'axios';
import {backInstance} from './fcm';
import supabase from '@/supabase/supabase';

const fetchBackEnd = async (phone_number: string, message: string) => {
  const authData = await supabase.auth.getSession();
  console.log(authData);
  try {
    backInstance.post(
      '/sendSms',
      {
        phone: phone_number,
        content: message,
      },
      {
        headers: {
          Authorization: authData
            ? `Bearer ${authData.data.session?.access_token}`
            : '',
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (err) {
    console.error(`메시지를 전송하지 못하였습니다.`);
  }
};

// 본인인증 메세지 전송
export const sendVertifyMessageAPI = async (
  phone_number: string,
  verify_code: string,
) => {
  return fetchBackEnd(phone_number, `[Piggy] 본인인증 코드 : ${verify_code} `);
};
