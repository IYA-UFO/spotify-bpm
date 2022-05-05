import SpotifyRequestCreater from 'spotifyRequestCreater';
import createChunkedArr from 'util/createChunkedArr';

export default async (trackIds, accessToken) => {
  console.log('Fetching analyses of tracks....');

  const chunkedIdArr = createChunkedArr(trackIds, 50);

  const getTrackFeatureForChunk = async (idChunk) => {
    const response = await SpotifyRequestCreater({
      url: `https://api.spotify.com/v1/audio-features?ids=${idChunk.join(',')}`,
      accessToken,
    });
    if (response.isSuccess) {
      return response.content.audio_features.map((track, index) => {
        return {
          id: idChunk[index],
          bpm: Math.round(track.tempo),
          liveness: track.liveness,
          timeSignature: track.time_signature,
        };
      });
    }
  };

  const requests = chunkedIdArr.map((idChunk) => {
    return getTrackFeatureForChunk(idChunk);
  });

  return Promise.all(requests).then((results) => {
    let featureArr = [];

    results.forEach((chunkResult) => {
      featureArr = featureArr.concat(chunkResult);
    });

    return featureArr;
  });
};
