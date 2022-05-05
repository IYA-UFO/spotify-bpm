import React, { useContext } from 'react';
import styled from 'styled-components';
import Metronome from './Metronome';
import StateContext from 'context/StateContext';

const Introduction = () => {
  const { dispatch } = useContext(StateContext);

  return (
    <Wrap>
      <MetronomeWrap>
        <Metronome />
      </MetronomeWrap>
      <Heading>Spotify BPM</Heading>
      <Subhead>
        Get your favorite songs sorted by BPM
        <br />
        (Beat per minutes)
      </Subhead>
      <Text></Text>
      <Go
        onClick={() => {
          dispatch({ type: 'START' });
        }}
      >
        START→
      </Go>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 100px 20px 0;
  text-align: center;
`;

const MetronomeWrap = styled.div`
  width: 250px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-family: 'Righteous';
  text-align: center;
  /* filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))
    drop-shadow(0 0 40px rgba(27, 234, 189, 0.6))
    drop-shadow(0 0 100px rgba(27, 234, 189, 0.6)); */
`;

const Subhead = styled.h2`
  margin-top: 40px;
  font-size: 25px;
  line-height: 1.5;
  font-family: 'Righteous';
  text-align: center;
`;

const Text = styled.p``;

const Go = styled.p`
  font-family: 'Righteous';
  margin: 30px auto 0;
  display: inline-block;
  line-height: 1.2;
  border-bottom: 5px solid #fff;
`;

export default Introduction;
