import React, { useState, useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAudio } from 'react-use';
import StateContext from 'context/StateContext';
import useSongs from 'hooks/useSongs';
import Song from './Song';
import Player from './Player';
import LoadingAnimation from './LoadingAnimation';

const SongPicker = () => {
  const {
    state: { currentArtist, playingSongId },
    dispatch,
    accessToken,
  } = useContext(StateContext);

  //曲一覧
  const songs = useSongs(currentArtist.id, accessToken);

  //再生中の曲
  const playingSong = songs.find((song) => {
    return song.id === playingSongId;
  });
  const [audio, audioState, audioControls, audioRef] = useAudio({
    src: playingSong && playingSong.previewUrl,
    autoPlay: true,
  });
  const isPlaying = Boolean(playingSongId && audioState.isPlaying);

  //曲クリックハンドラー
  const handleSongClick = (id) => {
    dispatch({ type: 'PLAY_SONG', payload: id });
    audioControls.volume(0.1);
  };

  //再生パネルハンドラー
  const handlePlayBtnClick = () => {
    audioState.isPlaying ? audioControls.pause() : audioControls.play();
  };

  //戻るボタンハンドラー
  const coverRef = React.createRef();
  const handleBackClick = () => {
    dispatch({ type: 'UNSET_ARTIST' });
    audioRef.current.src = '';
    coverRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  //画面高さ
  const [innerHeight, setInnerHeight] = useState(0);
  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, []);

  return (
    <Wrap innerHeight={innerHeight}>
      {audio}
      <BackBtn
        onClick={handleBackClick}
        aria-label="go back to picking artist"
      />
      <Image image={currentArtist.image} alt="" />
      <Cover ref={coverRef}>
        <Content>
          <Name>{currentArtist.name}</Name>
          {songs.length > 0 ? (
            <SongsWrap>
              {songs.map((song) => (
                <Song
                  key={song.id}
                  {...song}
                  handleSongClick={handleSongClick}
                  isPlaying={playingSongId === song.id && audioState.isPlaying}
                />
              ))}
            </SongsWrap>
          ) : (
            <LoadingAnimation />
          )}
        </Content>
      </Cover>
      <PlayerWrap>
        <Player
          isPlaying={isPlaying}
          playingSong={playingSong}
          handlePlayBtnClick={handlePlayBtnClick}
        />
      </PlayerWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: ${({ innerHeight }) => `${innerHeight}px`};
  align-items: center;
  justify-content: center;
`;

const BackBtn = styled.button`
  position: absolute;
  z-index: 30;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  border: 1px solid green;
  border: 0;
  outline: 0;
  background: center / 25px no-repeat url('/img/arrow.png');
`;

const Image = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 375px;
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-position: center center;
  background-size: cover;
  transform: translateY(-50px);
`;

const Cover = styled.div`
  overflow-y: scroll;
  width: 100%;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  min-height: 700px;
  padding-top: 250px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0px,
    rgba(0, 0, 0, 0.5) 200px,
    rgba(0, 0, 0, 1) 300px,
    rgba(0, 0, 0, 1) 100%
  );
`;

const showSongs = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;

const SongsWrap = styled.div`
  padding: 10px 10px 70px;
  animation: ${showSongs} 1.5s;
`;

const Name = styled.h2`
  font-size: 40px;
  line-height: 1.25;
  text-align: center;
  opacity: ${({ scrollY }) => 1 - (scrollY - 20) / 256};
`;

const PlayerWrap = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 70px;
`;

export default SongPicker;
