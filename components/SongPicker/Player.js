import React from 'react';
import styled from 'styled-components';

const Player = ({ playingSong, handlePlayBtnClick, isPlaying }) => (
  <Wrap>
    <Title>{playingSong ? playingSong.name : ''}</Title>
    <Play onClick={handlePlayBtnClick} isPlaying={isPlaying} />
  </Wrap>
);

const Wrap = styled.div`
  z-index: 1;
  display: flex;
  height: 100%;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: space-between;
  backdrop-filter: blur(2px);
`;

const Title = styled.p`
  z-index: 10;
  left: 0;
  display: flex;
  width: calc(100% - 100px);
  line-height: 1.35;
  color: white;
  align-items: center;
  font-size: 15px;
`;

const Play = styled.div`
  width: 60px;
  background: center right / 36px no-repeat;
  background-image: ${({ isPlaying }) =>
    isPlaying ? 'url(/img/stop.png)' : 'url(/img/play.png)'};
`;

export default Player;
