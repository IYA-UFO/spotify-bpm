import React, { useContext, useReducer } from 'react';
import NextHead from 'next/head';
import StateContext from 'context/StateContext';
import stateReducer from 'context/reducer';
import useAccessToken from 'hooks/useAccessToken';
import GlobalStyle from 'styleConfigs/globalStyle';
import ArtistPicker from 'components/ArtistPicker';
import SongPicker from 'components/SongPicker';
import Introduction from 'components/Introduction';

import PageSwitcher from 'components/PageSwitcher';
import GoogleAnalytics from 'components/GoogleAnalytics';

const Index = () => {
  const initialState = useContext(StateContext);
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const isProduction = process.env.NODE_ENV === 'production';
  const accessToken = useAccessToken();

  return (
    <StateContext.Provider value={{ state, dispatch, accessToken }}>
      <NextHead>
        <title key="title">Spotify BPM</title>
      </NextHead>
      <GlobalStyle />
      <PageSwitcher
        pages={[
          <Introduction key="page1" />,
          <ArtistPicker key="page2" />,
          <SongPicker key="page3" />,
        ]}
      />
      {isProduction && <GoogleAnalytics />}
    </StateContext.Provider>
  );
};

export default Index;
