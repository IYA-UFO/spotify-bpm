import React, { useState } from 'react';
import styled from 'styled-components';
import useArtists from '../../hooks/useArtists';
import InputArea from './InputArea';

const ArtistPicker = ({ setCurrentArtist, currentArtist }) => {
  const [query, setQuery] = useState('');
  const artists = useArtists(query);
  return (
    <>
      <InputArea query={query} onQueryChange={setQuery} />
      <Wrap>
        <ArtistsWrap currentArtist={currentArtist}>
          {artists.map((artist, index) => {
            return (
              <Artist
                key={index}
                onClick={() => {
                  setCurrentArtist(artist);
                }}
              >
                <h3>{artist.name}</h3>
              </Artist>
            );
          })}
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
  overflow-y: ${({ currentArtist }) =>
    currentArtist.id ? 'hidden' : 'scroll-y'};
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
