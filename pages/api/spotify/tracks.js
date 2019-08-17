import SpotifyRequestCreater from '../../../spotifyRequestCreater';

export default async (req, res) => {
  const getAlbumIds = async artistId => {
    console.log('getAlbumIds');

    const apiResponse = await SpotifyRequestCreater({
      url: `https://api.spotify.com/v1/artists/${artistId}/albums`,
      params: {
        limit: 20,
      },
    });

    if (apiResponse.isSuccess) {
      const ids = apiResponse.content.items.map(item => item.id);
      return ids;
    }
    throw Error(apiResponse);
  };

  const getTrackIds = async albumIds => {
    console.log('getTrackIds');

    const apiResponse = await SpotifyRequestCreater({
      url: 'https://api.spotify.com/v1/albums',
      params: {
        ids: albumIds.join(','),
      },
    });

    if (apiResponse.isSuccess) {
      const trackIds = [];
      apiResponse.content.albums.forEach(album => {
        album.tracks.items.forEach(track => {
          trackIds.push(track.id);
        });
      });
      const trackIdsNoDup = trackIds.filter(
        (x, i, self) => self.indexOf(x) === i,
      );

      return trackIdsNoDup;
    }
    throw Error(apiResponse);
  };

  const getTrackInfo = async trackIds => {
    console.log('getTrackInfo');
    const apiResponse = await SpotifyRequestCreater({
      url: `https://api.spotify.com/v1/tracks`,
      params: {
        ids: trackIds.join(','),
      },
    });

    if (apiResponse.isSuccess) {
      return apiResponse.content.tracks.map(track => {
        return {
          id: track.id,
          name: track.name,
        };
      });
    }
    throw Error(apiResponse);
  };

  const getTrackAnalyses = async trackId => {
    console.log('getTrackAnalyses');

    const getSingleTrackAnalysis = async id => {
      console.log({ id });
      const apiResponse = await SpotifyRequestCreater({
        url: `https://api.spotify.com/v1/audio-analysis/${id}`,
      });
      if (apiResponse.isSuccess) {
        return apiResponse.content;
      }
      throw Error(apiResponse.content);
    };

    const trackAnalysesReqArr = trackId.map(id => {
      const data = getSingleTrackAnalysis(id);
      return data;
    });

    return Promise.all(trackAnalysesReqArr)
      .then(results => {
        console.log({ results });
        return results;
      })
      .catch(err => {
        console.log({ err });
        return err;
      });
  };

  const albumIds = await getAlbumIds(req.query.artistId);
  const trackIds = await getTrackIds(albumIds);
  const shortTrackIds = trackIds.slice(0, 10);
  const trackInfoArr = await getTrackInfo(shortTrackIds);
  const trackAnalyses = await getTrackAnalyses(shortTrackIds);

  return res.status(200).send(trackAnalyses);
};
