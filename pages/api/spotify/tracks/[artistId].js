import fetchAlbumIds from './fetchAlbumIds';
import fetchTrackIds from './fetchTrackIds';
import fetchTrackProfiles from './fetchTrackProfiles';
import fetchTrackFeatures from './fetchTrackFeatures';

export default async (req, res) => {
  const { artistId, accessToken } = req.query;
  const albumIds = await fetchAlbumIds(artistId, accessToken);
  const trackIds = await fetchTrackIds(albumIds, accessToken);
  const trackProfiles = await fetchTrackProfiles(trackIds, accessToken);
  const trackFeatures = await fetchTrackFeatures(trackIds, accessToken);

  const result = trackProfiles.map(profile => {
    const { id } = profile;
    const analysis = trackFeatures.find(analysis => {
      return analysis.id === id;
    });

    return {
      id,
      bpm: analysis.bpm,
      liveness: analysis.liveness,
      timeSignature: analysis.timeSignature,
      name: profile.name,
      previewUrl: profile.previewUrl,
    };
  });

  res.status(200).send(result);
};
