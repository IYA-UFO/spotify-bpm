import axios from 'axios';
import LRUCache from 'lru-cache';
import fetchAccessToken from './fetchAccessToken';

export default async ({ url, params }) => {
  const getAccessToken = async () => {
    let accessToken;
    const accessTokenResult = await fetchAccessToken();
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
      return {
        isSuccess: true,
        content: apiResponse.data,
      };
    } catch (error) {
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
