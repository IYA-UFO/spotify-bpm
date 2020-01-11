import React, { useState, useContext } from 'react';
import StateContext from '../../context/StateContext';
import styled, { keyframes, css } from 'styled-components';

const InputArea = () => {
  const {
    state: { query },
    dispatch,
  } = useContext(StateContext);
  const [isFocused, setIsFocused] = useState(false);

  const onQueryChange = e => {
    dispatch({ type: 'SET_QUERY', payload: e.target.value });
  };
  return (
    <Wrap>
      <Input
        value={query}
        onChange={onQueryChange}
        placeholder="Ed Sheeran"
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        aria-label="input artist name"
      />
      <Loupe />
      <Line isFocused={isFocused} />
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px 18px;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const lineGrad = keyframes`
  0% {background-position: 0% 0%}
	50% {background-position: 100% 0%}
	100% {background-position: 0% 0%}
`;

const animation = css`
  ${lineGrad} 1s ease infinite;
`;

const Line = styled.div`
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #10abff, #1beabd);
  background-size: 200% 100%;
  animation: ${props => (!props.isFocused ? animation : 'none')};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const Input = styled.input`
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  margin: 0;
  padding: 5px 15px;
  border: none;
  border-radius: inherit;
  outline: none;
  background-color: #111;
  font-size: 22px;
  line-height: 31px;
  color: white;
  text-align: center;
  &:focus + span {
    opacity: 1;
    transform: scale(1);
  }
  &::placeholder {
    color: #666;
  }
`;

const Loupe = styled.div`
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

export default InputArea;
