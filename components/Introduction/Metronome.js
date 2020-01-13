import React from 'react';
import styled, { keyframes } from 'styled-components';

const Metronome = () => (
  <Wrap>
    <Img1 src="/img/metronome.png" alt="Spotify BPM Logo" />
    {/* <Img2 src="/img/metronome.png" alt="Spotify BPM Logo" /> */}
  </Wrap>
);

const switchGlow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrap = styled.div`
  position: relative;
`;

const Img1 = styled.img`
  width: 100%;
  /* filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))
    drop-shadow(0 0 40px rgba(27, 234, 189, 0.6))
    drop-shadow(0 0 100px rgba(27, 234, 189, 0.6)); */
  /* animation: ${switchGlow} 2s ease-in-out infinite reverse alternate; */
  will-change: opacity;
  min-height: 219px;
`;

// const Img2 = styled.img`
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100%;
//   filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))
//     drop-shadow(0 0 20px rgba(27, 234, 189, 0.5))
//     drop-shadow(0 0 75px rgba(27, 234, 189, 0.5));
//   animation: ${switchGlow} 2s ease-in-out infinite alternate;
//   will-change: opacity;
//   min-height: 219px;
// `;

export default Metronome;
