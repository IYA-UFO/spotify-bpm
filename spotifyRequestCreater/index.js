import axios from 'axios';

export default async ({ url, params, accessToken }) => {
  try {
    const apiResponse = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });
    console.log(`Spotify API request SUCCESS | ${url}`);
    return {
      isSuccess: true,
      content: apiResponse.data,
    };
  } catch (error) {
    console.log(`Spotify API request FAIL | ${url}`);

    return {
      isSuccess: false,
      content: error,
    };
  }
};
