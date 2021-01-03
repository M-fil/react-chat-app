import React from 'react';
import { Helmet } from 'react-helmet';

import AuthForm from './components/AuthForm';

const AuthPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Auth Page</title>
      </Helmet>
      
      <AuthForm />
    </>
  );
}

export default AuthPage;
