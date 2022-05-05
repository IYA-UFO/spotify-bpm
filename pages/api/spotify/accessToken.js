const accessToken = async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  console.log('Fetching accessToken....');

  const apiResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`,
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: encodeURI(params),
  });
  const data = await apiResponse.json();
  console.log({ data });
  res.setHeader('Cache-Control', `max-age=0, s-maxage=0`);
  res.status(200).json({ token: data.access_token });
};
export default accessToken;
