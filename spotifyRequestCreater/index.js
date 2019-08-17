import axios from 'axios';
import LRUCache from 'lru-cache';
import fetchAccessToken from './fetchAccessToken';

export default async ({ url, params }) => {
  const getAccessToken = async () => {
    let accessToken;
    const accessTokenResult = fetchAccessToken();
    if (accessTokenResult.isSuccess) {
      accessToken = accessTokenResult.content;
      console.log(`アクセストークンを新規取得: ${accessToken}`);
      return accessToken;
    }
    Error('アクセストークン取得エラー');
  };

  const getMainResult = async () => {
    try {
      const apiResponse = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });
      console.log('リクエスト成功');
      return {
        isSuccess: true,
        content: apiResponse.data,
      };
    } catch (error) {
      console.log('リクエスト失敗');
      console.log({ error });

      return {
        isSuccess: false,
        content: error,
      };
    }
  };

  const accessToken = await getAccessToken();
  const result = await getMainResult(accessToken);
  return result;
};
