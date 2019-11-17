import axios from 'axios';

export default async () => {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    const apiResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      params,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`,
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const accessToken = apiResponse.data.access_token;
    console.log(`アクセストークンを新規取得: ${accessToken}`);

    return {
      isSuccess: true,
      content: accessToken,
    };
  } catch (error) {
    return {
      isSuccess: false,
      content: error,
    };
  }
};
