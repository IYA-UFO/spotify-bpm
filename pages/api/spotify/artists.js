import SpotifyRequestCreater from '../../../spotifyRequestCreater';
import fetchAccessToken from '../../../spotifyRequestCreater/fetchAccessToken';

export default async (req, res) => {
  console.log('Fetching airtists....');

  const accessTokenResult = await fetchAccessToken();
  const { q } = req.query;
  const apiResponse = await SpotifyRequestCreater({
    url: 'https://api.spotify.com/v1/search',
    params: {
      q,
      type: 'artist',
      limit: 50,
    },
    accessToken: accessTokenResult.content,
  });

  return apiResponse.isSuccess
    ? res.status(200).json(apiResponse.content.artists.items)
    : res.status(500).send(apiResponse.content);
};
