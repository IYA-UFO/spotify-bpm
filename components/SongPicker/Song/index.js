import React from 'react';
import styled from 'styled-components';
import Wave from './Wave';

const Song = ({
  id,
  name,
  bpm,
  timeSignature,
  handleSongClick,
  previewUrl,
  isPlaying,
}) => {
  const hasPreview = Boolean(previewUrl);
  return (
    <Wrap
      onClick={() => {
        if (hasPreview) handleSongClick(id);
      }}
      isPlaying={isPlaying}
    >
      <Wave isPlaying={isPlaying} id={id} />
      <Name>{name}</Name>
      <RightCol>
        {hasPreview && <PreviewIndicater />}
        <Bpm>{bpm}</Bpm>
        <Beat>{timeSignature}</Beat>
      </RightCol>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  display: flex;
  height: 35px;
  padding: 3px 9px;
  font-size: 14px;
  font-weight: 300;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  &:nth-of-type(2n) {
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
  }
`;

const Name = styled.div`
  overflow: hidden;
  padding-right: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RightCol = styled.div`
  display: flex;
`;

const PreviewIndicater = styled.div`
  width: 20px;
  background: right 6px/ 12px no-repeat url('/img/note.png');
  text-align: center;
`;

const Bpm = styled.div`
  width: 40px;
  text-align: center;
`;

const Beat = styled.div`
  text-align: right;
`;

export default Song;
