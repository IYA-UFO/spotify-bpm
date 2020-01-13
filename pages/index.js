import React, { useContext, useReducer } from 'react';
import StateContext from 'app/context/StateContext';
import stateReducer from 'app/context/reducer';
import useAccessToken from 'app/hooks/useAccessToken';
import GlobalStyle from 'app/styleConfigs/globalStyle';
import ArtistPicker from 'app/components/ArtistPicker';
import SongPicker from 'app/components/SongPicker';
import Introduction from 'app/components/Introduction';

import PageSwitcher from 'app/components/PageSwitcher';
import GoogleAnalytics from 'app/components/GoogleAnalytics';

const Index = () => {
  const initialState = useContext(StateContext);
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const isProduction = process.env.NODE_ENV === 'production';
  const accessToken = useAccessToken();

  return (
    <StateContext.Provider value={{ state, dispatch, accessToken }}>
      <GlobalStyle />
      <PageSwitcher
        pages={[
          <Introduction key="page1" />,
          <ArtistPicker key="page2" />,
          <SongPicker key="page3" />,
        ]}
        page
      />
      {isProduction && <GoogleAnalytics />}
    </StateContext.Provider>
  );
};

export default Index;
