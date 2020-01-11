import { useState, useEffect } from 'react';

function useSongs(artistId, accessToken) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (!artistId) {
      setSongs([]);
    } else {
      fetch(`/api/spotify/tracks/${artistId}?accessToken=${accessToken}`)
        .then(res => res.json())
        .then(json => {
          let songArr = json;
          songArr.sort((songA, songB) => {
            return songA.bpm - songB.bpm;
          });
          songArr = songArr.filter((theSong, index, songs) => {
            let isUnique = true;
            songs.forEach(theOtherSong => {
              if (
                theOtherSong.name === theSong.name &&
                theOtherSong.id !== theSong.id
              )
                isUnique = false;
            });
            return isUnique;
          });
          setSongs(songArr);
        })
        .catch(err => {
          throw Error(err);
        });
    }
  }, [accessToken, artistId]);

  return songs;
}

export default useSongs;
