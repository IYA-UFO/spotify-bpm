import React from 'react';
const InitialState = React.createContext({
  currentArtist: {},
  query: '',
  playingSongId: '',
  isSongView: false,
  pageIndex: 1,
});

export default InitialState;
