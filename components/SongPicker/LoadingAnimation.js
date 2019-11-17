import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingAnimation = () => {
  const loadingArray = [];
  for (let i = 0; i < 15; i++) {
    loadingArray.push('');
  }
  return (
    <Wrap>
      {loadingArray.map((el, index) => {
        return <Row key={index} index={index} />;
      })}
    </Wrap>
  );
};

const blink = keyframes`
  0% {
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
 
`;

const Wrap = styled.div`
  padding: 10px 10px 70px;
`;

const Row = styled.div`
  height: 35px;
  &:nth-of-type(2n) {
    opacity: 0;
    animation: ${blink} 2s linear ${({ index }) => `0.${index}s`} infinite;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
  }
`;
export default LoadingAnimation;
