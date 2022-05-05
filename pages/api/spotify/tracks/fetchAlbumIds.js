import SpotifyRequestCreater from 'spotifyRequestCreater/index.js';

export default async (artistId, accessToken) => {
  console.log('Fetching album ids....');

  const response = await SpotifyRequestCreater({
    url: `https://api.spotify.com/v1/artists/${artistId}/albums?limit=20`,
    accessToken,
  });

  if (response.isSuccess) {
    const ids = response.content.items.map((item) => item.id);
    return ids;
  }
  throw Error(response);
};
