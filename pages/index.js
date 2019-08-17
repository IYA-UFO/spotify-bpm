import React, { useState } from 'react';
import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styleConfigs/globalStyle';
import ArtistPicker from '../components/ArtistPicker';
import SongPicker from '../components/SongPicker';

const Index = () => {
  // デバッグ用データ
  // const [currentArtist, setCurrentArtist] = useState({
  //   id: '6MDME20pz9RveH9rEXvrOM',
  //   image: 'https://i.scdn.co/image/08a4e4c0edda46a1ab4c9ee851f8fa567741d7e6',
  //   name: 'Clean Bandit',
  // });

  const [currentArtist, setCurrentArtist] = useState({});
  const isSongView = Boolean(currentArtist.id);

  const goBackToAirtistPicker = () => {
    setCurrentArtist({});
  };

  return (
    <ThemeProvider theme={{ isSongView }}>
      <Head>
        <title key="title">Spotify BPM</title>
        <meta name="description" content="Sort spotify&lsquo;s songs by BPM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <GlobalStyle />
      <Wrapper>
        <Row>
          <LeftCol>
            <ArtistPicker
              setCurrentArtist={artist => {
                setCurrentArtist(artist);
              }}
              currentArtist={currentArtist}
            />
          </LeftCol>
          <RightCol>
            <SongPicker
              currentArtist={currentArtist}
              goBackToAirtistPicker={goBackToAirtistPicker}
            />
          </RightCol>
        </Row>
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  background-color: #000;
  color: white;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch !important;
  overflow-x: hidden;
`;

const Row = styled.div`
  width: 200%;
  transform: ${({ theme }) =>
    theme.isSongView ? 'translateX(-50%)' : 'translateX(0)'};
  transition: transform 0.5s;
  display: flex;
  flex-direction: row;
`;

const LeftCol = styled.div`
  width: 50%;
  height: ${({ theme }) => (theme.isSongView ? '100%' : 'auto')};
`;

const RightCol = styled.div`
  width: 50%;
  height: ${({ theme }) => (theme.isSongView ? 'auto' : '100%')};
`;

export default Index;
