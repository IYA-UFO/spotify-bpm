const getStateDiff = action => {
  switch (action.type) {
    case 'SET_ARTIST':
      return {
        currentArtist: action.payload,
      };

    case 'UNSET_ARTIST':
      return {
        currentArtist: {},
      };

    case 'SET_QUERY':
      return {
        query: action.payload,
      };

    case 'PLAY_SONG':
      return {
        playingSongId: action.payload,
      };

    case 'SET_ACCESS_TOKEN':
      return {
        accessToken: action.payload,
      };

    default:
      return {};
  }
};

const getDerivedState = newState => {
  return {
    isSongView: Boolean(newState.currentArtist.id),
  };
};

export default function reducer(prevState, action) {
  const newState = {
    ...prevState,
    ...getStateDiff(action),
  };
  const newStateWithDerivedState = {
    ...newState,
    ...getDerivedState(newState),
  };
  return newStateWithDerivedState;
}
