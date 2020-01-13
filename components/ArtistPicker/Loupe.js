import React from 'react';
import styled from 'styled-components';

const Loupe = () => {
  console.log('loupe');
  return <Wrap />;
};

const Wrap = styled.div`
  position: absolute;
  z-index: 2;
  top: 20px;
  left: 28px;
  width: 20px;
  height: 20px;
  background-image: url('/img/loupe.png');
  background-size: contain;
  opacity: 0.3;
`;

export default React.memo(Loupe);
