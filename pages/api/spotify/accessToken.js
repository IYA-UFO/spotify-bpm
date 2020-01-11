import axios from 'axios';

export default async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  console.log('Fetching accessToken....');
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
  res.setHeader('Cache-Control', `max-age=0, s-maxage=0`);
  res.status(200).json({ token: apiResponse.data.access_token });
};
