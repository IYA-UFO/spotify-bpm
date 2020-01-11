import { useState, useEffect } from 'react';

function useArtists(query, accessToken) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (!query) {
      setArtists([]);
    } else {
      fetch(`/api/spotify/artists/${query}?accessToken=${accessToken}`)
        .then(res => res.json())
        .then(json => {
          const dataArr = json.map(artist => {
            const imageMSize = artist.images.find(image => {
              return image.height > 500 && image.height < 800;
            });
            let imageUrl = null;
            if (imageMSize) {
              imageUrl = imageMSize.url;
            } else if (artist.images[0]) {
              imageUrl = artist.images[0].url;
            }
            return {
              name: artist.name,
              id: artist.id,
              image: imageUrl,
            };
          });
          setArtists(dataArr);
        })
        .catch(err => {
          throw Error(err);
        });
    }
  }, [accessToken, query]);

  return artists;
}

export default useArtists;
