import React, { useContext, useReducer } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import StateContext from '../context/StateContext';
import stateReducer from '../context/reducer';
import useAccessToken from '../hooks/useAccessToken';
import GlobalStyle from '../styleConfigs/globalStyle';
import ArtistPicker from '../components/ArtistPicker';
import SongPicker from '../components/SongPicker';
import GoogleAnalytics from '../components/GoogleAnalytics';

const Index = () => {
  const initialState = useContext(StateContext);
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const isProduction = process.env.NODE_ENV === 'production';
  const accessToken = useAccessToken();

  return (
    <StateContext.Provider value={{ state, dispatch, accessToken }}>
      <ThemeProvider theme={{ isSongView: state.isSongView }}>
        <GlobalStyle />
        <Wrapper>
          <Row>
            <LeftCol>
              <ArtistPicker />
            </LeftCol>
            <RightCol>
              <SongPicker />
            </RightCol>
          </Row>
        </Wrapper>
        {isProduction && <GoogleAnalytics />}
      </ThemeProvider>
    </StateContext.Provider>
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
