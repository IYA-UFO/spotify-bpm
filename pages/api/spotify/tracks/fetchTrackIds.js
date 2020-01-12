import SpotifyRequestCreater from 'app/spotifyRequestCreater';

export default async (albumIds, accessToken) => {
  console.log('Fetching track ids....');

  const response = await SpotifyRequestCreater({
    url: 'https://api.spotify.com/v1/albums',
    params: {
      ids: albumIds.join(','),
    },
    accessToken,
  });

  if (response.isSuccess) {
    const trackIds = [];
    response.content.albums.forEach(album => {
      album.tracks.items.forEach(track => {
        trackIds.push(track.id);
      });
    });
    const trackIdsNoDup = trackIds.filter(
      (x, i, self) => self.indexOf(x) === i,
    );

    return trackIdsNoDup;
  }
  throw Error(response);
};
