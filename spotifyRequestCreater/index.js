export default async ({ url, accessToken }) => {
  try {
    const apiResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const apiData = await apiResponse.json();
    console.log({ apiData });
    console.log(`Spotify API request SUCCESS | ${url}`);
    return {
      isSuccess: true,
      content: apiData,
    };
  } catch (error) {
    console.log(`Spotify API request FAIL | ${url}`);

    return {
      isSuccess: false,
      content: error,
    };
  }
};
