import React, { useContext } from 'react';
import styled from 'styled-components';
import StateContext from 'context/StateContext';
import useArtists from 'hooks/useArtists';
import InputArea from './InputArea';

const ArtistPicker = () => {
  const {
    state: { query, isSongView },
    dispatch,
    accessToken,
  } = useContext(StateContext);
  const artists = useArtists(query, accessToken);

  return (
    <>
      <InputArea />
      <Wrap>
        <ArtistsWrap isSongView={isSongView}>
          {artists.map((artist) => (
            <Artist
              key={artist.id}
              onClick={() => {
                dispatch({ type: 'SET_ARTIST', payload: artist });
              }}
            >
              <h3>{artist.name}</h3>
            </Artist>
          ))}
        </ArtistsWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ArtistsWrap = styled.div`
  overflow-y: ${({ isSongView }) => (isSongView ? 'hidden' : 'scroll')};
  width: 100%;
  height: calc(100vh - 65px);
  padding: 10px 20px;
`;

const Artist = styled.div`
  width: 100%;
  h3 {
    font-size: 15px;
    font-weight: 300;
    line-height: 2.3;
  }
`;

export default ArtistPicker;
