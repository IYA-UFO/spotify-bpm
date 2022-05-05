import SpotifyRequestCreater from 'spotifyRequestCreater';

const fetchArtists = async (req, res) => {
  console.log('Fetching airtists....');
  const { queryString, accessToken } = req.query;
  const apiResponse = await SpotifyRequestCreater({
    url: `https://api.spotify.com/v1/search?query=${queryString}&type=artist&limit=50`,
    accessToken,
  });

  res.status(200).json(apiResponse.content.artists.items);
};
export default fetchArtists;
