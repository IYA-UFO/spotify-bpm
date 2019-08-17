import SpotifyRequestCreater from '../../../spotifyRequestCreater';

export default async (req, res) => {
  const { q } = req.query;
  const apiResponse = await SpotifyRequestCreater({
    url: 'https://api.spotify.com/v1/search',
    params: {
      q,
      type: 'artist',
      limit: 50,
    },
  });

  return apiResponse.isSuccess
    ? res.status(200).json(apiResponse.content.artists.items)
    : res.status(500).send(apiResponse.content);
};
