import React from 'react';

const InitialState = React.createContext({
  currentArtist: {},
  query: '',
  playingSongId: '',
  isSongView: false,
});

export default InitialState;
