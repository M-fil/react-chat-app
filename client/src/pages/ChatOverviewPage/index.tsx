import React from 'react';
import { Helmet } from 'react-helmet';

import ChatNavBar from '../../core/components/Chat/ChatNavBar';
import ChatList from './components/ChatsList';
import ChatPageContainer from './styled';

const ChatOverviewPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chat Page</title>
      </Helmet>

      <ChatPageContainer>
        <ChatNavBar />
        <ChatList />
      </ChatPageContainer>
    </>
  )
}

export default ChatOverviewPage;
