import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Route, BrowserRouter, Redirect, useHistory } from 'react-router-dom';

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

export const socket = io(process.env.REACT_APP_SERVER_URL as string);

const App: React.FC = () => {
  const { isAuthorized, isLoading } = useAuth();
  const history = useHistory();
  useSocketConnect(socket);

  useEffect(() => {
    socket.on(SocketEvents.Error, (error: Error) => {
      history.push(MainRoutes.ErrorPage);
      console.log(error.message);
    })
  }, [history]);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <BrowserRouter>
      {isAuthorized && (
        <Redirect
          to={MainRoutes.ChatOverviewRoute_1}
          exact
          push
        />
      )}
      <GlobalStyle />
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
    </BrowserRouter>
  );
}

export default App;
