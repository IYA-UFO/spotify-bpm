import { useState, useEffect } from 'react';

function useAccessToken() {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    fetch(`/api/spotify/accessToken`)
      .then(res => res.json())
      .then(json => {
        setAccessToken(json.token);
      })
      .catch(err => {
        throw Error(err);
      });
  }, []);
  return accessToken;
}

export default useAccessToken;
