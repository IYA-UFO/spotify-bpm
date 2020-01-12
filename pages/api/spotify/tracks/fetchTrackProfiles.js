import SpotifyRequestCreater from 'app/spotifyRequestCreater';
import createChunkedArr from 'app/util/createChunkedArr';

export default async (trackIds, accessToken) => {
  console.log('Fetching information of tracks....');

  const chunkedIdArr = createChunkedArr(trackIds, 50);

  const getTrackProfilesForChunk = async idChunk => {
    const apiResponse = await SpotifyRequestCreater({
      url: 'https://api.spotify.com/v1/tracks',
      params: {
        ids: idChunk.join(','),
      },
      accessToken,
    });

    if (apiResponse.isSuccess) {
      return apiResponse.content.tracks.map(track => {
        return {
          id: track.id,
          name: track.name,
          previewUrl: track.preview_url,
        };
      });
    }
  };

  const requests = chunkedIdArr.map(idChunk => {
    return getTrackProfilesForChunk(idChunk);
  });

  return Promise.all(requests).then(results => {
    let profileArr = [];
    results.forEach(chunkResult => {
      profileArr = profileArr.concat(chunkResult);
    });
    return profileArr;
  });
};
