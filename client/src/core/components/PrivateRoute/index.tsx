import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { MainRoutes } from '../../constants/routes/main-routes';

interface PrivateRouteProps {
  Component: React.FunctionComponent<any>,
  isAuthorized: boolean,
  [propName: string]: any,
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  Component, isAuthorized, ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => isAuthorized
        ? <Component {...props} />
        : (
          <Redirect
            to={{
              pathname: MainRoutes.AuthRoute,
            }}
          />
        )}
    />
  )
};

export default PrivateRoute;
