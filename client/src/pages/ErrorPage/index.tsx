import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import ErrorPageContainer from './styled';
import { MainRoutes } from '../../core/constants/routes/main-routes';

interface ErrorPageProps {
  errorMessage?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
  return (
    <ErrorPageContainer>
      <h2>
        {errorMessage || 'Error. The page was not found...'}
      </h2>
      <Link
        to={MainRoutes.ChatOverviewRoute_2}
        replace={false}
      >
        <Button type="primary">
          Go to chats
        </Button>
      </Link>
    </ErrorPageContainer>
  );
};

export default ErrorPage;
