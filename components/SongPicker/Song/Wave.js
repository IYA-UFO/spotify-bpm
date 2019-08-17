import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Wave = ({ isPlaying, id }) => {
  const [shouldRender, setRender] = useState(isPlaying);

  useEffect(() => {
    if (isPlaying) setRender(true);
  }, [isPlaying]);

  const onAnimationEnd = () => {
    if (!isPlaying) {
      setRender(false);
    }
  };
  return (
    <Wrap isPlaying={isPlaying} onAnimationEnd={onAnimationEnd} key={id}>
      {shouldRender && (
        <Waves
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 20 35"
          preserveAspectRatio="none"
          shapeRendering="auto"
          width="100%"
          height="35"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <Parallax>
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(27, 234, 189,0.4)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(27, 234, 189,0.4)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              fill="rgba(16, 171, 255,0.3)"
            />
          </Parallax>
        </Waves>
      )}
    </Wrap>
  );
};

const showWave = keyframes`
  0% {opacity:0; }
  100% { opacity:1;}
`;

const hideWave = keyframes`
  0% {transform: scaleY(1);opacity:1;}
  100% { transform: scaleY(0);opacity:0;}
`;

const moveForever = keyframes`
  0% {transform: translate3d(-90px,0,0);}
  100% { transform: translate3d(85px,0,0);}
`;

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  margin-bottom: -7px;
  transform-origin: center 25px;
  animation: ${({ isPlaying }) => (isPlaying ? showWave : hideWave)} 1s;
`;

const Waves = styled.svg`
  overflow: hidden;
  width: 100%;
`;

const Parallax = styled.g`
  & > use {
    mix-blend-mode: lighten;
    animation: ${moveForever} 10s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
    &:nth-of-type(1) {
      animation-delay: -2s;
      animation-duration: 2s;
    }
    &:nth-of-type(2) {
      animation-delay: -3s;
      animation-duration: 3s;
    }
    &:nth-of-type(3) {
      animation-delay: -4s;
      animation-duration: 5s;
    }
  }
`;

export default Wave;
