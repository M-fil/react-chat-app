import React, { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { Route, BrowserRouter, Redirect, useHistory } from 'react-router-dom';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { useSelector } from 'react-redux';

import { MainRoutes } from './core/constants/routes/main-routes';
import { useAuth } from './core/hooks/useAuth';
import { useSocketConnect } from './core/hooks/useSocketConnection';

import AuthPage from './pages/AuthPage';
import ChatOverviewPage from './pages/ChatOverviewPage';
import ChatWithUserPage from './pages/ChatWithUserPage';
import ErrorPage from './pages/ErrorPage';
import ConversationPage from './pages/ConversationPage';
import PrivateRoute from './core/components/PrivateRoute';
import GlobalStyle from './core/styles';
import Loader from './core/components/Loader';
import { SocketEvents } from './core/constants/events';
import { defaultFontStyles } from './core/styles/mixins';
import { selectThemeMode } from './core/selectors/theme';

export const socket = io(process.env.REACT_APP_SERVER_URL as string);

const App: React.FC = () => {
  const { isAuthorized, isLoading } = useAuth();
  const themeMode = useSelector(selectThemeMode);
  const theme: DefaultTheme = useMemo(() => ({ mode: themeMode }), [themeMode]);
  const history = useHistory();
  useSocketConnect(socket);
  useEffect(() => {
    socket.on(SocketEvents.Error, () => {
      history.push(MainRoutes.ErrorPage);
    })
  }, [history]);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {isAuthorized && (
          <Redirect
            to={MainRoutes.ChatOverviewRoute_1}
            exact
            push
          />
        )}
        <GlobalStyle fontFamily={defaultFontStyles.fontFamily} />
        <PrivateRoute
          path={[MainRoutes.ChatOverviewRoute_1, MainRoutes.ChatOverviewRoute_2]}
          Component={ChatOverviewPage}
          isAuthorized={isAuthorized}
          exact
        />
        <PrivateRoute
          path={MainRoutes.ChatWithUserRoute}
          Component={ChatWithUserPage}
          isAuthorized={isAuthorized}
          exact
        />
        <PrivateRoute
          path={MainRoutes.ConversationPageDynamic}
          Component={ConversationPage}
          isAuthorized={isAuthorized}
          exact
        />
        <Route
          path={MainRoutes.ErrorPage}
          component={ErrorPage}
        />
        {!isAuthorized && (
          <Route
            path={MainRoutes.AuthRoute}
            exact
            component={AuthPage}
          />
        )}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
