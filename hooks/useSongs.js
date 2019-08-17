import { useState, useEffect } from 'react';

function useArtists(artistId) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (!artistId) {
      setSongs([]);
    } else {
      fetch(`/api/spotify/tracks?artistId=${artistId}`)
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
  }, [artistId]);

  return songs;
}

export default useArtists;
